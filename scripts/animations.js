export function blurIn() {
  document.body.classList.remove("blur-out");
  document.body.classList.add("blur-in");
}

export function blurOut() {
  document.body.classList.remove("blur-in");
  document.body.classList.add("blur-out");
}
