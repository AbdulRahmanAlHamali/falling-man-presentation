var showStreams = function() {
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
      keepGenerating = false;
      let hero = $('<div class="hero person"></div>');
      hero.html($('#svgContainer').html())
      hero.find('svg')
        .attr('width', containerDiv.width() / 5)
        .attr('height', containerDiv.height() / 3)
      containerDiv.append(hero)
      hero.css({top: containerDiv.height()/4 - hero.height()/2});
    	hero.css({left: containerDiv.width()/4 - hero.width()/2});
      shake(d3.select(hero.get(0)));

      let stepHeight = containerDiv.height() * 1/2;
      let stepWidth = containerDiv.width() * 1/2;
      for (let i = 0; i < 10; i++) {
        if ((i+1) % 3 === 0 || (i+1) % 3 === 1) {

          continue;
        }
        for (let j = 0; j < 10; j++) {
          if (i === 7 && j === 7) {
            continue;
          }
          let person = $('<div class="person"></div>')
          person.html($('#svgContainer').html())
          person.find('svg')
            .attr('width', containerDiv.width() / 5)
            .attr('height', containerDiv.height() / 3)
          containerDiv.append(person);
          person.css({top: ((i - 7) * stepHeight) + (stepHeight/2 - person.height()/2)});
          person.css({left: ((j - 7) * stepWidth) + (stepWidth/2 - person.width()/2)});
          shake(d3.select(person.get(0)));
        }
      }

      containerDiv.addClass("streams")
      showPlayingStream();

      $(document).off('keyup', clickHandler)
    }
  }

  $(document).keyup(clickHandler)
}
