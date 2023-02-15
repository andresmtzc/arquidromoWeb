$(document).scroll(function () {

    var y = $(this).scrollTop();

    // Show element after user scrolls past 
    // the top edge of its parent 
    $('.offload').each(function () {
        var t = $(this).parent().offset().top;
        if (y > t) {
            $(this).fadeIn().delay(2000).fadeOut().delay(5000);
            
        } 

    });
});