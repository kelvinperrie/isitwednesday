let topText = "maybe it is Wednesday";
let bottomText = "my dudes";

let status = 'readyToRun';

// is it wednesday? how could we ever know
function DecideIfWednesday() {
  const d = new Date();
  let day = d.getDay();
  let itIsWednesday = day === 3;

  topText = itIsWednesday ? "it is Wednesday" : "it is not Wednesday";
}

// method to output text one character at time
function OutputText(textToOutput, element, completeCallback) {
  
  if(textToOutput == "") {
    if(completeCallback != null) {
      completeCallback();
    }
    return;
  }
  let nextChar = textToOutput.substring(0,1);
  textToOutput = textToOutput.substring(1);

  $(element).html( $(element).html()+ nextChar );

  setTimeout(function() { OutputText(textToOutput, element, completeCallback) }, 50 );
}

// entry point for starting the animations
function DoAnimation() {
  DecideIfWednesday();
  if(status == 'readyToRun') {
    status = 'running';
    DoTopBubble();
  }
}

function DoTopBubble() {
  let fadeIn = 500;
  $(".speech-bubble-top").fadeIn(fadeIn);
  setTimeout( function() {
    OutputText(topText, ".speech-bubble-top", function() { setTimeout(DoBottomBubble, 500); });
  }, fadeIn);
}
function DoBottomBubble() {
  let fadeIn = 500;
  $(".speech-bubble-bottom").fadeIn(fadeIn);
  setTimeout( function() {
    OutputText(bottomText, ".speech-bubble-bottom", function() { status = 'complete' });
  }, fadeIn);
}

// reset everything in preperation to do the animations again
function Reset() {
  if(status == 'complete') {
    $(".speech-bubble-top").hide();
    $(".speech-bubble-top").html("");
    $(".speech-bubble-bottom").hide();
    $(".speech-bubble-bottom").html("");
    status = 'readyToRun';
  }
}

// someone poked the frog
function HandleFrogClick() {
  if(status == 'readyToRun') {
    DoAnimation();
  }
  if(status == 'complete') {
    Reset();
  }
}


$(document).ready(function() {
  $(".frog-image").on("click", HandleFrogClick);

  // initially, just run the animation
  setTimeout(DoAnimation, 2000);
});