
 let secondsToSwitch;

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("mySlider");
  const sliderValue = document.getElementById("sliderValue");

  if (slider && sliderValue) {
     let sValue = Number(localStorage.getItem("secondsToSwitch")) || 3;
     slider.value = sValue;
     sliderValue.textContent = sValue;
      slider.addEventListener("input", function () {
          secondsToSwitch = this.value;
          localStorage.setItem("secondsToSwitch" , secondsToSwitch);
          sliderValue.textContent = secondsToSwitch;
      });
  }
});

let gametype = localStorage.getItem("mode") || "normal";
const checkBox = document.getElementById("gameModeToggle");
const checkBoxText = document.getElementById("gameModeLabel");

if(gametype == "crazy"){
  checkBox.checked = true;
  checkBoxText.textContent =  "Crazy";
}

checkBox.addEventListener("change", function () {
    
    gametype = this.checked ? "crazy" : "normal";
    checkBoxText.textContent = gametype === "normal" ? "Normal Mode" : "Crazy Mode";
    localStorage.setItem("mode" , gametype)
    
    // Optional: log the current game mode
    console.log("Game type is now:", gametype);
});