window.onload = function () {
    //搜索显示
    search();
    //轮播图
    banner();
    //倒计时
    downTime();
}
//搜索显示
var search = function () {

    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var opacity = 0;
        var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(top < height) {
            opacity = top / height * 0.85
        } else {
            opacity = 0.85
        }
        searchBox.style.background = 'rgba(201,21,35,'+opacity+')';
    }
}
//轮播图
var banner = function () {
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imageBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var list = pointBox.querySelectorAll('li');

    var addTransition = function (){
        imageBox.style.transition = 'all 0.3s';
        imageBox.style.webkitTransition = 'all 0.3s';
    };
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX('+translateX+'px)';
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
    }

    //自动轮播
    var index = 1;
    var timer = setInterval(function () {
        index++;
        //过渡
        addTransition();
        //定位
        var translateX = -index * width;
        setTranslateX(translateX);

    },3000);
    //无缝滚动
    imageBox.addEventListener('transitionend',function () {
        if(index >= 9){
            index = 1;
            removeTransition();
            var translateX = - index * width;
            setTranslateX(translateX);
        } else if(index <= 0) {
            index = 8;
            removeTransition();
            var translateX = -index * width;
            setTranslateX(translateX);
        }
        setPoint();
    });
    //点的切换
    var setPoint = function () {
        pointBox.querySelector('li.now').classList.remove('now');
        list[index - 1].classList.add('now');
    }
    //滑动效果
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart',function (e) {
        startX = e.touches[0].clientX;
        clearInterval(timer);
    })
    imageBox.addEventListener('touchmove',function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var translateX = -index * width + distanceX;
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend',function () {
        if(isMove){
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTranslateX(-index * width);
            } else {
                if(distanceX < 0){
                    index++
                } else {
                    index--
                }
                addTransition();
                setTranslateX(-index * width);
            }
        }
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            var translateX = -index * width;
            setTranslateX(translateX);
        },3000);
        startX = 0;
        distanceX = 0;
        isMove = false;
    })
   
}
//倒计时
var downTime = function () {
    var spans = document.querySelectorAll('.sk_time span');
    var time = 5 * 60 * 60;
    var timer = setInterval(function () {
        time--;
        var h = Math.floor( time / 3600 );
        var m = Math.floor( time % 3600 / 60 );
        var s = Math.floor( time % 60 );

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;

        if(time <= 0){
            clearInterval(timer);
        }
    },1000)

} 