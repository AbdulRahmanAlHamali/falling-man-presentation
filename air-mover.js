(function($) {
  let animate = (airParticle) => {
    airParticle.animate({top: 0 - airParticle.height()}, 1000, 'linear',
    () => {
      airParticle.remove();
    })
  }
  let generateOneLine = () => {
    for (let i = 0; i < 20; i++) {
      let space = $(document).width() / 20;

      let airParticle = $('<div class="air-moving-up"></div>');
      $('.container-div').append(airParticle);
      airParticle.css({top: $(document).height() - airParticle.height()})
      airParticle.css({left: space * i})
      animate(airParticle)
    }
  }
  let generate = () => {
    setTimeout(() => {
      generateOneLine();
      generate();
    }, 200)
  }
  $(document).ready(() => {
    generate();
  })
})($);
