var showConclusion = function() {
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


  let clickHandler = (event) => {
    if (event.keyCode === 33) {
      showTransition(() => {
        $('.text-div').remove();
        let containerDiv = $('.container-div');
        containerDiv.empty();
        keepGenerating = true;
        let hero = $('<div class="hero person"></div>');
        hero.html($('#svgContainer').html())
        let containerWidth = containerDiv.width();
        let containerHeight = containerDiv.height();
        hero.find('svg')
          .attr('width', containerWidth / 10)
          .attr('height', containerHeight / 6)
        containerDiv.append(hero)
        hero.css({left: containerDiv.width()/2 - hero.width()/2});
        hero.css({top: containerDiv.height()/6});


        for (let i = 0 ; i < 7; i++) {
          let person = $('<div class="person"></div>');
          person.html($('#svgContainer').html())
          person.find('svg')
            .attr('width', containerWidth / 10)
            .attr('height', containerHeight / 6)
          containerDiv.append(person)
          person.css({top: containerHeight * 9/12});
          person.css({left: containerWidth * i / 7});
          shake(d3.select(person.get(0)))
        }

        let innerClickHandler = (event) => {
          if (event.keyCode === 33) {
            hero.animate({top: containerDiv.height() * 7/12}, 3000, 'linear', () => {

              let innerinnerClickHandler = (event) => {
                if (event.keyCode === 33) {
                  let d3Hero = d3.select(hero.get(0));
                  d3Hero.select('#layer1').transition().duration(2000)
                  .attr('transform', 'rotate(5.541, 246.143, 238.404)')
                  .on('end', () => {
                    hero.animate({top: 0 - hero.height() - 1000})
                  })
                  $(document).off('keyup', innerinnerClickHandler)
                }
              }
              $(document).keyup(innerinnerClickHandler);
            })
            $(document).off('keyup', innerClickHandler)
          }
        }

        $(document).keyup(innerClickHandler)
        $(document).off('keyup', clickHandler)
      })
    }
  }

  $(document).keyup(clickHandler)
}
