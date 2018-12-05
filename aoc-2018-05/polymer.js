function Polymer(string) {
  this.string = string;
  this.monomers = getMonomers(this.string);
  this.reacting = true;
  this.update = function() {
    this.react();
    this.move();
  }

  this.react = function (){
    if (!this.reacting) {
      return;
    }
    var indicesRemove = [];
    var current;
    var previous;
    for (var i = 1; i < this.monomers.length; i++){
      current = this.monomers[i];
      previous = this.monomers[i - 1];
      if (monomersReact(previous, current)) {
        indicesRemove.push(i - 1);
        indicesRemove.push(i);
        i++;  // skip next one, as in acCcbaD
      }
    }
    if (indicesRemove.length == 0) {
      this.reacting = false;
      print("End of reaction");
    }
    indicesRemove.reverse();
    var idxToRemove;
    for (var i = 0; i < indicesRemove.length; i++) {
      idxToRemove = indicesRemove[i];
      this.monomers.splice(idxToRemove, 1);
    }
  }

  this.move = function() {
    var monomer;
    for (var idx = 0; idx < this.monomers.length; idx++) {
      monomer = this.monomers[idx];
      monomer.j = idx % numCellsX;
      monomer.i = floor(idx / numCellsX);
      if (monomer.i % 2 == 1) {
        monomer.j = numCellsX - 1 - monomer.j;
      }
    }
  }

  this.draw = function() {
    for (var i = 0; i < this.monomers.length; i++) {
      this.monomers[i].draw();
    }
  }
}


function monomersReact(monomerA, monomerB) {
  DIFF_CASE = 32;
  var distance = abs(monomerA.ascii - monomerB.ascii);
  var react = distance == DIFF_CASE;
  // if(react) {
  //   print(monomerA.char, "and", monomerB.char, "reacted!")
  // }
  return react;
}


function getMonomers(string) {
  var monomers = [];
  var char;
  var x;
  var y;
  var monomer;
  var i;
  var j;
  for (var idx = 0; idx < string.length; idx++) {
    j = idx % numCellsX;
    i = floor(idx / numCellsX);
    if (i % 2 == 1) {
      j = numCellsX - 1 - j;
    }
    char = string[idx];
    monomer = new Monomer(char, i, j);
    monomers.push(monomer);
  }
  return monomers;
}
