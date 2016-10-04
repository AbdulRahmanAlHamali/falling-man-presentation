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
      $('.text-div').remove();
      let containerDiv = $('.container-div');
      containerDiv.empty();
      keepGenerating = true;
      let hero = $('<div class="hero person"></div>');
      hero.html($('#svgContainer').html())
      hero.css({left: containerDiv.width()/3});
      hero.css({top: containerDiv.height()/10});
      hero.css({transform: 'scale(0.3, 0.3)'})
      containerDiv.append(hero)

      for (let i = 0 ; i < 7; i++) {
        let person = $('<div class="person"></div>');
        person.html($('#svgContainer').html())
        person.css({top: containerDiv.height() * 1/2});
        person.css({left: containerDiv.width() * i / 7});
        person.css({transform: 'scale(0.3, 0.3)'})
        containerDiv.append(person)
        shake(d3.select(person.get(0)))
      }

      let innerClickHandler = (event) => {
        if (event.keyCode === 33) {
          hero.animate({top: containerDiv.height() * 0.55}, 3000, 'linear', () => {

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
    }
  }

  $(document).keyup(clickHandler)
}
