showTransition = function(cb) {
  let foreground = $('<div class="transition"></div>');
  foreground.hide().appendTo($('body')).fadeIn(500, () => {
    cb();
    foreground.fadeOut(1000, () => {
      foreground.remove()
    })
  })
}
