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

},false)