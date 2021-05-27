export default class InvalidMessageAlert {
  alert_el = null;

  show() {
    this.alert_el.classList.add("visible");
    setTimeout(() => {
      if (this.alert_el.classList.contains("visible"))
        this.alert_el.classList.remove("visible");
    }, 3000);
  }

  constructor() {
    this.alert_el = document.getElementById("invalid-message-alert");
  }
}
