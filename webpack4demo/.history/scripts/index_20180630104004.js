import a from './a.js'
import c from './c.js'
import $ from 'jquery'
const s = () => {
    a.init()
    a.cinit()
    c.init()
    console.log('s init')
}
s();
console.log($)