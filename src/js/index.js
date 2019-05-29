document.addEventListener('DOMContentLoaded',function () {
    //当网页发生滚动时，才产生效果？
    //滚动坐标值 > 0 时，头部导航变红色
    //滚动坐标值 = 0 ,头部导航变透明
    // window.onscroll = function(){}  滚动坐标值
    (function () {
         var header = document.querySelector('.header');
         window.onscroll = function () {
             var winT = document.documentElement.scrollTop;
             if(winT > 0){
                 header.style.background = '#f23030'
             }else if(winT == 0){
                 header.style.background = 'transparent'
             }
         }
    })()
    new JDSwiper({
        ele : '.banner-swiper'
    });
    new JDSwiper({
        ele : '.centerContent',
        direction : 'Y',
        points : false
    });
    //获取在标签身上的时间  <p class="time" time="20:00:00">
    var time = document.querySelector('.time').getAttribute('time')
    countDown(time,function (h,m,s) {
        var ele = document.querySelectorAll('.time b')
        for (var i = 0; i < ele.length ; i++) {
            ele[i].innerHTML = arguments[i]>=10?arguments[i]:'0'+arguments[i]
        }
    })
},false)
//封装倒计时的方法
function countDown(time,fn) {
    var date = new Date();//当前日期
    //得到年月日 并拼接好
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    // console.log(year,month,day);
    time = year+'/'+month+'/'+day+' '+time;//空格
    time = new Date(time)//得到目标时间的事件戳
    console.log(time);
    //截止时间和当前时间的差值(时间chuo)
    var delTime = time - date.getTime();
    delTime = delTime/1000//获取差值的 秒数 值
    var timer;
    timer = setInterval(function () {
        delTime--;
        //归零操作
        if(delTime <= 0){
            clearInterval(timer)
            delTime = 0
        }
        var h = parseInt(delTime/(60*60)%24)
        var m = parseInt(delTime/60%60)
        var s = parseInt(delTime%60)
        // console.log(h,m,s);
        if(fn){
            fn(h,m,s);
        }
    },1000)
}

