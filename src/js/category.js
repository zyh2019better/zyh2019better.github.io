// 会默认发起请求，并且渲染数据。
// 模板我们就直接定义在js中
document.addEventListener('DOMContentLoaded', function () {
//目录ejs模板文件
var categoryEjs = '<% categoryList.forEach(function(item){ %>' +
    '<li><a href="#"><%= item.name %></a></li>' +
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
//通过axios发送请求 数据
axios.get('../data/tuijian.json')
    .then(function (res) {
        // console.log(res);
        var data = res.data.data.result[0]
        var categoryList = data.industryList;
        var moduleList = data.moduleList;
        if(categoryList.length){//判断数据是否有 有才渲染
            var renderContent = ejs.render(categoryEjs,{categoryList:categoryList})
            //{categoryList:categoryList} 左边的对应EJS模板里面的categoryList
            document.querySelector('.aside ul').innerHTML = renderContent;
        }
        document.querySelectorAll('.aside ul li')[0].className = 'active'

        if(detailEjs.length){
            var renderImages = ejs.render(detailEjs,{detailList:moduleList})
            categoryDetail.innerHTML = renderImages;
            /*categoryDetail.addEventListener('scroll',function () {
                /!*var contentHeight = document.querySelector('.content').offsetHeight;
                // console.log(contentHeight,this.scrollTop);
                var totalScroll = this.scrollTop + contentHeight;
                lazyload(totalScroll);*!/
            },false)*/
            clearTimeout(timer)
            timer = setTimeout(function () {
                lazyload()
            },500)
        }
    })
})

function lazyload() {
    var contentHeight = document.querySelector('.content').offsetHeight;
    document.querySelector('.category-detail').addEventListener('scroll',function () {
        scrollChange.call(this,contentHeight)
    })
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
