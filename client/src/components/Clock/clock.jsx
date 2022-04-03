function currentTime() {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  var y = date.getFullYear();
  var d = new Date();
  var weekday = new Array(7);
  weekday[1] = "Chủ nhật";
  weekday[2] = "Thứ hai";
  weekday[3] = "Thứ ba";
  weekday[4] = "Thứ tư";
  weekday[5] = "Thứ năm";
  weekday[6] = "Thứ sáu";
  weekday[7] = "Thứ bảy";
  var n = weekday[d.getDay()];
  document.getElementById("clock").innerText =
    hour + ":" + min + ":" + sec + "," + n + "," + "y";
  var t = setTimeout(function () {
    currentTime();
  }, 1000); /* Setting timer */
}
function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}
currentTime();
