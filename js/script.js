$('div.pictures').children().hide();
var $currentImg = $('li').first().show();
var transition = 1;
var duration = 500;

function prefferedClose(pref, dur) {
  if(pref == 4){
    pref = 3;
  }  
  switch (pref) {
    case 1:
      $currentImg.hide();
      break;
    case 2:
      $currentImg.fadeOut(dur);
      break;
    case 3:
      $currentImg.slideUp(dur);
      break;
  }
}

function prefferedOpen(pref, dur) {
  var sleepTime = dur;
  if(pref == 4) {
    sleepTime = 0;
    pref = 3;
  }
  switch (pref) {
    case 1:
      $currentImg.show();
      break;      
    case 2:
      $currentImg.delay(sleepTime).fadeIn(dur);
      break;
    case 3:
      $currentImg.delay(sleepTime).slideDown(dur);
      break;
  }
}

/*set type of transition by getting index of 
selected option from list */
$('.menu').change(function() {
  transition = $('.menu input:checked').index()/2+1;
  duration = parseInt($('#duration').val(), 10);
});


$(function() {
  $('#next').on('click', function() {
    prefferedClose(transition, duration);
    if(!$currentImg.hasClass('last')) {
      $currentImg = $currentImg.next();
    }
    else {
      $currentImg = $('li').first();
    }
    prefferedOpen(transition, duration);
  });
  
  $('#prev').on('click', function() {
    prefferedClose(transition, duration);
    if(!$currentImg.hasClass('first')) {
      $currentImg = $currentImg.prev();
    }
    else {
      $currentImg = $('li').last();
    }
    prefferedOpen(transition, duration);
  });
  

});