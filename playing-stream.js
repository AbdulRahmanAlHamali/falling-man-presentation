var showPlayingStream = function() {
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

  let circulateOnce = (personImage) => {
    personImage.transition().duration(1000).ease(d3.easeLinear)
      .attr('transform', 'rotate(0, 246.143, 238.404)')
      .on('end', () => {
        personImage.transition().duration(1000).ease(d3.easeLinear)
          .attr('transform', 'rotate(180, 246.143, 238.404)')
          .on('end', () => {
            personImage.transition().duration(1000).ease(d3.easeLinear)
              .attr('transform', 'rotate(359, 246.143, 238.404)')
              .on('end', () => {
                circulateOnce(personImage)
              })
          })
      })
  }
  let circulate = (person) => {
    let personImage = person.select('#layer1')
    circulateOnce(personImage)
  }

  let clickHandler = (event) => {
    if (event.keyCode === 33) {
      showTransition(() => {
        let containerDiv = $('.container-div');
        containerDiv.empty();
        containerDiv.removeClass('streams')
        keepGenerating = true;
        let hero = $('<div class="hero person"></div>');
        hero.html($('#svgContainer').html())
        let containerWidth = containerDiv.width();
        let containerHeight = containerDiv.height();
        hero.css({top: -containerHeight});
        hero.css({left: -containerWidth});
        hero.find('svg')
          .attr('width', containerWidth / 10)
          .attr('height', containerHeight / 6)
        containerDiv.append(hero)
        shake(d3.select(hero.get(0)));

        hero.animate({left: containerWidth/2 - hero.width()/2, top: containerHeight/2 - hero.height()/2}, 2000)

        for (let i = 0 ; i < 7; i++) {
          let person = $('<div class="person"></div>');
          person.html($('#svgContainer').html())
          person.find('svg')
            .attr('width', containerWidth / 10)
            .attr('height', containerHeight / 6)
          containerDiv.append(person)
          person.css({top: containerHeight * 9/12});
          person.css({left: containerWidth * i / 7});
          circulate(d3.select(person.get(0)))
        }
      })

      showCollectingStream();
      $(document).off('keyup', clickHandler)
    }
  }

  $(document).keyup(clickHandler)
}
