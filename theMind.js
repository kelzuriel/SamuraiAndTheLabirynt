// the story of the samurai who woke hungover and needed to find his lost katana
// before his daimio found out and made him cut his guts with his little sword...

function Labyrinth (numberOfLines, numberOfColumns, wallsPerRow, startY, startX, goalY, goalX) {
  this.numberOfLines = numberOfLines;
  this.numberOfColumns = numberOfColumns;
  this.wallsPerRow = wallsPerRow;
  this.startY = startY;
  this.startX = startX;
  this.goalY = goalY;
  this.goalX = goalX;
};

//EXAMPLE:
// var numberOfLines = 3;
// var numberOfColumns = 10;

// var wallsPerRow = {0: [0,1,2,3,4,5,6,7,8,9], 1: [0,7,8,9], 2: [0,1,2,3,4,5,6,7,8,9]};

// var startY = 1;
// var startX = 1;

// var goalY = 1;
// var goalX = 6;

var firstLabyrinth = new Labyrinth(3, 10, {0: [0,1,2,3,4,5,6,7,8,9], 1: [0,7,8,9], 2: [0,1,2,3,4,5,6,7,8,9]}, 1, 1, 1, 7);
var secondLabyrinth = new Labyrinth(3, 10, {0: [0,1,2,3,4,5,6,7,8,9], 1: [0,7,8,9], 2: [0,1,2,3,4,5,6,7,8,9]}, 1, 1, 1, 4);

Labyrinth.prototype.calculate = function() {
  var labyrinth = new Array(this.numberOfLines);
  for (var i = 0; i < labyrinth.length; i++) {
    labyrinth[i] = new Array(this.numberOfColumns).fill('Empty');
  };

  var keys = Object.keys(this.wallsPerRow);

  for(var i = 0; i < keys.length; i++) {
    var columns = this.wallsPerRow[keys[i]];
    for(var j = 0; j < columns.length; j++) {
      labyrinth[keys[i]][columns[j]] = "Wall";
    };
  };

  labyrinth[this.startY][this.startX] = "Samurai";
  labyrinth[this.goalY][this.goalX] = "Katana";

  var calculateShortestPath = function([startY, startX], labyrinth) {
    var dft = startY;
    var dfl = startX;

    position = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      route: [],
      status: 'Samurai'
    };

    var rememoriseList = [position];

    while (rememoriseList.length > 0) {
      var currentPosition = rememoriseList.shift();

      var directions = ["Up", "Right", "Down", "Left"];
      for( dir in directions){
        var newPosition = exploreInDirection(currentPosition, directions[dir], labyrinth);
        if(newPosition.status == 'Katana') {
          return newPosition;

        } else if(newPosition.status == 'Valid') {
          rememoriseList.push(newPosition);
        };
      };
    };

    return false;
  };

  var locationStatus = function(position, labyrinth) {
    var dft = position.distanceFromTop;
    var dfl = position.distanceFromLeft;

    if(dfl < 0 || dfl >= this.numberOfColumns || dft < 0 || dft >= this.numberOfLines) {
      return 'Invalid';
    } else if(labyrinth[dft][dfl] == 'Katana') {
      return 'Katana';
    } else if(labyrinth[dft][dfl] != 'Empty') {
      return 'Blocked';
    } else {
      return 'Valid';
    };
  };

  var exploreInDirection = function(currentPosition, direction, labyrinth) {
    var newRoute = currentPosition.route.slice();
    newRoute.push(direction);

    var dft = currentPosition.distanceFromTop;
    var dfl = currentPosition.distanceFromLeft;

    if(direction == 'Up') {
      dft -= 1;
    } else if(direction == 'Right') {
      dfl += 1;
    } else if(direction == 'Down') {
      dft += 1;
    } else if(direction == 'Left') {
      dfl -= 1;
    };

    var newPosition = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      route: newRoute,
      status: 'Unknown'
    };
    newPosition.status = locationStatus(newPosition, labyrinth);

    if(newPosition.status == 'Valid') {
      labyrinth[newPosition.distanceFromTop][newPosition.distanceFromLeft] = 'Investigated';
    };

    return newPosition;
  };

  var paths = calculateShortestPath([this.startY,this.startX], labyrinth);
  console.log(paths);
  return paths.route.length;

};

var first = Math.min(firstLabyrinth.calculate(), secondLabyrinth.calculate());
console.log("Shortest path is achieved in " + first + " moves.");
