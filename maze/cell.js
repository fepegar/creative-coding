function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.back = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j-1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if(top && !top.visited) {
      neighbors.push(top);
    }

    if(right && !right.visited) {
      neighbors.push(right);
    }

    if(bottom && !bottom.visited) {
      neighbors.push(bottom);
    }

    if(left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }


  this.highlight = function() {
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(0, 255, 0, 200);
    rect(x, y, w, w);
  }


  this.show = function() {
    var x = this.i * w;
    var y = this.j * w;
    stroke(0, 255, 0);
    // noFill();
    // rect(x, y, w, w);
    if(this.walls[0]) {
      line(x,     y,     x + w, y    );  // top
    }
    if(this.walls[1]) {
      line(x + w, y,     x + w, y + w);  // right
    }
    if(this.walls[2]) {
      line(x,     y + w, x + w, y + w);  // bottom
    }
    if(this.walls[3]) {
      line(x,     y,     x,     y + w);  // left
    }

    if(this.visited) {
      noStroke();
      if (this.back) {
        fill(255, 0, 255, 100);
      } else {
        fill(255, 0, 255, 50);
      }
      rect(x, y, w, w);
    }

  }
}
