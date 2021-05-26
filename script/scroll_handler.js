export default class ScrollHandler {
  handlerFunction = null;

  constructor(updateCondition, updateFunction) {
    this.handlerFunction = this.createHandlerFunction(
      updateCondition,
      updateFunction
    );
  }

  createHandlerFunction(updateCondition, updateFunction) {
    return async () => {
      if (!updateCondition()) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        const stop = await updateFunction();
        if (stop) {
          this.remove();
        }
      }
    };
  }

  register() {
    window.addEventListener("scroll", this.handlerFunction, { passive: true });
  }

  remove() {
    window.removeEventListener("scroll", this.handlerFunction, {
      passive: true,
    });
  }
}
