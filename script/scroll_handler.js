let resolvePromise = null;

export default class ScrollHandler {
  handlerFunction = null;
  isFinished = null;

  constructor(updateCondition, updateFunction) {
    this.handlerFunction = this.createHandlerFunction(
      updateCondition,
      updateFunction
    );

    this.isFinished = new Promise(resolve => (resolvePromise = resolve));
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

    return this.isFinished;
  }

  remove() {
    window.removeEventListener("scroll", this.handlerFunction, {
      passive: true,
    });

    resolvePromise();
  }
}
