// On swipe event
$('slider').on('swipe', function(event, slick, direction){
    console.log(direction);
    // left
  });
  
  // On edge hit
  $('.slider').on('edge', function(event, slick, direction){
    console.log('edge was hit')
  });
  
  // On before slide change
  $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    console.log(nextSlide);
  });