function Voronoi(coordinatesString, useManhattan) {
  this.points = parseCoordinates(coordinatesString);
  var bounds = findBounds(this.points);
  this.cellsX = bounds[0] + 2;
  this.cellsY = bounds[1] + 2;
  this.showDistances = false;
  this.useManhattan = useManhattan;
  this.maxSumDistances = 0;
  this.distanceThreshold;


  this.computeDistances = function() {
    var here;
    var distances;
    var maxes;
    var sumDistances;

    this.grid = getGrid(this.cellsX, this.cellsY);
    // Fill grid with initial points
    for (var i = 0; i < points.length; i++) {
      this.grid[points[i].y][points[i].x] = i;
    }

    this.distancesGrid = getGrid(this.cellsX, this.cellsY);

    for (var i = 0; i < this.cellsY; i++) {
      for (var j = 0; j < this.cellsX; j++) {
        here = createVector(j, i);
        distances = [];
        for (var idx = 0; idx < this.points.length; idx++) {
          if (this.useManhattan) {
            distances[idx] = manhattanDistance(here, this.points[idx]);
          } else {
            distances[idx] = euclideanDistance(here, this.points[idx]);
          }
        }
        sumDistances = distances.reduce((a, b) => a + b, 0);
        this.maxSumDistances = max(this.maxSumDistances, sumDistances)
        this.distancesGrid[i][j] = sumDistances;
        maxIndex = indexOfMin(distances);
        distances.sort(function(a, b){return a - b});
        if (distances[0] == distances[1] || distances[0] == 0) {
          continue;  // line of voronoi diagram or one of the points
        } else {
          this.grid[i][j] = maxIndex;
        }
      }
    }
  }
  this.computeDistances();

  this.draw = function() {
    var x;
    var y;
    var value;
    var cellColor;
    var cellWidth = width / this.cellsX;
    var cellHeight = height / this.cellsY;
    rectMode(CORNER);
    noStroke();
    colorMode(HSB, points.length, 100, 100);
    var sizeSafe = 0;
    for (var i = 0; i < this.cellsY; i++) {
      for (var j = 0; j < this.cellsX; j++) {
        if (!this.showDistances) {
          colorMode(HSB, points.length, 100, 100);
          value = this.grid[i][j];
          if (value == -1) {
            cellColor = color(10, 0, 10);
          } else {
            cellColor = color(value, 75, 75);
          }
        } else {
          // colorMode(RGB, this.maxSumDistances);
          colorMode(RGB, 255);
          value = this.distancesGrid[i][j];
          if (value < this.distanceThreshold) {
            sizeSafe++;
            cellColor = color(200);
          } else {
            cellColor = color(100);
          }
          // cellColor = color(value);
        }
        x = j * cellWidth;
        y = i * cellHeight;
        fill(cellColor);
        rect(x, y, cellWidth, cellHeight);
      }
    }

    print('Safe area:', sizeSafe)

    // Initial points are more visible
    var point;
    colorMode(HSB, points.length, 100, 100);
    for (var idx = 0; idx < points.length; idx++) {
      point = points[idx];
      value = this.grid[point.y][point.x];
      cellColor = color(value, 100, 100);
      x = point.x * cellWidth;
      y = point.y * cellHeight;
      fill(cellColor);
      rect(x, y, cellWidth, cellHeight);
    }
  }

  this.getMaxArea = function() {
    var areasMap = {};
    var area = 0;
    var touchesBorder = false;
    var value;
    for (var idx = 0; idx < this.points.length; idx++) {
      areasMap[idx] = [area, touchesBorder];
    }
    for (var i = 0; i < this.cellsY; i++) {
      for (var j = 0; j < this.cellsX; j++) {
        value = this.grid[i][j];
        if (value == -1) {
          continue;
        }
        if (i == 0 || j == 0 || i == this.cellsY - 1 || j == this.cellsX - 1) {
          areasMap[value][1] = true;
        }
        areasMap[value][0]++;
      }
    }
    var maxArea = 0;
    var value;
    Object.keys(areasMap).forEach(function(key) {
        value = areasMap[key];
        area = value[0];
        touchesBorder = value[1];
        if (!touchesBorder) {
          maxArea = max(maxArea, area);
        }
    });
    return maxArea;
  }

  this.getSafeRegion = function() {

  }
}


function parseCoordinates(coordinatesString) {
  points = [];
  var lines = coordinatesString.split("\n");
  var chars;
  var numbers;
  var x;
  var y;
  var point;
  for (var i = 0; i < lines.length; i++) {
    chars = lines[i].split(", ");
    numbers = chars.map(Number);
    x = numbers[0];
    y = numbers[1];
    point = createVector(x, y);
    points.push(point);
  }
  return points;
}


function findBounds(points) {
  var maxX = 0;
  var maxY = 0;
  for (var i = 0; i < points.length; i++) {
    maxX = max(maxX, points[i].x);
    maxY = max(maxY, points[i].y);
  }
  return [maxX, maxY];
}


function getGrid(sizeX, sizeY) {
  var grid = [];
  for (var i = 0; i < sizeY; i++) {
    grid[i] = [];
    for (var j = 0; j < sizeX; j++) {
      grid[i].push(-1);
    }
  }
  return grid;
}


function manhattanDistance(point1, point2) {
  var diffX = abs(point1.x - point2.x);
  var diffY = abs(point1.y - point2.y);
  return diffX + diffY;
}


function euclideanDistance(point1, point2) {
  return dist(point1.x, point1.y, point2.x, point2.y);
}


function indexOfMin(arr) {
  // https://stackoverflow.com/a/11301464/3956024
  if (arr.length === 0) {
      return -1;
  }
  var minValue = arr[0];
  var minIndex = 0;
  for (var i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
          minIndex = i;
          minValue = arr[i];
      }
  }
  return minIndex;
}
