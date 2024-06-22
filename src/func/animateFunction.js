// 스크롤 애니메이션
export default function animateFunction(element, type, to, duration, callBack) {
  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  var start = element[type];
  var change = to - start;
  var increment = 20;
  var currentTime = 0;

  function execute() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element[type] = val;
    if (currentTime < duration) {
      setTimeout(execute, increment);
    } else {
      try {
        callBack();
      } catch (e) {
        console.log(e);
      }
    }
  }

  execute();
}
