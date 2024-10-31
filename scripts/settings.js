const slider = document.getElementById("mySlider");
const sliderValue = document.getElementById("sliderValue");

export let secondsToSwitch;
export let gametype;

slider.addEventListener("input", function () {
  secondsToSwitch = this.value;
  sliderValue.textContent = secondsToSwitch; // Update the displayed value
});
