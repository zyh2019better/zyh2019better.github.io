// 会默认发起请求，并且渲染数据。
// 模板我们就直接定义在js中
document.addEventListener('DOMContentLoaded', function () {
//目录ejs模板文件
var categoryEjs = '<% categoryList.forEach(function(item){ %>' +
    '<li><a to="<%= item.to %>" href="#"><%= item.name  %></a></li>' +
    '<% }) %>'
//detail ejs文件
var detailEjs =
        '<% detailList.forEach(function(item){ %> \
            <div class="category-list">\
                <h4>\
                    <%= item.title  %>\
                </h4>\
                <ul>\
                   <% item.items.forEach(function(n){ %>\
                     <li loading>\
                        <a href="#">\
                            <div>\
                                <img data-src="<%= n.pic %>" alt="">\
                            </div>\
                            <p><%= n.name %></p>\
                        </a>\
                    </li>\
                   <% }) %>\
                </ul>\
            </div>\
    <% }) %>';
var categoryDetail = document.querySelector('.category-detail')
var timer;
/*function lazyload(params) {
    var list = document.querySelectorAll('.category-detail li[loading]');
    console.log(list.length);//发请求的个数一直减少
    list.forEach(function (item) {
        if(item.offsetTop < params){
            var img = item.getElementsByTagName('img')[0];
            var src = img.getAttribute('data-src');
            if(src){
                img.src = src;
                item.removeAttribute('loading')
            }
        }
    })
}*/
//默认显示第一个为你推荐
    /*当单击了第一个按钮，请求的数据不仅有分类的内容，还有右侧分类详情的内容。
    那么它会重新再次将我们的左侧详情列表更新成新的标签，已经不是原来的。所以导致了问题。
    针对切换bug 给datachange方法加一个参数
    第一次网页刷新是希望处理侧边栏分类详情的数据。当我们单击侧边栏分类详情
    的按钮时我们是不希望处理分类，只希望处理分类详情。*/
axios.get('/build/tuijian.json')
    .then(function (res) {
        var data = res.data.data.result[0];
        dataChange(data,true,function () {
            document.querySelectorAll('.aside ul li')[0].className = 'active'
        })
    });
//处理点击跳转
//左侧栏的数据身上除了有name属性外，还有一个属性to。这个to属性就是为了让我们进行拼接跳转的。
document.querySelector('.aside ul').addEventListener('touchend',function (e) {
    // 让每次切换分类列表页面都在最上面 增强用户体验
    document.querySelector('.category-detail').scrollTop = 0
    var currentPosition = e.target;
    var to = currentPosition.getAttribute('to');
    var reqUrl = '/build/data/'+to+'.json';
    // console.log(to,reqUrl);//to:nvzhaung to:tuijian ../data/nvzhuang.json
    axios.get(reqUrl)
        .then(function (res) {
            // console.log(res);
            var data = res.data.data.result[0];
            //ul栏点击排他处理
            dataChange(data,false,function () {
                //Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
                Array.from(currentPosition.parentNode.parentNode.children).forEach(function (item) {
                    item.className = '';
                })
                currentPosition.parentNode.className = 'active'
            })
        })
},false);
    function dataChange(data,status,fn) {
        var categoryList = data.industryList;
        var moduleList = data.moduleList;
        if(categoryList.length && status){//判断数据是否有 有才渲染
            var renderContent = ejs.render(categoryEjs,{categoryList:categoryList})
            //{categoryList:categoryList} 左边的对应EJS模板里面的categoryList
            document.querySelector('.aside ul').innerHTML = renderContent;
        }
        // 函数里面递归调用
        if(fn){
            fn()
        }
        // fn&&fn();
        if(detailEjs.length){
            var renderImages = ejs.render(detailEjs,{detailList:moduleList})
            categoryDetail.innerHTML = renderImages;
            // clearTimeout(timer)
            // timer = setTimeout(function () {
            //
            // },500)
            lazyload()
        }
    }
    function lazyload() {
        var contentHeight = document.querySelector('.content').offsetHeight;
        document.querySelector('.category-detail').addEventListener('scroll',function () {
            scrollChange.call(this,contentHeight)
        },false)
        //解决刷新首页就要请求首页的图片 不需要滑动
        scrollChange.call(document.querySelector('.category-detail'),contentHeight)
    }
    function scrollChange(height) {
        var list = document.querySelectorAll('.category-detail li[loading]');
        var totalScroll = this.scrollTop + height;
        list.forEach(function (item) {
            if(item.offsetTop < totalScroll){
                var img = item.getElementsByTagName('img')[0];
                var src = img.getAttribute('data-src');
                if(src){
                    img.src = src;
                    item.removeAttribute('loading')
                }
            }
        })
    }
},false)