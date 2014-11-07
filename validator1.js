var d = require("./foll2.js")
var c = require("./geo.js")
var f = {
  round : function(a, b){
    return c = Math.pow(10, b), Math.round(a * c) / c
  }
}
 //define("color.variator1.class", ["color.wheel", "color.presets", "geometry.point.class", "lib.point.follower", "app.events", "util"], function(a, b, c, d, e, f) {
var validator = function(){
    var g, h;
    h = [[.66667, .66667], [.33333, 1], [.5, .83333], [.83333, .5], [1, .33333]]
    g = function() {
      function a(a) {
        var d, e;
        var b = "default"
        this.palette = a,
        e = this,
        this.options = {treshold: .5,
            minDistance: .05,
            }
        
        this.defs = [], this.point = [], this.values = [],
        this.setVals(h)

          this.inited = !0
        
        this.radius = 100
      }
      a.prototype.getVal = function(a) {
        return this.values[a]
      }, 
      /*a.prototype.getVals = function(a) {
        return f.objCopy(this.values)
        
      },
      */
       a.prototype.setVals = function(a) {
        return this.values = a, this.calcPoints()
      }, /* a.prototype.setPreset = function() {
      }, */
      a.prototype.setValsTransformed = function(a) {
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
      }, /*a.prototype.getSerialized = function() {
        var a, b, c, d, e, g;
        b = "", g = this.values;
        for (a = d = 0, e = g.length; d < e; a = ++d)
          c = g[a], b += f.myB64.encodeFloat(c[0] / 2, 2), b += f.myB64.encodeFloat(c[1] / 2, 2);
        return b
      }, 
      */
      /*a.prototype.setSerialized = function(a) {
        var b, c, d, e;
        d = [];
        for (b = e = 0; e <= 4; b = ++e)
          d[b] = [], c = a.substring(b * 4, b * 4 + 2), d[b][0] = f.myB64.decodeFloat(c, 2, 6) * 2, c = a.substring(b * 4 + 2, b * 4 + 4), d[b][1] = f.myB64.decodeFloat(c, 2, 6) * 2;
        return this.setVals(d)
      },*/
       a.prototype.setMainVal = function(a) {
        var b;
        b = this.valToPoint(a)
        return this.moveMain(b.x, b.y)
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
        f = this.setValueTransform(a[0], a[1])
        d = f[0], 
        e = f[1], 
        b = new c(null), 
        
        b.setSqrXY(d, e, this.radius)
        return b
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
        for (a = e = 0; e <= 4; a = ++e){
          this.point[a] = this.valToPoint(this.values[a])
          
          if(a === 0) {
            f.push(c = this.pointToLoc(this.point[0])) 
          }else{        
            b = this.pointToLoc(this.point[a]), 
            //console.log(c, b, d.getDef(c, b))
        
            f.push( this.setDef( a, d.getDef(c, b) ) )
          }
          
        }
    
        return f
      }, a.prototype.pointToLoc = function(a) {
        return d.createLoc(a.x, a.y)
      }, a.prototype.locToPoint = function(a, b) {
        return a.setXY(b.x, b.y)
      }, a.prototype.moveMain = function(a, b, c) {
        var e, f, g, h;
        this.point[0].setXY(a, b), 
        this.point[0].doLimit(), 
        g = this.pointToLoc(this.point[0]);
        for (e = h = 1; h <= 4; e = ++h){
          if(c) {
            f = this.pointToLoc(this.point[e]), 
            this.setDef(e, d.getDef(g, f))
          }else{
            f = d.getLoc(g, this.getDef(e))
            
            this.locToPoint(this.point[e], f)
          }
        }
        return this.calcVals()
      }
      return a
    }() 
    
    return g
}
  //})
module.exports = validator/*function(h){
  var g = ()
  var gg = new g()
  gg.setMainVal([0.52,1])
  
}*/