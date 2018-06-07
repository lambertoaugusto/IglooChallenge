var bannerIndex = 0;
var timeout;
var resizeTimer;

function slideBanners() {
    var banners = $(".banner").each(function () {
        $(this).css("display", "none");
    });

    var dots = $(".dot").each(function () {
        $(this).removeClass("active");
    });

    bannerIndex++;

    if (bannerIndex > banners.length) {
        bannerIndex = 1
    }

    banners[bannerIndex - 1].style.display = "block";
    dots[bannerIndex - 1].className += " active";
    clearTimeout(timeout);
    timeout = setTimeout(slideBanners, 4000);
}

function currentBanner(index) {
    var i;
    var banners = $(".banner").each(function () {
        $(this).css("display", "none");
    });
    var dots = $(".dot").each(function () {
        $(this).removeClass("active");
    });

    bannerIndex = index;
    if (index > banners.length) {
        bannerIndex = 1
    }
    if (index < 1) {
        bannerIndex = banners.length
    }

    banners[bannerIndex - 1].style.display = "block";
    dots[bannerIndex - 1].className += " active";
    clearTimeout(timeout);
    timeout = setTimeout(slideBanners, 2000);
}

function dotsReposition() {
    var imageHeight = $(".banner").height();

    //define dot size as 5% of banner image
    $(".dot").css("width", imageHeight * 0.05);
    $(".dot").css("height", imageHeight * 0.05);
}

function adjustLayer() {
    $(".layer>img").each(function () {
        var imageHeight = ($(this).outerHeight(true) > 0) ? $(this).outerHeight(true) : 0;
        
        if(imageHeight > 0){
            $(".layer").css("height",imageHeight);
        } 
    });
}

$(document).ready(function () {
    slideBanners();

    dotsReposition();
    adjustLayer();

    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            dotsReposition();
            adjustLayer();
        }, 250);
    });

    $("#content li a").click(function () {
        $("#content li a").each(function () {
            $(this).removeClass("current");
        });
        $(this).addClass("current");
    });

    $(".menu").hide();
    $(".hamburger").click(function () {
        $(".menu").slideToggle("slow");
    });
});
