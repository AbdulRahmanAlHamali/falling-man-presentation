var showSacredTruth = function() {

  let clickHandler = (event) => {
    if (event.keyCode === 33) {
      let textDiv = $('<div class="text-div"></div>')
      textDiv.html('<h1 class="sacred">The Search For the Truth is The Most Sacred Thing There is</h1>')
      textDiv.hide().appendTo($('body')).fadeIn(1500)

      $(document).off('keyup', clickHandler)

      let innerClickHandler = (event) => {
        if (event.keyCode === 33) {
          textDiv.fadeOut(500, () => textDiv.remove())
          roamSpeed = 200;

          showNod();
          $(document).off('keyup', innerClickHandler)
        }
      }

      $(document).keyup(innerClickHandler)
    }
  }

  $(document).keyup(clickHandler)
}
