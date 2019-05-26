function JDSwiper(options) {
    this.options = options || {};
    this.container = document.querySelector(options.ele)
    if (!this.container) {
        console.error('请必须传对象,而且ele必须存在')
        return this;
    }
    this.timer = null;
    this.loop = 1;

    //装图片的
    this.wrapper = this.container.children[0];
    //装span的
    this.pagesWrapper = this.container.children[1];

    /*判断传入的option.ele 的points 的值 false执行false的代码 true执行true的代码*/
    //this.options.points为false则为false 否则为true
    this.options.points = this.options.points === false?false:true;
    if (!this.wrapper || (!this.pagesWrapper&&this.options.points)) {
        console.error('结构必须写好');
        return this;
    }
    //获取图片
    this.imgs = this.wrapper.children;
    //存起图片的数量值
    this.oImgsLength = this.imgs.length;
    if (this.oImgsLength === 0) {
        console.error('请传图片');
        return this;
    }
    if(this.options.points){
        this.num = 0;
        //获取span
        this.pages = this.pagesWrapper.children;
        /*手指滑动相关参数*/
        this.startX = 0;
        this.endX = 0;
        this.startTime = 0;
        this.endTime = 0;
    }
    this.init();
}
    /*初始化全局方法*/
    JDSwiper.prototype.init = function () {
        //初始图片
        //初始角标
        //初始化自动播放
        //初始化手指滑动
        this.initImgs();
        if(this.options.points){
            this.initPoints();
            this.touch();
        }
        this.autoplay();
    }

    JDSwiper.prototype.initImgs = function () {
        var cloneFirst = this.imgs[0].cloneNode(true);
        var cloneLast = this.imgs[this.oImgsLength-1].cloneNode(true);
        this.wrapper.appendChild(cloneFirst);
        this.wrapper.insertBefore(cloneLast,this.imgs[0])
    }

    JDSwiper.prototype.initPoints = function () {
        for (var i = 0; i < this.oImgsLength ; i++) {
            var span = document.createElement('span');
            if(i == 0){
                span.className = 'active'
            }
            this.pagesWrapper.appendChild(span)
        }
    }

    JDSwiper.prototype.autoplay =function () {
        clearInterval(this.timer)
        var that = this
        this.timer = setInterval(function () {
            if(that.options.points){
                that.num++;
                that.pagesPoint();
            }
            that.loop++;
            that.swiperWrapper();
        },2000)
    }

    JDSwiper.prototype.pagesPoint = function () {
        if(this.num > this.oImgsLength-1){
            this.num = 0;
        }
        if(this.num < 0){
            this.num = this.oImgsLength-1;
        }
        for (var i = 0; i < this.pages.length ; i++) {
            this.pages[i].className = '';
        }
        this.pages[this.num].className = 'active'
    }

    JDSwiper.prototype.play = function (params) {
        if(params){
            this.wrapper.style.transition = 'transform 0.5s'
        }else{
            this.wrapper.style.transition = '';
        }
        if(this.options.direction && this.options.direction === "Y"){
            this.wrapper.style.transform = 'translate3d(0,'+ -this.loop*100 +'%,0)'
        }else {
            this.wrapper.style.transform = 'translate3d('+ -this.loop*100 +'%,0,0)'
        }

    }

    JDSwiper.prototype.animateEnd = function () {
        var that = this;
        this.wrapper.addEventListener('transitionend',function () {
            if(that.loop > that.oImgsLength){
                that.loop = 1
                that.play()
            }
            if(that.loop < 1){
                that.loop = that.oImgsLength
                that.play()
            }
        },false)
    }

    JDSwiper.prototype.swiperWrapper = function () {
        this.play(true);
        this.animateEnd();
    }

    JDSwiper.prototype.touch = function () {
        var that = this
        this.wrapper.addEventListener('touchstart',function (e) {
            clearInterval(that.timer);
            that.startX = e.changedTouches[0].pageX;
            that.startTime = e.timeStamp;
        });
        this.wrapper.addEventListener('touchmove',function (e) {
            var moveX = e.changedTouches[0].pageX;
            var deltaX = that.startX - moveX;
            var wrapperLeft = that.imgs[that.loop].offsetLeft;//根据loop索引值来找移动到哪张图，找偏移值offsetLeft
            this.style.transition = '';
            this.style.transform = 'translate3d('+-(deltaX+wrapperLeft)+'px,0,0)'
        });
        this.wrapper.addEventListener('touchend',function (e) {
            that.autoplay();
            that.endX = e.changedTouches[0].pageX;
            that.endTime = e.timeStamp;
            var deltaX = that.endX - that.startX;
            // time1 = endTime-startTime;
            // console.log(time1);
            //滑动距离大于等于100或者 时间差小于100毫秒才执行
            if(Math.abs(deltaX) >= 100 || that.endTime-that.startTime < 100){
                if(deltaX > 0){
                    that.loop--;
                    that.play(true);
                    that.num--;
                    that.pagesPoint();
                    // console.log('向右滑')
                }else{
                    that.loop++;
                    that.play(true);
                    that.num++;
                    that.pagesPoint();
                    // console.log('向左滑')
                }
            }else if(Math.abs(deltaX) < 100){
                that.play(true);//返回回原位
            }
        });
    }

    /*JDSwiper.prototype.initSloganMove = function () {
        var cloneFirst = this.sloganLi[0].cloneNode(true);
        var cloneLast = this.sloganLi[this.sloganLiLength-1].cloneNode(true);
        this.slogan.appendChild(cloneFirst);
        this.slogan.insertBefore(cloneLast,this.sloganLi[0])
    }
    
    JDSwiper.prototype.sloganMove = function () {
        var that = this;
        if(this.sloganNumber > this.sloganLiLength){
            this.sloganNumber = 1
            this.slogan.style.transition = ''
            this.slogan.style.transform = 'translate3d(0,0,0)'
        }
        setTimeout(function () {
            that.slogan.style.transition = 'transform 0.5s'
            that.slogan.style.transform = 'translate3d(0,'+-that.sloganNumber*100+'%,0)'
        },1)
    }*/


