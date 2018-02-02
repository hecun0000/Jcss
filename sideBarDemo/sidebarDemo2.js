(function() {
    var NavigateBar = function(elementId) {
        this.eId = elementId||'wrap';
        this.el = document.getElementById(this.eId);
        this.el.addEventListener('click',function(evt) {
            evt.stopPropagation();
        });
        this.state = 'allClosed';//hasOpened
        this.currentOpenedEl = null;

        //使用jquery就更方便使用Delegation 
        var forEach = Array.prototype.forEach;
        var self = this;
        var navigatorList =  document.querySelectorAll('#' + this.eId + ' > div');
        forEach.call(navigatorList, function(navigator){
            navigator.addEventListener('click',function(evt) {
                var currentEl = document.getElementById(evt.currentTarget.id + '-content');
                if(self.state === 'allClosed') {
                    currentEl.className = 'nav-content';
                    currentEl.style.top = '0px';
                    currentEl.style.left = '-85px';
                    currentEl.classList.add('nc_move_right');
                    self.state = 'hasOpened';
                    self.currentOpenedEl = currentEl;
                }else {
                    self.currentOpenedEl.className = 'nav-content';
                    self.currentOpenedEl.style.top = '0px';
                    self.currentOpenedEl.style.left = '35px';
                    self.currentOpenedEl.classList.add('nc_move_left');

                    currentEl.className = 'nav-content';
                    currentEl.style.top = '250px';
                    currentEl.style.left = '35px';
                    currentEl.classList.add('move_up');
                    self.currentOpenedEl = currentEl;
                }
            });
        });


        var navConCloseBarList = document.querySelectorAll('.nav-content > div.nav-con-close');
        forEach.call(navConCloseBarList, function(navConCloseBar){
            navConCloseBar.addEventListener('click',function(evt) {
                var currentEl = evt.currentTarget.parentNode;
                currentEl.className = 'nav-content';
                currentEl.style.top = '0px';
                currentEl.style.left = '35px';
                currentEl.classList.add('nc_move_left');
                self.state = 'allClosed';
            });
        });
    };

    NavigateBar.prototype.close = function() {
        this.currentOpenedEl.className = 'nav-content';
        this.currentOpenedEl.style.top = '0px';
        this.currentOpenedEl.style.left = '35px';
        this.currentOpenedEl.classList.add('nc_move_left');
        this.state = 'allClosed';
    };

    var navigateBar = new NavigateBar();


    var SideBar = function(elementId) {
        this.eId = elementId||'sidebar';
        this.el = document.getElementById(this.eId);
        this.closeBarEl = document.getElementById('closeBar');
        this.state = 'opened';
        var self = this;
        this.el.addEventListener('click',function(evt) {
            if(evt.target !==  self.el) {
                self.triggerSwitch(); 
            }
        });
    };

    SideBar.prototype.triggerSwitch = function() {
        if(this.state === 'opened')
            this.close();
        else if(this.state === 'closed')
            this.open();
    };

    SideBar.prototype.close = function() {
        navigateBar.close();
        this.el.style.left = '0';
        this.el.className ='move_left';
        this.closeBarEl.style.left = '0';
        this.closeBarEl.className = 'closeBar_move_right';
        this.state = 'closed';


    };

    SideBar.prototype.open = function() {
        this.el.style.left = '-120px';
        this.el.className = 'move_right';
        this.closeBarEl.style.left = '160px';
        this.closeBarEl.className = 'closeBar_move_left';
        this.state = 'opened';
    };
    var sideBar = new SideBar();

})();