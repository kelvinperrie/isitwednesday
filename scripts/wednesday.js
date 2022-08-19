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

// we don't have a dark and light mode, just a new and classic frog modes
function HandleToggleTypeClick() {
  let type = "new";
    if($("#togBtn").is(":checked")) {
        $(".parent").removeClass("classic-frog").addClass("new-frog");
    } else {
        $(".parent").removeClass("new-frog").addClass("classic-frog");
        type = "classic";
    }
    console.log("setting cookie value to " + type)
    setCookie("frogType", type);
}


$(document).ready(function() {
  $(".frog-image").on("click", HandleFrogClick);

  $("#togBtn").on("click", HandleToggleTypeClick);

  var lastFrogType = getCookie("frogType");
  console.log("got cookie value of " + lastFrogType)
  if(lastFrogType && lastFrogType == "classic") {
    console.log("doing click on toggle")
    $('#togBtn').trigger('click');
  }

  // initially, just run the animation
  setTimeout(DoAnimation, 2000);
});

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}