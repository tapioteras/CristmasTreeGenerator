window.onload = function() {
  var edges = 3;
  var width = 18;
  var dimeColorChangeInterval = 200;
  var output = '';
  var buildChar = function(id, val) { return '<span id="' + id + '">' + val + '</span>' };
  var getRandomColor = function() { return "#"+((1<<24)*Math.random()|0).toString(16); };
  setInterval(function() {
    var dimes = document.getElementsByClassName("dime");
    for (var i = dimes.length - 1; i >= 0; i--) {
      dimes[i].style.color = getRandomColor();
    }
  }, dimeColorChangeInterval);
  var appendOutput = function(t) { output = output.concat(t); };
  var getTreeMaterial = function() { return buildChar('tree', '#'); };
  var getStarMaterial = function() { return buildChar('star', '*'); };
  var getCornerMaterial = function(isEnd) { return buildChar('tree', (!isEnd ? '/' : '\\')) }
  var getBackgroundMaterial = function() { return buildChar('backgroundChars', '_'); };
  var getBalloonMaterial = function() { 
    return '<span class="dime" style=" color: ' + getRandomColor() + '">o</span>'
  };
  var edgesLeft = edges;
  while (edgesLeft) {
    var counter = edgesLeft != edges ? parseInt(width / 4) : 0;
    for (i = 0; i <= width; i++) {
      for (j = 0; j <= width; j++) {
        var startDraw = parseInt(width / 2) - counter;
        var stopDraw = parseInt(width / 2) + counter;
        if (startDraw < 0) break;
        else if (j >= startDraw && j <= stopDraw) {
          if (counter == 0) appendOutput(getStarMaterial());
          else if (j == startDraw || j == stopDraw) appendOutput(getCornerMaterial((j == stopDraw)));
          else if (j == Math.floor((Math.random() * width) + 0)) appendOutput(getBalloonMaterial());
          else appendOutput(getTreeMaterial());
        } else appendOutput(getBackgroundMaterial());
      }
      appendOutput('<br/>');
      if (counter == parseInt(width / 2)) break;
      counter++;
    }
    edgesLeft--;
  }

  document.body.innerHTML = output;
};