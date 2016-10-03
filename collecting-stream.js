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

  let animateVertically = (bird, cage) => {
    if (!bird.attr('caught')) {
	  let brect = cage.find('path').get(0).getBoundingClientRect();
	  let top = brect.top + brect.height * 4.5/6;
      bird.animate({top: top - bird.height()/2},
      {
        duration: 500,
        queue: false,
        complete: () => {
		  let brect = cage.find('path').get(0).getBoundingClientRect();
		  let top = brect.top + brect.height * 5/6;
	      bird.animate({top: top},
          {
            duration: 500,
            queue: false,
            complete: () => {
              animateVertically(bird, cage)
            }
          })
        }
      })
    }
  }

  let animate = (bird, cage) => {
    let brect = cage.find('path').get(0).getBoundingClientRect();
	let left = brect.left;
	let right = left + brect.width;
    bird.animate({left: Math.random() * (right - left - bird.width()) + (left)},
    {
      duration: 3000,
      easing: 'linear',
      queue: false,
      complete: () => {
        bird.attr('caught', true)
      }
    })
    animateVertically(bird, cage);
  }

  let generateOneBird = (cage) => {
    if (keepGeneratingBirds) {
      let bird = $('<div style="position: absolute; height: 50; width: 50"></div>');
      bird.html($('#birdSVGContainer').html())
      let containerDiv = $('.container-div')
	  let brect = cage.find('path').get(0).getBoundingClientRect();
	  let top = brect.top + brect.height * 5/6;
      bird.css({top: top - bird.height()/2});
      bird.css({left: containerDiv.width() + bird.width()})
      containerDiv.append(bird);
      animate(bird, cage)
    }
  }
  let generateBirds = (cage) => {
    generateOneBird(cage);
    setTimeout(() => {
	    generateBirds(cage);
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
	  
	  let cage = $('<div></div>');
	  cage.html($('#birdCollectionSVGContainer').html())
	  cage.css({width: containerDiv.width() * 0.45});
	  cage.css({height: containerDiv.height() * 0.5});
	  cage.css({left: 0, top: 0});
	  containerDiv.append(cage);

      generateBirds(cage);

      $(document).off('keyup', clickHandler)
    }
  }

  $(document).keyup(clickHandler)
}
