// the story of the samurai who woke hungover and needed to find his lost katana
// before his daimio found out and made him cut his guts with his little sword...



var castle = new Array(10);
for (var i = 0; i < castle.length; i++) {
  castle[i] = new Array(10).fill('Empty');
}

castle[0][0] = "Samurai";
castle[8][8] = "Katana";

castle[0][3] = "Wall";

castle[2][0] = "Wall";
castle[2][1] = "Wall";
castle[2][2] = "Wall";
castle[2][3] = "Wall";

castle[4][3] = "Wall";
castle[4][4] = "Wall";
castle[4][5] = "Wall";
castle[4][6] = "Wall";

castle[5][6] = "Wall";

castle[6][6] = "Wall";

castle[7][7] = "Wall";
castle[7][8] = "Wall";
castle[7][9] = "Wall";

castle[8][7] = "Wall";

var calculateShortestPath = function([startY, startX], castle) {
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
      var newPosition = exploreInDirection(currentPosition, directions[dir], castle);
      if(newPosition.status == 'Katana') {
        return newPosition;
      } else if(newPosition.status == 'Valid') {
        rememoriseList.push(newPosition);
      };
    };
  };

  return false;
};

var locationStatus = function(position, castle) {
  var castleSize = castle.length;
  var dft = position.distanceFromTop;
  var dfl = position.distanceFromLeft;

  if(dfl < 0 || dfl >= castleSize || dft < 0 || dft >= castleSize) {
    return 'Invalid';
  } else if(castle[dft][dfl] == 'Katana') {
    return 'Katana';
  } else if(castle[dft][dfl] != 'Empty') {
    return 'Blocked';
  } else {
    return 'Valid';
  }
};

var exploreInDirection = function(currentPosition, direction, castle) {
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
  }

  var newPosition = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    route: newRoute,
    status: 'Unknown'
  };
  newPosition.status = locationStatus(newPosition, castle);

  if(newPosition.status == 'Valid') {
    castle[newPosition.distanceFromTop][newPosition.distanceFromLeft] = 'Investigated';
  }

  return newPosition;
};

console.log(calculateShortestPath([0,0], castle));
