// the story of the samurai who woke hungover and needed to find his lost katana
// before his daimio found out and made him cut his guts with his little sword...


var lineNumber = 3;
var columnNumber = 10;

var startY = 1;
var startX = 1;

var labyrinth = new Array(lineNumber);
for (var i = 0; i < labyrinth.length; i++) {
  labyrinth[i] = new Array(columnNumber).fill('Empty');
};

labyrinth[startY][startX] = "Samurai";
labyrinth[1][6] = "Katana";

labyrinth[0][0] = "Wall";
labyrinth[0][1] = "Wall";
labyrinth[0][2] = "Wall";
labyrinth[0][3] = "Wall";
labyrinth[0][4] = "Wall";
labyrinth[0][5] = "Wall";
labyrinth[0][6] = "Wall";
labyrinth[0][7] = "Wall";
labyrinth[0][8] = "Wall";
labyrinth[0][9] = "Wall";

labyrinth[1][0] = "Wall";
labyrinth[1][9] = "Wall";

labyrinth[2][0] = "Wall";
labyrinth[2][1] = "Wall";
labyrinth[2][2] = "Wall";
labyrinth[2][3] = "Wall";
labyrinth[2][4] = "Wall";
labyrinth[2][5] = "Wall";
labyrinth[2][6] = "Wall";
labyrinth[2][7] = "Wall";
labyrinth[2][8] = "Wall";
labyrinth[2][9] = "Wall";

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

  if(dfl < 0 || dfl >= columnNumber || dft < 0 || dft >= lineNumber) {
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

console.log(calculateShortestPath([startY,startX], labyrinth));
