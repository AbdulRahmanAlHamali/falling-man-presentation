(function($, d3) {
  // let animate = (airParticle) => {
  //   airParticle.animate({top: 0 - airParticle.height()}, 1000, 'linear',
  //   () => {
  //     airParticle.remove();
  //   })
  // }
  // let generateOneLine = () => {
  //   for (let i = 0; i < 20; i++) {
  //     let space = $(document).width() / 20;
  //
  //     let airParticle = $('<div class="air-moving-up"></div>');
  //     $('.container-div').append(airParticle);
  //     airParticle.css({top: $(document).height() - airParticle.height()})
  //     airParticle.css({left: space * i})
  //     animate(airParticle)
  //   }
  // }
  // let generate = () => {
  //   setTimeout(() => {
  //     generateOneLine();
  //     generate();
  //   }, 200)
  // }
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
    shake(d3.select('.person'));
  })
})($, d3);
