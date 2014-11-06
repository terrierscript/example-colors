var xy2polar = function(a, b) {
    var c, d;
    return c = Math.sqrt(a * a + b * b), d = Math.atan2(b, a), d < 0 && (d += 2 * Math.PI), [c, d]
}
var polar2xy =  function(a, b) {
  var c, d;
  return c = a * Math.cos(b), d = a * Math.sin(b), [c, d]
}
function b(a) {
  this.plane = a, this.x = 0, this.y = 0, this.r = 0, this.theta = 0, this.limit = {type: "radius",value: {min: 0,max: 1}}
}
b.prototype.setLimit = function(a) {
  this.limit = a
}, b.prototype.setXY = function(b, c) {
  var d;
  return this.x = b, this.y = c, d = xy2polar(this.x, this.y), this.r = d[0], this.theta = d[1], d
}, b.prototype.setPolar = function(b, c) {
  var d;
  return this.r = b, c > 2 * Math.PI && (c -= 2 * Math.PI), c < 0 && (c += 2 * Math.PI), this.theta = c, d = polar2xy(this.r, this.theta), this.x = d[0], this.y = d[1], d
}, b.prototype.getSqrXY = function(b) {
  var c, d, e;
  return b || (b = 1), e = this.getSqrPolar(), c = e[0], d = e[1], polar2xy(c / b, d)
}, b.prototype.setSqrXY = function(b, c, d) {
  var e, f, g;
  return d || (d = 1), g = xy2polar(b, c), e = g[0], f = g[1], this.setSqrPolar(e * d, f)
}, b.prototype.getSqrPolar = function() {
  var a;
  return a = Math.max(Math.abs(Math.sin(this.theta)), Math.abs(Math.cos(this.theta))), [this.r / a, this.theta]
}, b.prototype.setSqrPolar = function(a, b) {
  var c;
  return c = Math.max(Math.abs(Math.sin(b)), Math.abs(Math.cos(b))), this.setPolar(a * c, b)
}, b.prototype.getXY = function() {
  return [this.x, this.y]
}, b.prototype.getPolar = function() {
  return [this.r, this.theta]
}, b.prototype.getCopy = function() {
  var a;
  return a = new b, a.x = this.x, a.y = this.y, a.r = this.r, a.theta = this.theta, a
}, b.prototype.getLimited = function() {
  var a;
  return this.limit ? (a = new b(this.plane), a.setXY(this.x, this.y), a.setLimit(this.limit), a.doLimit(), a) : this
}, b.prototype.getCanvasPos = function() {
  return this.plane.getCanvasPos(this.x, this.y)
}, b.prototype.getPagePos = function() {
  return this.plane.getPagePos(this.x, this.y)
}, b.prototype.setXYByCanvasPos = function(a) {
  var b;
  return b = this.plane.getXYbyCanvasPos(a), this.setXY(b.x, b.y)
}, b.prototype.setXYByPagePos = function(a) {
  var b;
  return b = this.plane.getXYbyPagePos(a), this.setXY(b.x, b.y)
}, b.prototype.doLimit = function() {
  var a, b, c;
  if (this.limit.type === "radius")
    return a = Math.min(Math.max(this.r, this.limit.value.min), this.limit.value.max), this.setPolar(a, this.theta, !0);
  if (this.limit.type === "bounds")
    return b = Math.min(Math.max(this.x, this.limit.value.xMin), this.limit.value.xMax), c = Math.min(Math.max(this.y, this.limit.value.yMin), this.limit.value.yMax), this.setXY(b, c, !0)
}, b.prototype.getDistance = function(a) {
  var b, c;
  return b = this.x - a.x, c = this.y - a.y, Math.sqrt(b * b + c * c)
}, b.prototype.getAngle = function(a, c) {
  var d, e, f;
  return e = new b(this.plane), f = new b(this.plane), e.setXY(a.x - this.x, a.y - this.y), f.setXY(c.x - this.x, c.y - this.y), d = e.theta - f.theta
}

module.exports = b
