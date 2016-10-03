var keepGenerating = true;
var airStartLimitX;
var airEndLimitX;
var airStartLimitY;
var airEndLimitY;
var airIntensity = 20;
var airDuration = 1000;
var airParticleWidth = 3;
var airParticleHeight = 50;
(function($) {
  let animate = (airParticle) => {
    airParticle.animate({top: airEndLimitY - airParticle.height()}, airDuration, 'linear',
    () => {
      airParticle.remove();
    })
  }
  let generateOneLine = () => {
    if (keepGenerating) {
      for (let i = 0; i < airIntensity; i++) {
        let space = (airEndLimitX - airStartLimitX) / airIntensity;

        let airParticle = $('<div class="air-moving-up"></div>');
        $('.container-div').append(airParticle);
        airParticle.css({top: airStartLimitY - airParticle.height()})
        airParticle.css({left: airStartLimitX + space * i})
        airParticle.css({width: airParticleWidth});
        airParticle.css({height: airParticleHeight});
        animate(airParticle)
      }
    }
  }
  let generate = () => {
    setTimeout(() => {
      generateOneLine();
	    generate();  	  
    }, 200)
  }
  $(document).ready(() => {
  	airStartLimitX = 0;
  	airEndLimitX = $(document).width();
  	airStartLimitY = $(document).height();
  	airEndLimitY = 0;
    generate();
  })
})($);
