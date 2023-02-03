$(document).scroll(function () {

    var y = $(this).scrollTop();

    // Show element after user scrolls past 
    // the top edge of its parent 
    $('.offload').each(function () {
        var t = $(this).parent().offset().top;
        if (y > t) {
            $(this).fadeIn();
             $(this).css("font-size", "3.5vh");
             $(this).delay(3000).fadeOut('slow');

        } else {
            $(this).delay(1000).fadeOut();
        }
    });
});