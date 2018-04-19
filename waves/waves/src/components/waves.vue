
<template>
    <div class="dynamic" :style='{height:SCREEN_HEIGHT}'>
        <div id="dynamicWaves"></div>
    </div>

</template>

<script>
    import THREE from '@/utils/three/three';
    export default {
        name:'waves',
        data(){
            return {
                SCREEN_WIDTH : window.innerWidth
            }
        },
        methods: {
            liziInit () {
                //屏幕宽度
                let SCREEN_WIDTH = window.innerWidth;
                // 屏幕高度
                let SCREEN_HEIGHT = window.innerWidth*0.303;
                // 粒子间的间距
                let SEPARATION = 120;
                // x轴的数量
                let AMOUNTX = 25;
                // y轴的数量
                let AMOUNTY = 25;

                let container;

                let particles, particle;
                let count;

                let camera;
                let scene;
                let renderer;

                let mouseX = 0;
                let mouseY = 0;
                // 屏幕的一半宽高
                let windowHalfX = window.innerWidth / 2;
                let windowHalfY = window.innerHeight / 2;
                // 初始化粒子
                init();
                // this.interval = setInterval(loop, 1000 / 60);
                // 动画
                loop();

                function init() {

                    container = document.createElement( 'div' );
                    container.style.position = 'relative';
                    container.style.top = '0px';
                    document.getElementById('dynamicWaves').appendChild( container );

                    camera = new THREE.Camera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
                    camera.position.z = 900;

                    scene = new THREE.Scene();

                    renderer = new THREE.CanvasRenderer();
                    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

                    particles = new Array();

                    let i = 0;
                    let material = new THREE.ParticleCircleMaterial( 0xffffff, 1 );

                    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {

                        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

                            particle = particles[ i ++ ] = new THREE.Particle( material );
                            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                            scene.add( particle );
                        }
                    }

                    count = 0;

                    container.appendChild( renderer.domElement );
                    //给canvas加入鼠标移入事件
                    document.getElementById('dynamicWaves').addEventListener( 'mousemove', onDocumentMouseMove, false );
                    document.getElementById('dynamicWaves').addEventListener( 'touchmove', onDocumentTouchMove, false );
                }

                function onDocumentMouseMove( event ) {

                    mouseX = event.clientX - windowHalfX;
                    mouseY = event.clientY - windowHalfY;

                }

                function onDocumentTouchMove( event ) {

                    if ( event.touches.length == 1 ) {

                        event.preventDefault();

                        mouseX = event.touches[ 0 ].pageX - windowHalfX;
                        mouseY = event.touches[ 0 ].pageY - windowHalfY;

                    }
                }

                function loop() {
                    camera.position.x += ( mouseX - camera.position.x ) * .05;
                    //    camera.position.y += ( - mouseY - camera.position.y ) * .05;
                    camera.position.y = 364;

                    let i = 0;

                    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {

                        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

                            particle = particles[ i++ ];
                            particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                            particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

                        }
                    }

                    renderer.render( scene, camera );

                    count += 0.1;

                    window.requestAnimationFrame(loop);
                  // setTimeout(function () {
                  //   window.requestAnimationFrame(loop);
                  // }, 50);
                }
            }
        },
        mounted () {
            this.liziInit();
        },
    };

</script>
<style scoped>
     .dynamic {
        width: 100%;
        height: 580px;
        position: relative;
        background:linear-gradient(to right top,#724cff 30%,#2d8bff);
        overflow: hidden;
    }
</style>
