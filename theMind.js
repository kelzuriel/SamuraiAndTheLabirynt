// the story of the samurai who woke hungover and needed to find his lost katana
// before his daimio found out and made him cut his guts with his little sword...



var castle = new Array(3);
for (var i = 0; i < castle.length; i++) {
  castle[i] = new Array(10).fill('Empty');
}

castle[1][1] = "Samurai";
castle[1][6] = "Katana";

castle[0][0] = "Wall";
castle[0][1] = "Wall";
castle[0][2] = "Wall";
castle[0][3] = "Wall";
castle[0][4] = "Wall";
castle[0][5] = "Wall";
castle[0][6] = "Wall";
castle[0][7] = "Wall";
castle[0][8] = "Wall";
castle[0][9] = "Wall";

castle[1][0] = "Wall";
castle[1][9] = "Wall";

castle[2][0] = "Wall";
castle[2][1] = "Wall";
castle[2][2] = "Wall";
castle[2][3] = "Wall";
castle[2][4] = "Wall";
castle[2][5] = "Wall";
castle[2][6] = "Wall";
castle[2][7] = "Wall";
castle[2][8] = "Wall";
castle[2][9] = "Wall";

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
  var dft = position.distanceFromTop;
  var dfl = position.distanceFromLeft;

  if(dfl < 0 || dfl >= 10 || dft < 0 || dft >= 3) {
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

console.log(calculateShortestPath([1,1], castle));
