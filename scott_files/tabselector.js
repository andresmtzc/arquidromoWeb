


var scroll_active = false;
var scroll_timer = new Date();
check_scroll_time();

$(window).scroll(function(){
  scroll_timer = new Date();

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