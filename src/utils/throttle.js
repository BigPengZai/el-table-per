export default function throttle(func, wait = 300) {
  let context, args, timeout;
  let old = 0; // 时间戳
  let later = function () {
    old = new Date().valueOf();
    timeout = null;
    func.apply(context, args);
  };
  return function () {
    context = this;
    args = arguments;
    let now = new Date().valueOf();
    if (now - old > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func.apply(context, args);
      old = now;
    }

    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  };
}
