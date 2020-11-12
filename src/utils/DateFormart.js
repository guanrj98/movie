export function datetimeToDate(time) {
  var dat = new Date(time);
  var day = dat.toLocaleDateString().replace(/\//g, "-");
  var times = dat.toTimeString().substr(0, 8);
  return (day + " " + times);
}