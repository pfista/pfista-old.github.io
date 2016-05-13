let links = document.getElementsByTagName('a');
for (l in links) {
  const href = links[l].href;
  links[l].onclick = function(e) {
    e.preventDefault();
    element = document.getElementsByTagName('body')[0];
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.5;
    }, 40);

    setTimeout( function () {
      window.location = href;
    }, 300);
  };
}
