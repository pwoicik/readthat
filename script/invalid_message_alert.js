function showInvalidMessageAlert() {
    invalidMessageAlert_el.classList.add("visible");
    setTimeout(() => {
        if (invalidMessageAlert_el.classList.contains("visible"))
            invalidMessageAlert_el.classList.remove("visible");
    }, 2000);
}
