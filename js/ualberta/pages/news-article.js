$(document).ready(function() {
  var img = $(".image-caption-container:first img");
  var pic_real_width, pic_real_height;
  $("<img/>") // Make in memory copy of image to avoid css issues
      .attr("src", $(img).attr("src"))
      .load(function() {
          pic_real_width = this.width;   // Note: $(this).width() will not
          pic_real_height = this.height; // work for in memory images.
  });
  if(pic_real_width < 700) {
    $('.frame').css({
      'float':        'right',
      'width':        '50%',
      'margin-left':  '1em'
    });
  }
});