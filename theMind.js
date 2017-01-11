// A Samurai is lost in a labyrinth. He lost his katana and things the katana is somewhere in the same labyrinth. He needs the help of gods to show him the shortest way to get to the Katana, so he can be ready to fight.
// The gods need to tell him to make 6 moves: up, right, right, right, right&down, down



var castle = new Array(3);
for (var i = 0; i < castle.length; i++) {
  castle[i] = new Array(6).fill('Empty');
}

castle[1][1] = "Samurai";
castle[2][5] = "Katana";

castle[0][0] = "Wall";

castle[1][2] = "Wall";
castle[1][3] = "Wall";

castle[2][0] = "Wall";
castle[2][1] = "Wall";
castle[2][2] = "Wall";

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

  if(dfl < 0 || dfl >= 6 || dft < 0 || dft >= 3) {
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
  if(newPosition.route[4] == 'Right' && newPosition.route[5] == 'Down') {
    newPosition.route.splice(4,5);
    newPosition.route.push("Right&Down");
  }
  return newPosition;

};

console.log(calculateShortestPath([1,1], castle));
