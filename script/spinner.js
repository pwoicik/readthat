export default class Spinner {
  spinner_el = null;

  constructor() {
    this.spinner_el = this.create();
  }

  create() {
    const spinner = document.createElement("div");
    spinner.classList.add("loader");
    spinner.innerText = "Loading...";

    return spinner;
  }

  attach(parentEl) {
    parentEl.appendChild(this.spinner_el);
  }

  remove() {
    this.spinner_el.remove();
  }

  move(newParent) {
    this.remove();
    newParent.appendChild(this.spinner_el);
  }
}
