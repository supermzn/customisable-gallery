$('div.pictures').children('li').hide();
$('.menu, .settings').hide();
var $currentImg = $('li').first().show();
var transition = 1;
var duration = 500;
var intervalId;
var intervalTime = 3000;

//
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

/* get type of transition by getting index of
selected option from list */
$('.menu').change(function() {
  transition = $('.menu input:checked').index()/2+1;
  duration = parseInt($('#duration').val(), 10);
  clearInterval(intervalId);
  intervalTime = parseInt($('.autoplay:text').val(), 10);
  setAutoPlay();
});

/* every interval returns it's own id, which can be used to clear it
function sets new interval with new settings only when it has permisin for autoplay (from checkbox) */
function setAutoPlay() {
  if($('input.autoplay:checkbox').is(':checked')) {
	intervalId = setInterval(function() {nextImg();}, intervalTime);
  }
}

function nextImg () {
  prefferedClose(transition, duration);
  /* if reached last image then set the first one as next */
  if(!$currentImg.hasClass('last')) {
    $currentImg = $currentImg.next();
  }
  else {
    $currentImg = $('li').first();
  }
  prefferedOpen(transition, duration);
}

function prevImg() {
  prefferedClose(transition, duration);
  /* if reached first image then set the last one as previous */
  if(!$currentImg.hasClass('first')) {
    $currentImg = $currentImg.prev();
  }
  else {
    $currentImg = $('li').last();
  }
  prefferedOpen(transition, duration);
}

$(function() {
  /* init duration and autoplay interval */
  $('input.autoplay:text').attr('value', intervalTime);
  $('input#duration').attr('value', duration);

  /* action handlers for prev/next buttons */
  $('#next, .pictures').on('click', function() {
    nextImg();
  });

  $('#prev').on('click', function () {
	   prevImg();
  });

/* show settings icon only if menu is hidden */
  $('.playground').on('mouseenter', function() {
    if($('.menu').is(':hidden')) {
      $('.settings').show();
    }
  });

/* hide settings icon if mouse is outside the gallery */
  $('.playground').on('mouseleave', function() {
    $('.settings').hide();
  });

/* to close menu: hide it, then show settings icon */
  $('.close').on('click', function() {
    $(this).parent().hide();
    $('.settings').show();
  });
/* to show menu: hide settings icon, then show menu */
  $('.settings').on('click', function() {
    $(this).hide();
    $('.menu').show();
  });

});
