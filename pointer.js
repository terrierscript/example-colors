//define("color.variator1.class", ["color.wheel", "color.presets", "geometry.point.class", "lib.point.follower", "app.events", "util"], function(a, b, c, d, e, f) {
function validator(){
    var g, h;
    return h = [[.66667, .66667], [.33333, 1], [.5, .83333], [.83333, .5], [1, .33333]], g = function() {
      function a(a, b, c) {
        var d, e;
        this.palette = a, d = {treshold: .5,minDistance: .05,onChange: null}, e = this,     
        this.options = {}// f.objMerge(d, c),
         this.defs = [], this.point = [], this.values = [], this.setPreset(b), this.inited = !0
      }
      return a.prototype.getVal = function(a) {
        return this.values[a]
      }, a.prototype.getVals = function(a) {
        return f.objCopy(this.values)
      }, a.prototype.setVals = function(a) {
        return this.values = a, this.calcPoints()
      }, a.prototype.setValsTransformed = function(a) {
        var b, c, d, e, f;
        d = [];
        for (b = e = 0, f = a.length; e < f; b = ++e)
          c = a[b], d.push(this.getValueTransform(c[0], c[1]));
        return this.setVals(d)
      }, a.prototype.getDef = function(a) {
        return this.defs[a]
      }, a.prototype.setDef = function(a, b) {
        return this.defs[a] = b
      }, a.prototype.getPoint = function(a) {
        return this.point[a]
      }, a.prototype.getSerialized = function() {
        var a, b, c, d, e, g;
        b = "", g = this.values;
        for (a = d = 0, e = g.length; d < e; a = ++d)
          c = g[a], b += f.myB64.encodeFloat(c[0] / 2, 2), b += f.myB64.encodeFloat(c[1] / 2, 2);
        return b
      }, a.prototype.setSerialized = function(a) {
        var b, c, d, e;
        d = [];
        for (b = e = 0; e <= 4; b = ++e)
          d[b] = [], c = a.substring(b * 4, b * 4 + 2), d[b][0] = f.myB64.decodeFloat(c, 2, 6) * 2, c = a.substring(b * 4 + 2, b * 4 + 4), d[b][1] = f.myB64.decodeFloat(c, 2, 6) * 2;
        return this.setVals(d)
      }, a.prototype.setMainVal = function(a) {
        var b;
        return b = this.valToPoint(a), this.moveMain(b.x, b.y)
      }, a.prototype.setValueTransform = function(a, b) {
        var c, d, e, f;
        return d = this.options.treshold, c = function(a) {
          return a < 1 ? a * (d + 1) - 1 : (a - 1) * (1 - d) + d
        }, e = c(a), f = c(b), [e, -f]
      }, a.prototype.getValueTransform = function(a, b) {
        var c, d, e, g;
        return d = this.options.treshold, c = function(a) {
          return a < d ? (a + 1) / (d + 1) : (a - d) / (1 - d) + 1
        }, e = f.round(c(a), 5), g = f.round(c(-b), 5), [e, g]
      }, a.prototype.valToPoint = function(a) {
        var b, d, e, f;
        return f = this.setValueTransform(a[0], a[1]), d = f[0], e = f[1], b = new c(null), b.setSqrXY(d, e, this.radius), b
      }, a.prototype.pointToVal = function(a) {
        var b, c, d;
        return d = a.getLimited().getSqrXY(this.radius), b = d[0], c = d[1], this.getValueTransform(b, c)
      }, a.prototype.calcVals = function() {
        var a, b, c;
        c = [];
        for (a = b = 0; b <= 4; a = ++b)
          c.push(this.values[a] = this.pointToVal(this.point[a]));
        return c
      }, a.prototype.calcPoints = function() {
        var a, b, c, e, f;
        f = [];
        for (a = e = 0; e <= 4; a = ++e)
          this.point[a] = this.valToPoint(this.values[a]), a === 0 ? f.push(c = this.pointToLoc(this.point[0])) : (b = this.pointToLoc(this.point[a]), f.push(this.setDef(a, d.getDef(c, b))));
        return f
      }, a.prototype.pointToLoc = function(a) {
        return d.createLoc(a.x, a.y)
      }, a.prototype.locToPoint = function(a, b) {
        return a.setXY(b.x, b.y)
      }, a.prototype.moveMain = function(a, b, c) {
        var e, f, g, h;
        this.point[0].setXY(a, b), this.point[0].doLimit(), g = this.pointToLoc(this.point[0]);
        for (e = h = 1; h <= 4; e = ++h)
          c ? (f = this.pointToLoc(this.point[e]), this.setDef(e, d.getDef(g, f))) : (f = d.getLoc(g, this.getDef(e)), this.locToPoint(this.point[e], f));
        return this.calcVals(), this.onChange()
      }, a.prototype.moveSec = function(a, b, c, e) {
        var f, g, h, i, j, k, l, m;
        if (e)
          return this.point[a].setXY(b, c), this.point[a].doLimit(), k = this.pointToLoc(this.point[0]), j = this.pointToLoc(this.point[a]), this.setDef(a, d.getDef(k, j)), this.calcVals(), this.onChange();
        l = this.point[a].getCopy(), m = this.point[a].getCopy(), m.setXY(b, c), m.doLimit(), g = this.point[0].getDistance(l), h = this.point[0].getDistance(m), g < this.options.minDistance && (g = this.options.minDistance), h < this.options.minDistance && (h = this.options.minDistance), f = this.point[0].getAngle(m, l), i = g > 0 ? h / g : 1;
        if (h < 1)
          return this.rotate(f, i)
      }, a.prototype.rotate2 = function(a, b) {
        var c, e, f, g, h, i;
        h = this.point[0], f = this.pointToLoc(h), console.log("rotate:");
        for (c = i = 1; i <= 4; c = ++i)
          g = this.point[c], g.setXY(g.x - h.x, g.y - h.y), g.setPolar(g.r * b, g.theta + a), g.setXY(g.x + h.x, g.y + h.y), e = this.pointToLoc(g), console.log(c, b, g.r, g.theta), this.setDef(c, d.getDef(f, e));
        return this.calcVals(), this.onChange()
      }, a.prototype.rotate = function(a, b) {
        var c, e, f, g, h, i, j;
        i = this.point[0].getCopy(), this.point[0].setXY(0, 0), f = this.pointToLoc(this.point[0]);
        for (c = j = 1; j <= 4; c = ++j)
          g = this.point[c], h = g.getCopy(), e = d.getLoc(f, this.getDef(c)), this.locToPoint(g, e), g.setPolar(g.r * b, g.theta + a), e = this.pointToLoc(g), this.setDef(c, d.getDef(f, e));
        return this.moveMain(i.x, i.y, !1)
      }, a.prototype.setPreset = function(a) {
        return b.presetList[a] != null ? this.setVals(f.objCopy(b.presetList[a].val)) : this.setVals(f.objCopy(h)), this.onChange()
      }, a.prototype.addSaturation = function(a) {
        return this.moveMain(this.point[0].x + a, this.point[0].y)
      }, a.prototype.addBright = function(a) {
        return this.moveMain(this.point[0].x, this.point[0].y - a)
      }, a.prototype.addContrast = function(a) {
        return a /= 100, this.rotate(0, a)
      }, a.prototype.onChange = function() {
        if (this.inited)
          return this.palette.varsChanged()
      }, a
    }(), g
}
var v = validator()

var g = new v({},"default")
console.log(g)