function Gradient(colorIni, colorFin, position) {
  this.colorIni = colorIni;
  this.colorFin = colorFin;
  this.position = position;
}

var positions = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
}

function Risogram(gradients, numCells) {
  this.gradients = gradients;
  this.numCells = numCells;
  this.cellSize = 20;

  this.drawGradients = function () {
    let gradient;
    for (let gradientIdx = 0; gradientIdx < this.gradients.length; gradientIdx++) {
      gradient = this.gradients[gradientIdx];
      switch (gradient.position) {
        case positions.LEFT:
          x = 0;
          y = 0;
          break;
        case positions.RIGHT:
          x = width - this.cellSize / 2;
          y = 0;
          break;
        case positions.TOP:
          x = 0;
          y = 0;
          break;
        case positions.BOTTOM:
          x = 0;
          y = height - this.cellSize;
          break;
        default:
          break;
      }
    }
  }

  this.drawCells = function () {
    var colors = [];
    for (let gradientIdx = 0; gradientIdx < gradients.length; gradientIdx++) {
      for (let row = 0; row < this.numCells; row++) {
        for (let col = 0; col < this.numCells; col++) {

        }
      }
    }
  }
}
