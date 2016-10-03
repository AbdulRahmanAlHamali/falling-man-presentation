var showSideConvo = function() {
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
      let containerDiv = $('.container-div');
      containerDiv.empty();
      containerDiv.removeClass('many-people');
      let hero = $('<div class="hero person"></div>');
      hero.html($('#svgContainer').html())
      containerDiv.append(hero)
      let person = $('<div class="person"></div>');
      person.html($('#svgContainer').html())
      containerDiv.append(person)

      // We are doing this because the width and height of the div are not
      // immediately available for some reason
      setTimeout(() => {
        hero.css({top: containerDiv.height()/2 - hero.height()/2});
        hero.css({left: containerDiv.width()*4/5});
        person.css({top: containerDiv.height()/2 - person.height()/2});
        person.css({left: containerDiv.width()/5});
        person.css({transform: 'scale(-1, 1)'});
        shake(d3.select(hero.get(0)));
        shake(d3.select(person.get(0)));
        keepGenerating = true;
      }, 100)

      showStreams();
      $(document).off('keyup', clickHandler)
    }
  }

  $(document).keyup(clickHandler)

}
