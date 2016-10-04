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
    let svg = person.select('svg');
    svg.attr('width', '600')
    svg.attr('height', '600')
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
        hero.css({top: -containerDiv.height()});
        hero.css({left: -containerDiv.width()});
        containerDiv.append(hero)
        shake(d3.select(hero.get(0)));
        hero.css({transform: 'scale(0.3, 0.3)'})

        hero.animate({left: containerDiv.width()/3, top: containerDiv.height()/10}, 2000)

        for (let i = 0 ; i < 7; i++) {
          let person = $('<div class="person"></div>');
          person.html($('#svgContainer').html())
          person.css({top: containerDiv.height() * 1/2});
          person.css({left: containerDiv.width() * i / 7});
          person.css({transform: 'scale(0.3, 0.3)'})
          containerDiv.append(person)
          circulate(d3.select(person.get(0)))
        }
      })

      showCollectingStream();
      $(document).off('keyup', clickHandler)
    }
  }

  $(document).keyup(clickHandler)
}
