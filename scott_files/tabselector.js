$(document).scroll(function () {

    var y = $(this).scrollTop();

    // Show element after user scrolls past 
    // the top edge of its parent 
    $('.offload').each(function () {
        var t = $(this).parent().offset().top;
        if (y > t) {
            $(this).fadeIn();
        } else {
            $(this).fadeOut();
        }
    });


var scroll_active = false;
var scroll_timer = new Date();
check_scroll_time();

$(window).scroll(function(){
  scroll_timer = new Date();
});

function check_scroll_time(){
  now = new Date();
  if ((now.getTime() - scroll_timer.getTime())/1000 > 3){
    $('.offload').fadeOut();
  }else{
    $('.offload').css("opacity:1");
  }
  setTimeout(function(){ check_scroll_time() },300);
}
  
  });