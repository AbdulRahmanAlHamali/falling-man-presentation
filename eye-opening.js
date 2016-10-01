(function($, d3) {
  let openUpper = (upper) => {
    upper.transition().duration(500)
      .attr('d', 'M0,0H100V50C200,0,-100,0,0,50Z')
  }
  let openLower = (lower) => {
    lower.transition().duration(500)
      .attr('d', 'M0,50C-100,100,200,100,100,50V100H0Z')
  }
  let open = (eye) => {
    openUpper(d3.select('#upper-eye'));
	openLower(d3.select('#lower-eye'));
	setTimeout(() => {
	  eye.fadeOut(1000, () => eye.remove());
	}, 500);
  }
  $(document).click(() => {
    open($('#eye'))
  })
})($, d3);
