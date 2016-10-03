(function($, d3) {
  let shakeOnce = (personImage) => {
    personImage.transition().duration(200)
      .attr('transform', 'rotate(174.541, 246.143, 238.404)')
      .on('end', () => {
        personImage.transition().duration(200)
          .attr('transform', 'rotate(176.541, 246.143, 238.404)')
          .on('end', () => {
            shakeOnce(personImage)
          })
      })
  }
  let shake = (person) => {
    let personImage = person.select('#layer1')
    shakeOnce(personImage)
  }
  $(document).ready(() => {
    let person = $('.person').html($('#svgContainer').html())
  	let containerDiv = $('.container-div')
  	person.css({top: containerDiv.height()/2 - person.height()/2});
  	person.css({left: containerDiv.width()/2 - person.width()/2});
    shake(d3.select('.person'));
  })
})($, d3);
