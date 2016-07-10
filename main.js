console.log("Page loaded, Game on!");

//// Will Cook
//// Web Development Immersive 21 - London GA 2016 

//// Self initializing function to auto start the script
$(function() {

  
//// ----  Variables   ----
// Is the player alive
  var playerAlive = true;
// Variable to store the bike
  var $bike = $('#bike');
// Count the number of cars on screen
  var numberOfCars = 0;
// Keeping track of what cars are on screen
  var carsOnScreen = [];
// Car tracking number
  var carNumber = 1;
// The last car moved

var lastCarMoved = "";

// Balanced ()
  var balancedL = 10;
  var balancedR = 10;  


//// ---- Functions ----

// Create a new car
  function newCar(lane,carTrackingNumber) {
    // if (lane === "topR") {
    var $car = $("<div class=\"car\" id=\"car" + lane + carTrackingNumber + "\"></div>");
    $(".board").append($car);
    carsOnScreen.push("#car" + lane + carTrackingNumber);
    console.log(carsOnScreen + ' COS');
    // console.log("making a new " + lane + " car");

    // } else if (lane === "bottomR") {
    //   var $car = $("<div class=\"car\" id=\"carbottomR\"></div>");
    //   $(".board").append($car);
    //   carsOnScreen.push("#carbottomR");
    //   console.log('making a new bottomR car');
      
    // } else if (lane === "bottomL") {
    //   var $car = $("<div class=\"car\" id=\"carbottomL\"></div>");
    //   $(".board").append($car);
    //   console.log('making a new bottomL car');
    //   carsOnScreen.push("#carbottomL");

    // } else if (lane === "topL") {
    //   var $car = $("<div class=\"car\" id=\"cartopL\"></div>");
    //   $(".board").append($car);
    //   console.log('making a new topL car');
    //   carsOnScreen.push("#cartopL");
    // } else {
    numberOfCars += 1;
  }

  function carMoveRtoL($car) {
    $car.animate({left: "-200px"}, 5000)
    // $car.animate({left: "-500px"}, 2500).delay( 2000 );
  };

  function carMoveLtoR($car) {
    $car.animate({left: "600px"}, 5000)
  };


// Function to check if the bike has hit a car
// Returns true if there is a collision
  function collisionTest($bike, $car) {
    var x1 = $bike.offset().left;
    var y1 = $bike.offset().top;
    var h1 = $bike.outerHeight(true);
    var w1 = $bike.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $car.offset().left;
    var y2 = $car.offset().top;
    var h2 = $car.outerHeight(true);
    var w2 = $car.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
    if (playerAlive){
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        playerAlive = true;
      } else { 
        playerAlive = false;
      }
    } else {
    }
  }

  // Do the following if the player has been hit
  function playerHit($car) {
    // console.log($car);
    if ((!playerAlive) || (checkForWin === true)) {
      // change the color of the bike
      $bike.css("background-color", "red");
      console.log($car.attr('id') + " hit the biker");
      console.log("You Lost");
      setTimeout(function () {
        // $('.gameoverhit').attr('show');
        $('.gameoverhit').attr('id','show');
        $('.board').removeAttr('id');

        // $(".gameoverhit").css("z-index", '10');
        // $(".board").css("z-index", '0');
        // $(".gameoveryouwon").css("z-index", '0');
        // $(".gameoverfelloff").css("z-index", '0');
      }, 1000);
    }
  }

  // Check if the player is balancing
  function checkIsBalanced () {
    if (playerAlive) {
      if (balancedL > 0 && balancedR > 0) {
        console.log("You are balanced");
      } else {
        console.log("You fell off!");
        playerAlive = false;
        // setTimeout(function () {
          // $(".gameoverfelloff").css("z-index", '10');
          // $(".board").css("z-index", '0');
          // $(".gameoverhit").css("z-index", '0');
          // $(".gameoveryouwon").css("z-index", '0');
          $('.gameoverfelloff').attr('id','show');
          $('.board').removeAttr('id');
          // }, 1000);
      }
    }
  }

  // Win function based on surviving a number of cars
  // being generated.
  function checkForWin(){ 
    // if (playerAlive) {
      // The amount of cars to win the level
      if (numberOfCars === 50) {
        console.log("You survived - You Won!");
        // setTimeout(function () {
          // $(".gameoveryouwon").css("z-index", '10');
          // $(".board").css("z-index", '0');
          // $(".gameoverhit").css("z-index", '0');
          // $(".gameoverfelloff").css("z-index", '0');
        $('.gameoveryouwon').attr('id','show');
        $('.board').removeAttr('id');
        return true;
        // You won!
        // }, 1000);
      } else {
        return false; // You did not win!
      // }
    }
  }
/////
function randomCar2() {
// function to create a random car
//Need to track the car number to know when animation is done

// Create a car..
// Possible Cars
  var carTopRowOptions = ['topL', 'topR'];
  var carBottomRowOptions = ['bottomL', 'bottomR'];
// Random number generators (0 or 1)
  var randomNum1 = Math.floor(Math.random()*(1-0+1)+0);
  var randomNum2 = Math.floor(Math.random()*(1-0+1)+0);
// Create a unique car... If a 0 create a top row car, 1 bottom row car
  if (randomNum2 === 0){  
    newCar(carTopRowOptions[randomNum1], carNumber);
  // if (carTopRowOptions[1] === 'topL'){
    // console.log('topL');
// If the car is a top right car then give it the properties
// of a top right car.  
    $( ".car[id*='topR']").css({'background-color': 'blue',
                              'top': '130px',
                              'left': '600px'});
    $( ".car[id*='topL']").css({'background-color': 'violet',
                              'top': '130px',
                              'left': '-100px'});
  } else {
// else if the random number is a 1 make a bottom row car
    newCar(carBottomRowOptions[randomNum1],carNumber);
    // If the car is a bottom right car then give it the properties
    // of a bottom right car. 
    $( ".car[id*='bottomR']").css({'background-color': 'gold',
                              'top': '320px',
                              'left': '600px'});
    $( ".car[id*='bottomL']").css({'background-color': 'green',
                              'top': '320px',
                              'left': '-100px'});

  }
  carNumber +=1;  
  console.log(carNumber + " car number");
}

//  get a car from the carsOnScreen list, move it then remove it
// from the list.

function actuallyMoveCar(carToMove) {
// If the car is on the Left move it Right
// Otherwise move it Right 

  if (carToMove.includes('L')) {
    // console.log('would move L to R');
    carMoveLtoR($(carToMove));
  } else {
    // Car must be from the R, moving it L now...
    // console.log('would move R to L');
    carMoveRtoL($(carToMove));
  }
}

function moveCar(carToMove, lastCarMoved) {
  // for (i=0; i < carsOnScreen.length; i++) {
    console.log("Car: "+ carToMove + " is the car on the move...");
    if (carToMove.includes('top')) {
      console.log("carToMove includes top");
    } else if (carToMove.includes('bottom')) {
      console.log("carToMove includes bottom");
    } else {
      console.log("carToMove else");
    }
    // Find out what the last car moved was... to avoid collisoins
    if (lastCarMoved === carToMove) {
      console.log("lastCarMoved === carToMove");
      // Same Car. Move the car, No collision possible
      actuallyMoveCar(carToMove);
      // if (carToMove.includes('L')) {
      //   // console.log('would move L to R');
      //   carMoveLtoR($(carToMove));
      // } else {
      //   // Car must be from the R, moving it L now...
      //   // console.log('would move R to L');
      //   carMoveRtoL($(carToMove));
      // }

    // Else if both on the same row. Move one then the other.
    // To avoid collisions       
    } else if ((lastCarMoved.includes('top') && (carToMove.includes('top'))) && 
      ((lastCarMoved.includes('L')) && (carToMove.includes('R')))) {
        console.log("waiting to move TopRCar, TopLCar in the way");
        // Need to add a wait before moving the car...
        setTimeout(function(){
          actuallyMoveCar(carToMove);
        },5000);
    
    } else if ((lastCarMoved.includes('top') && (carToMove.includes('top'))) && 
      ((lastCarMoved.includes('R')) && (carToMove.includes('L')))) {
        // Need to add a wait before moving the car...
        console.log("waiting to move TopLCar, TopRCar in the way");
        setTimeout(function(){
          actuallyMoveCar(carToMove);
        },5000);

    } else if ((lastCarMoved.includes('bottom') && (carToMove.includes('bottom'))) &&
      ((lastCarMoved.includes('L')) && (carToMove.includes('R')))) {
        // Need to add a wait before moving the car...
        console.log("waiting to move BottomRCar, BottomLCar in the way");
        setTimeout(function(){
          actuallyMoveCar(carToMove);
        },5000);

    } else if ((lastCarMoved.includes('bottom') && (carToMove.includes('bottom'))) &&
      ((lastCarMoved.includes('R')) && (carToMove.includes('L')))) {
        // Need to add a wait before moving the car...
        console.log("waiting to move BottomLCar, BottomRCar in the way");
        setTimeout(function(){
          actuallyMoveCar(carToMove);
        },5000);

    } else if (lastCarMoved === "") {
      // First lastCarMoved will be blank/empty
      // Just move the car
      actuallyMoveCar(carToMove);
    } else {
      // Not a collision, just move the car
      actuallyMoveCar(carToMove);
    }
  }



  //   if (carToMove.includes('L')) {
  //     // console.log('would move L to R');
  //     carMoveLtoR($(carToMove));
  //   } else {
  //     // console.log('would move R to L');
  //     carMoveRtoL($(carToMove));
  //   }
  // }



// function moveCar() {
//   // for (i=0; i < carsOnScreen.length; i++) {
//     console.log("Car: "+ carsOnScreen[i] + " would move here...");
//     if (carsOnScreen[i].includes('L')) {
//       // console.log('would move L to R');
//       carMoveLtoR($(carsOnScreen[i]));
//     } else {
//       // console.log('would move R to L');
//       carMoveRtoL($(carsOnScreen[i]));
//     }
//   }
// }



// Move that car..
// On condition that if on the same row they dont go at same time

// Once animation is finished remove the car..


/////
  // function randomCarTopRow() {
  // // Possible Cars
  //   var carTopRowOptions = ['topL', 'topR'];
  //   var carBottomRowOptions = ['bottomL', 'bottomR'];
  // // randomise which one goes first
  // // Random number 0 or 1
  //   var randomNum1 = Math.floor(Math.random()*(1-0+1)+0);
  //   // var randomNum2 = Math.floor(Math.random()*(1-0+1)+0);
  //   // console.log(randomNum);
  //   // console.log(carTopRowOptions[randomNum1]+" top row");
  //   // console.log(carBottomRowOptions[randomNum2]);

  //   newCar(carTopRowOptions[randomNum1]);
  //   //   // Variable for random time to move
  //   //   // return Math.floor(Math.random() * (max - min + 1)) + min;
  //   var randomTime = Math.floor(Math.random()*(4000-0+1)+0);
  //   if (carTopRowOptions[randomNum1] === 'topL') {
  //     carsOnScreen.push("#cartopL");
  //     // Move  the car right
  //     carMoveLtoR($("#car" + carTopRowOptions[randomNum1]));
  //     setTimeout(function(){
  //       console.log('Removing ' + $("#car" + carTopRowOptions[randomNum1]).attr('id'));
  //       $("#car" + carTopRowOptions[randomNum1]).stop(true,true);
  //       $("#car" + carTopRowOptions[randomNum1]).detach();
  //     },8500);
  //   } else {
  //     carsOnScreen.push("#cartopR");
  //     // Move the car left
  //     setTimeout(function(){
  //       carMoveRtoL($("#car" + carTopRowOptions[randomNum1]));  
  //     },3000);
  //     setTimeout(function(){
  //       console.log('Removing ' + $("#car" + carTopRowOptions[randomNum1]).attr('id'));
  //       $("#car" + carTopRowOptions[randomNum1]).stop(true,true);
  //       $("#car" + carTopRowOptions[randomNum1]).detach();
  //     },8500);
  //   }
  // };

  // function randomCarBottomRow() {
  // // Possible Cars
  //   // var carTopRowOptions = ['topL', 'topR'];
  //   var carBottomRowOptions = ['bottomL', 'bottomR'];
  // // randomise which one goes first
  // // Random number 0 or 1
  //   // var randomNum1 = Math.floor(Math.random()*(1-0+1)+0);
  //   var randomNum2 = Math.floor(Math.random()*(1-0+1)+0);
  //   // console.log(randomNum);
  //   // console.log(carTopRowOptions[randomNum1]);
  //   // console.log(carBottomRowOptions[randomNum2] +" bottom row");

  //   newCar(carBottomRowOptions[randomNum2]);
  //   //   // Variable for random time to move
  //   //   // return Math.floor(Math.random() * (max - min + 1)) + min;
  //   var randomTime = Math.floor(Math.random()*(4000-0+1)+0);
  //   if (carBottomRowOptions[randomNum2] === 'bottomL') {
  //     carsOnScreen.push("#carbottomL");
  //     // Move  the car right
  //     carMoveLtoR($("#car" + carBottomRowOptions[randomNum2]));
  //     setTimeout(function(){
  //       $("#car" + carBottomRowOptions[randomNum2]).stop(true,true);
  //       $("#car" + carBottomRowOptions[randomNum2]).detach();
  //     },8500);
  //   } else {
  //     carsOnScreen.push("#carbottomR");
  //     // Move the car left
  //     setTimeout(function(){
  //       carMoveRtoL($("#car" + carBottomRowOptions[randomNum2]));  
  //     },3000);
  //     setTimeout(function(){
  //       $("#car" + carBottomRowOptions[randomNum2]).stop(true,true);
  //       $("#car" + carBottomRowOptions[randomNum2]).detach();
  //     },8500);
  //   }
  // };
  //   // possible cars
  //   var carOptions = ['topR', 'topL', 'bottomR', 'bottomL']; 
  //   // // create a random number between 0 and 1
  //   var randomNum = Math.floor(Math.random()*(4));
  //   // 

  //   // Create the car
  //   newCar(carOptions[randomNum]);
  //   // Variable for random time to move
  //   // return Math.floor(Math.random() * (max - min + 1)) + min;
  //   var randomTime = Math.floor(Math.random()*(4000-0+1)+0);
    

  //   // Both top row cars
  //   if (carOptions[randomNum] === 'topR' || carOptions[randomNum] === 'bottomR') {
  //     var topArray = ['topR' + carOptions[randomNum],'topR' + carOptions[randomNum]]


  //     setTimeout(function () {
  //       carMoveRtoL($("#car" + carOptions[randomNum]));
  //     },randomTime);

  //     setTimeout(function (){
  //         // ($("#car" + carOptions[randomNum]).remove());
  //       ($("#car" + carOptions[randomNum]).stop(true,true));  
  //       ($("#car" + carOptions[randomNum]).detach());
  //       console.log('removing' + ($("#car" + carOptions[randomNum])));
  //     },4100);
      
  //   } else {
  //     setTimeout(function () {
  //       carMoveLtoR($("#car" + carOptions[randomNum]));
  //     },randomTime);
  //     setTimeout(function (){
  //         // ($("#car" + carOptions[randomNum]).remove());
  //       ($("#car" + carOptions[randomNum]).stop(true,true));
  //       ($("#car" + carOptions[randomNum]).detach());
  //       console.log('removing' + ($("#car" + carOptions[randomNum])));
  //     },4100);
      

  // }
  // console.log(randomNum + " randomNum");
  // console.log(randomTime+ " randomTime");
  // }
////////////////////////////////////// !!!!!!!!!!!!!!!!!!!!!

//// ---- Game ----

/// Random game movements
  // var playCount = 2;   

  // for (i=0; i < 2; i++) {
  //   console.log("play count " + playCount);
  //   randomCarTopRow();
  //   randomCarBottomRow();
  //   playCount--;
  // };


  
  // return Math.floor(Math.random() * (max - min + 1)) + min;
  // var randomTime = Math.floor(Math.random() * (10000-1000+1)+1000); 
  // Make the number of cars in carsToMake
  // for (i = 0; i < carsToMake; i++) {
  //   randomCar2();
    // console.log(i);
    // moveCar();
    // setTimeout(function() {
      // randomCar2();
      // moveCar();
    // },randomTime);
    // carsToMake -=1;
  // }

  // Create the random cars for the level.
  // Amount of cars to make in this level+1:
  var carsToMake = 41;
  // var count = 0;
  function levelSetup() {
    console.log("Setting up the Level");
    for (i = 0; i < carsToMake; i++) {
      // make random cars
      randomCar2();
      // console.log(i);
    }  
  }
  levelSetup();

  function playGame() {
  // for each car in carsOnScreen[] move it.
    // Need to record the last car moved
    // var lastCarMoved = "";
    // Now moved global
    for(i=0; (i<carsOnScreen.length-1); i++) {
      console.log(carsOnScreen[i] + " car on carsOnScreen[i]");
      // Random time to animate the car for
      // var randomTime = Math.floor(Math.random() * (10000-1000+1)+1000);
      lastCarMoved = carsOnScreen[i];
      console.log(lastCarMoved + " last car moved");
      if (carsOnScreen[i]) {
        setInterval((function() {
            function loop() {
                console.log('Running Loop' + i);
                console.log(carsOnScreen[i] + " COS[i] going into moveCar");
                moveCar(carsOnScreen[i], lastCarMoved);
            };
            loop();
            return loop;
        }()), 1000);
      } else {
        // [i] Must be undefined... 
      }
    }
  } 
  
  playGame();

  // setInterval((function() {
  //     function loop() {
  //         console.log('One Loop');
  //         playGame();
  //     };

  //     loop();
  //     return loop;
  // }()), 1000);

  // setInterval(function(){ 
  //     //code goes here that will be run every 5 seconds.    
  // }, 5000);
  // playGame();

  // function playLoop() {
  //     var rand = Math.round(Math.random() * (20000 - 500)) + 500;
  //     if (count < 40) {
  //       console.log(rand+ " rand");      
  //       //alert('is this working>');
  //       // Make and move cars
  //       playGame();
  //       // // loop this until the count === 40
  //       playloop();
  //       count +=1;  
  //     } else {
  //       console.log("playLoop done");
  //     }
  // }
  // playLoop();

  // Self invoking function that loops until the count is met
  // actions happen at random
  // (function playLoop() {
  //     var rand = Math.round(Math.random() * (20000 - 500)) + 500;
  //     if (count<40){
  //      setTimeout(function() {
  //         console.log(rand+ " rand");      
  //         //alert('is this working>');
  //         // Make and move cars
  //         playGame();
  //         // loop this until the count === 40
  //         playloop();  
  //       }, rand);
  //       count +=1;
  //     } else {
  //       console.log("playLoop done");
  //     }
  // }());

  // now move the cars at random from the cars on screen list
  // for(i=0; i < carsOnScreen.length; i++) {
  //   moveCar(carsOnScreen[i]);
  //   setTimeout(function (){
  //     carsOnScreen.splice(i,1)
  //   });
  // };

  // setTimeout(function(){
  //   randomCar2();
  //   setTimeout(function(){
  //     randomCar2();
  //     setTimeout(function(){
  //       randomCar2();
  //     }, 2000);
  //   }, 2000);
  // }, 2000);
// ----Set Game movements  ----
  
  // newCar("topR");
  // // console.log(carsOnScreen);
  // newCar("bottomR");
  // // console.log(carsOnScreen);
  // carMoveRtoL($('#cartopR'));  

  // setTimeout(function () {
  //   carMoveRtoL($('#carbottomR'));
  // },1200);

  // setTimeout(function () {
  //   newCar("bottomL");
  // }, 3000);
  
  // setTimeout(function () {
  //   carMoveLtoR($('#carbottomL'));
  // }, 4000);

  // setTimeout(function() {
  //   newCar("topL");
  // }, 5000);

  // setTimeout(function() {
  //   carMoveLtoR($("#cartopL"));
  // }, 6000);

// Bike movement control

  $(document).on("keydown", function(e) {

      // Get the position of the bike
      // Set as a fload to 2dp to do comparison with later
      // for collision detection
    var leftPosition = parseFloat($bike.css("left")).toFixed(2);
    
    switch(e.which) {
      case 90: // Left Balancing key (z key)
        balancedL +=0.8;
        break;
      
      case 88: // Right Balancing key (x key) 
        balancedR +=0.8;
      break;
      
      case 37: // Left
        if(!playerAlive) {
          // Ignore the keypress if the player is dead (deactivate keypress)
          return false;
        }
        console.log("Left pressed");
        if (leftPosition < 32) {
          // Set the maximum left gameplay distance you can go
          console.log("You can't go left anymore!");
        } else {
          console.log("Going left")
          $bike.css("left", "-=25px");
        }
        balancedL -=1;
        break;
      case 38 : // Up
        if(!playerAlive) {
          return false;
        }
        //console.log(playerAlive);
        $bike.css("top", "-=50px");
        balancedL -=1;
        break;
      
      case 39: // Right
        // console.log(playerAlive); 
        if(!playerAlive) {
          return false;
        }
        console.log("Right key pressed");
        // Set the maximum right gameplay distance you can go
        if (leftPosition > 385) {
          console.log("You can't go right anymore!");
        } else {
          console.log("Going right")
          $bike.css("left", "+=1px");
          // collisionYes();
        }
        balancedR -=1; 
        break;
      case 40: // Down
        if(!playerAlive) {
          return false;
        }
        $bike.css("top", "+=50px");
        balancedR -=1; 
        break;
      default:
    }
    // Check if the player has balance points above 0
    checkIsBalanced();
    // Check if the player has won
    checkForWin();

    // Log the players balance points to the screen
    // console.log(parseFloat(balancedL).toFixed(1));
    $('#balancedL').text("Left Balance: " + parseFloat(balancedL).toFixed(1));
    // console.log(balancedR);
    $('#balancedR').text("Right Balance: " + parseFloat(balancedR).toFixed(1));
    // console.log(carsOnScreen+" COS");
    // console.log(playerAlive);
    // console.log(checkForWin);
    if (playerAlive && !(checkForWin())) {
   

    // Call the test to see if a collision has happened
    // Collision test for each element(-bike) on sceen. 
      for (i=0; i<carsOnScreen.length; i++) {
       // console.log(carsOnScreen[i] + " yo!");
      // Test if any of the cars on screen have hit the player 
        collisionTest($bike,$(carsOnScreen[i]));
      // If the player has been hit the following will create action
        playerHit($(carsOnScreen[i]));
      }
    

    // // console.log(carsOnScreen.length);
    // collisionTest2($bike, $('#carbottomR'));
    
    // playerHit($('#carbottomR'));
   
    // collisionTest($bike, $('#cartopR'));
    // playerHit($('#cartopR'));

  }
  });

// // Close of the self-init function
});
// // End

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
