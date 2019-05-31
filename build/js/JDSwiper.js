/*
 * 需求
 * 1. 自动播放
 * 循环定时器 timer
 * 每次图片走的张数 loop 图片的number
 * 角标的位置 number
 * 动画过渡 transitionend
 * 滑动方向
 *  抬手位置-摁下位置
*/
/*
* 清空假图片 span
* 获取span容器
* 获取所有图片 var imgs = wrapper.children   var oldLength = imgs
* function initImgs(){
*   var firstC = imgs[0].cloneNode(true)
*   var lastC = imgs[oldLength-1].cloneNode(true)
*
* }
* var opointWrapper = document.querySelector('.container .banner .swiper-pagination');
* function initPoints(){
*   for(var i = 0, i < oldLength,i++){
*       var ospan = document.createElement('span)
*       if(i == 0){
*            ospan.className = 'active'
*       }
*       opointWrapper.appendChild(ospan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                )
*   }
* }
* var pages = document.querySelectorAll('.swiper-container .pages span')
*
*
*
* */
var timer = null;
var num = 0;//角标的初始位置
var loop = 1;//图片的初始位置
var sloganNumber = 0;
var wrapper = document.querySelector('.swiper-wrapper')
var imgs = wrapper.children;
var oImgsLength = imgs.length;
//装span的容器
var oPages = document.querySelector('.swiper-container .pages');
var slogan = document.querySelector('.slogan');
var sloganSpan = slogan.children;
var sloganLength = sloganSpan.length;
//初始化图片和指示点
function initImgs(){
    var cloneFirst = imgs[0].cloneNode(true);
    var cloneLast = imgs[oImgsLength-1].cloneNode(true);
    wrapper.appendChild(cloneFirst);
    wrapper.insertBefore(cloneLast,imgs[0])
}
initImgs();

function initPoints() {
    for (var i = 0; i < oImgsLength ; i++) {
        var span = document.createElement('span');
        if(i == 0){
            span.className = 'active'
        }
        oPages.appendChild(span)
    }
}
initPoints();
var pages = document.querySelectorAll('.swiper-container .pages span')
//装着span的容器需要等创建出来span之后再获取

function autoplay(){
    timer = setInterval(function () {
        loop++;
        num++;
        sloganNumber++;
        pagesPoint();
        swiperWrapper();
        sloganMove();
    },2000)
}
autoplay()

/*function initSlogan(){
    var cloneFirst = sloganSpan[0].cloneNode(true);
    // var cloneLast = sloganSpan[sloganLength-1].cloneNode(true);
    slogan.appendChild(cloneFirst);
    // slogan.insertBefore(cloneLast,sloganSpan[0])
}
initSlogan();

function sloganMove() {
    if(sloganNumber > sloganLength){
        sloganNumber = 0
        slogan.style.transition = ''
        slogan.style.transform = 'translate3d(0,0,0)'
    }
    setTimeout(function () {
        slogan.style.transition = 'transform 0.5s'
        slogan.style.transform = 'translate3d(0,'+-sloganNumber*100+'%,0)'
    },1)
}*/
function pagesPoint() {
    num = (num+pages.length)%pages.length;
    for (var i = 0; i < pages.length ; i++) {
        pages[i].className = '';
    }
    pages[num].className = 'active'
};
// function swiperWrapper() {
//
//     if(loop > 6){
//         loop = 2;
//         // console.log(loop);逢7 变2
//         wrapper.style.transition = '';
//         wrapper.style.transform = 'translate3d(-100%,0,0)'
//     }
//     //变成异步 不然执行太快
//     setTimeout(function () {
//         wrapper.style.transition = 'transform 0.5s'
//         wrapper.style.transform = 'translate3d('+ -loop*100+'%,0,0)'
//     },1)
// }
function play(params) {
    if(params){
        wrapper.style.transition = 'transform 0.5s'
    }else{
        wrapper.style.transition = '';
    }
    wrapper.style.transform = 'translate3d('+ -loop*100+'%,0,0)'
}
function animateEnd() {
    wrapper.addEventListener('transitionend',function () {
        if(loop > oImgsLength){
            loop = 1
            play()
        }
        if(loop < 1){
            loop = oImgsLength
            play()
        }
    },false)
}
function swiperWrapper() {
    play(true);
    animateEnd()
}

/*
* 手指运动
*手指按下时 清定时器 记录按下时的坐标
*手指抬起时 自动播放 记录抬起的坐标
*startX < endX 向右滑
* startX >endX 向左滑
* */

var startTime,endTime,startX,endX;

wrapper.addEventListener('touchstart',function (e) {
    clearInterval(timer);
    startX = e.changedTouches[0].pageX;
    startTime = e.timeStamp;
});

wrapper.addEventListener('touchmove',function (e) {
    var moveX = e.changedTouches[0].pageX;
    var deltaX = startX - moveX;
    var wrapperLeft = this.children[loop].offsetLeft;//根据loop索引值来找移动到哪张图，找偏移值offsetLeft
    this.style.transition = '';
    this.style.transform = 'translate3d('+-(deltaX+wrapperLeft)+'px,0,0)'
})
wrapper.addEventListener('touchend',function (e) {
    autoplay();
    endX = e.changedTouches[0].pageX;
    endTime = e.timeStamp;
    var deltaX = endX - startX;
    // time1 = endTime-startTime;
    // console.log(time1);
    //滑动距离大于等于100或者 时间差小于100毫秒才执行
    if(Math.abs(deltaX) >= 100 || endTime-startTime < 100){
        if(deltaX > 0){
            loop--;
            play(true);
            num--;
            pagesPoint();
            // console.log('向右滑')
        }else{
            loop++;
            play(true);
            num++;
            pagesPoint();
            // console.log('向左滑')
        }
    }else if(Math.abs(deltaX) < 100){
        play(true);//返回回原位
    }
})
