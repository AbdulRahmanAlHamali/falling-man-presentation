var showBattle = function() {

  let clickHandler = (event) => {
    if (event.keyCode === 33) {
      let textDiv = $('<div class="text-div"></div>')
      textDiv.html('<h1 class="battle">Inside Everyone of Us, There is a Battle Between Comfort, and The Search for The Truth</h1>')
      textDiv.hide().appendTo($('body')).fadeIn(1500)

      $(document).off('keyup', clickHandler)

      let innerClickHandler = (event) => {
        if (event.keyCode === 33) {
          textDiv.fadeOut(500, () =>
          {
            textDiv.remove()
            let innerTextDiv = $('<div class="text-div"></div>')
            let listOfReasons = $('<ol class="reasons"></ol>');
            listOfReasons.append($('<li>The Truth is Hard to Reach</li>'))
            innerTextDiv.append(listOfReasons)
            innerTextDiv.hide().appendTo($('body')).fadeIn(1500)

            let innerinnerClickHandler = (event) => {
              if (event.keyCode === 33) {
                let secondReason = $('<li>The Truth Might Be Inconvenient</li>')
                secondReason.hide().appendTo(listOfReasons).fadeIn(1500);
                let innerinnerinnerClickHandler = (event) => {
                  if (event.keyCode === 33) {
                    let thirdReason = $('<li>The Truth Requires an Open Mind</li>')
                    thirdReason.hide().appendTo(listOfReasons).fadeIn(1500);
                    showConclusion();
                    $(document).off('keyup', innerinnerinnerClickHandler)
                  }
                }
                $(document).keyup(innerinnerinnerClickHandler)
                $(document).off('keyup', innerinnerClickHandler)
              }
            }
            $(document).keyup(innerinnerClickHandler)
          })
          $(document).off('keyup', innerClickHandler)
        }
      }

      $(document).keyup(innerClickHandler)
    }
  }

  $(document).keyup(clickHandler)
}
