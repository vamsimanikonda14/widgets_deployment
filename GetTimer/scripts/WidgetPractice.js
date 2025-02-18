define("DS/GetTimer/scripts/WidgetPractice", [""], function () {
  "use strict";
  var rk_Widget = {
    onLoad: function () {
      widget.body.innerHTML =
        '<div class="container"> \
            <h1>Countdown Timer</h1> \
            <p id="timerDisplay">00:00:00</p> \
            <button id="startTimer">Start Timer</button> \
            <button id="stopTimer">Stop Timer</button> \
        </div>';

      // Default countdown duration: 1 minute (60 seconds)
      var duration = 60; // 60 seconds
      var timer;
      var remainingTime = duration;

      function formatTime(seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var secondsLeft = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
      }

      // Function to start the timer
      document.getElementById("startTimer").addEventListener("click", function () {
        // Clear any existing timer
        clearInterval(timer);

        // Start a new countdown
        timer = setInterval(function () {
          remainingTime--;
          document.getElementById("timerDisplay").innerText = formatTime(remainingTime);
          
          // If the timer reaches 0, stop it
          if (remainingTime <= 0) {
            clearInterval(timer);
            alert("Time's up!");
          }
        }, 1000);
      });

      // Function to stop the timer
      document.getElementById("stopTimer").addEventListener("click", function () {
        clearInterval(timer);
        document.getElementById("timerDisplay").innerText = formatTime(duration);
        remainingTime = duration; // Reset to initial value
      });
    }
  };
  widget.addEvent("onLoad", rk_Widget.onLoad);
});
