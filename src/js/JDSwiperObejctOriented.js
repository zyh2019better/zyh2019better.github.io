function JDSwiper(options) {
    options = options || {};
    this.container = document.querySelector(options.ele)
    if (!this.container) {
        console.error('请必须传对象,而且ele必须存在')
        return this;
    }
    this.timer = null;
    this.num = 0;
    this.loop = 1;

    //装图片的
    this.wrapper = this.container.children[0];
    //装span的
    this.pagesWrapper = this.container.children[1];
    //获取span
    this.pages = this.pagesWrapper.children;
    if (!this.wrapper || !this.pagesWrapper) {
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

    /*手指滑动相关参数*/
    this.startX = 0;
    this.endX = 0;
    this.startTime = 0;
    this.endTime = 0;
}
    /*初始化全局方法*/
    JDSwiper.prototype.init = function () {
        //初始图片
        //初始角标
        //初始化自动播放
        //初始化手指滑动
        this.initImgs();
        this.initPoints();
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
            that.loop++;
            that.num++;
            // sloganNumber++;
            that.pagesPoint();
            that.swiperWrapper();
            // sloganMove();
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
        this.wrapper.style.transform = 'translate3d('+ -this.loop*100+'%,0,0)'
    }

    JDSwiper.prototype.animateEnd = function () {
        var that = this;
        this.wrapper.addEventListener('transitionend',function () {
            if(that.loop > that.oImgsLength){
                this.loop = 1
                that.play()
            }
            if(this.loop < 1){
                this.loop = that.oImgsLength
                that.play()
            }
        },false)
    }

    JDSwiper.prototype.swiperWrapper = function () {
        this.play(true);
        this.animateEnd();
    }


