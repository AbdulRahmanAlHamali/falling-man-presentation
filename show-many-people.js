var showManyPeople = function () {
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
  let clickHandler = () => {
	
	let containerDiv = $('.container-div');
	let stepHeight = containerDiv.height();
	let stepWidth = containerDiv.width();
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if (i === 7 && j === 7) {
				continue;
			}
			let person = $('<div class="person"></div>')
			person.html($('#svgContainer').html())
			
			person.css({top: ((i - 7) * stepHeight) + (stepHeight/2 - person.height()/2)});
			person.css({left: ((j - 7) * stepWidth) + (stepWidth/2 - person.width()/2)});
			containerDiv.append(person);
			shake(d3.select(person.get(0)));
		}
	}
	/*
	airStartLimitX = -7*containerDiv.width();
	airEndLimitX = 3*containerDiv.width();
	airStartLimitY = 3*containerDiv.height();
	airEndLimitY = -7*containerDiv.height();
	airIntensity = 40;
	airDuration = 4000;
	airParticleWidth = 10;
	airParticleHeight = 150;*/
	keepGenerating = false;
	//let d3ContainerDiv = d3.select(containerDiv.get(0));
	//d3ContainerDiv.transition().style("transform", "scale(0.1, 0.1)")
	containerDiv.addClass("many-people")
	//containerDiv.addClass("many-people-translate");
	//d3ContainerDiv.transition().style("transform", "translate(200%, 200%)")
	//containerDiv.animate({transform: 'scale(0.1, 0.1)'});
	
	$(document).off('click', clickHandler);
  }	
  $(document).click(clickHandler);
}