var keepGeneratingBirds = true;
var showCollectingStream = function() {
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

  let animateVertically = (bird) => {
    if ($(bird.get(0)).length) {
      bird.animate({top: $('.container-div').height() * 0.55},
      {
        duration: 500,
        queue: false,
        complete: () => {
          bird.animate({top: $('.container-div').height() * 0.5},
          {
            duration: 500,
            queue: false,
            complete: () => {
              animateVertically(bird)
            }
          })
        }
      })
    }
  }

  let animate = (bird) => {
    bird.animate({left: 0 - bird.width()},
    {
      duration: 3000,
      easing: 'linear',
      queue: false,
      complete: () => {
        bird.remove();
      }
    })
    animateVertically(bird);
  }

  let generateOneBird = () => {
    if (keepGeneratingBirds) {

      let bird = $('<div style="position: absolute;"></div>');
      bird.html($('#birdSVGContainer').html())
      let containerDiv = $('.container-div')
      bird.css({top: containerDiv.height() * 0.5});
      bird.css({left: containerDiv.width() + bird.width()})
      containerDiv.append(bird);
      animate(bird)
    }
  }
  let generateBirds = () => {
    generateOneBird();
    setTimeout(() => {
	    generateBirds();
    }, 2000)
  }

  let clickHandler = (event) => {
    if (event.keyCode === 33) {
      let containerDiv = $('.container-div');
      containerDiv.empty();
      let hero = $('<div class="hero person"></div>');
      hero.html($('#svgContainer').html())
      hero.css({top: containerDiv.height()});
      hero.css({left: -containerDiv.width()});
      containerDiv.append(hero)
      shake(d3.select(hero.get(0)));
      hero.css({transform: 'scale(0.3, 0.3)'})

      hero.animate({left: containerDiv.width()/3, top: containerDiv.height()*5/10}, 2000)

      for (let i = 0 ; i < 7; i++) {
        let person = $('<div class="person"></div>');
        person.html($('#svgContainer').html())
        person.css({top: containerDiv.height() * 1/4});
        person.css({left: containerDiv.width() * i / 7});
        person.css({transform: 'scale(0.3, 0.3)'})
        containerDiv.append(person)
        shake(d3.select(person.get(0)))
      }

      generateBirds();

      $(document).off('keyup', clickHandler)
    }
  }

  $(document).keyup(clickHandler)
}
