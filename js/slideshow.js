jQuery(document).ready(function ($) {
    $(window).on('load', function () {
        var pages = $('#slideshow li'), current = 10;
        var currentPage, nextPage;
        var timeoutID;
        var buttonClicked = 0;

        var handler1 = function () {
            buttonClicked = 1;

            $('#slideshow .button').unbind('click');
            currentPage = pages.eq(current);
            var old = current;

            if ($(this).hasClass('slide0')) current = 0;
            else if ($(this).hasClass('slide1')) current = 1;
            else current = 2;

            if (current != old) {
                nextPage = pages.eq(current);
                //currentPage.fadeTo('slow',0.5,function(){
                nextPage.css("display", "inline");
                currentPage.css("display", "none");

                currentPage.css("opacity", 1);
                $('#slideshow .button').bind('click', handler1);
                $('#slideshow .button').removeClass("active");
                $(this).addClass("active");

                //});           
            } else {
                //currentPage.fadeTo('slow',0.5,function(){
                currentPage.css("display", "inline");
                currentPage.css("opacity", 1);
                $('#slideshow .button').bind('click', handler1);
                // });
            }

        }

        var handler2 = function () {
            if (buttonClicked == 0) {
                $('#slideshow .button').unbind('click');
                currentPage = pages.eq(current);

                if (current >= pages.length - 1) current = 0;
                else current = current + 1;

                nextPage = pages.eq(current);
                //currentPage.fadeTo('slow',0.5,function(){
                nextPage.css("display", "inline");
                currentPage.css("display", "none");

                currentPage.css("opacity", 1);
                $('#slideshow .button').bind('click', handler1);
                $('#slideshow .button').removeClass("active");
                if (current == 1) $('#slideshow .slide1').addClass("active");
                else if (current == 2) $('#slideshow .slide2').addClass("active");
                else $('#slideshow .slide0').addClass("active");

                //});
                timeoutID = setTimeout(function () {
                    handler2();
                }, 6000);
            }
        }

        $('#slideshow .button').click(function () {
            clearTimeout(timeoutID);
            handler1();
        });

        timeoutID = setTimeout(function () {
            handler2();
        }, 0);

    })
});
