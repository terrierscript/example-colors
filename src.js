(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function b(a, b) {
  this.x = Math.max(-1, Math.min(1, a)), this.y = Math.max(-1, Math.min(1, b))
}
b.prototype.toDef = function() {
  // maybe y -> psi , x -> phi
    var b, c, d, e, f;
    d = this.rot_z(Math.PI / 4)　// なんで回転してんだろうなー
    if(d.x < 1) {
      b = d.y / Math.sqrt(1 - d.x * d.x)
      b = Math.max(-1, Math.min(1, b))
      e = Math.asin(b)
    }else{
      e = 0
    }
    if(d.y < 1) {
      c = d.x,
      c = Math.max(-1, Math.min(1, c))
      f = Math.asin(c)
    }else{
      f = 0
    }
    return new a(f, e)
  }
// 回転？
b.prototype.rot_z = function(a) {
  return new b(this.x * Math.cos(a) + this.y * Math.sin(a),
              -this.x * Math.sin(a) + this.y * Math.cos(a))
}

function a(a, b) {
  this.psi = a, this.phi = b
}

a.prototype.toLoc = function() {
  var a, c, d, e, f;
  d = Math.min(Math.max(this.psi, -Math.PI / 2), Math.PI / 2),
  c = Math.min(Math.max(this.phi, -Math.PI / 2), Math.PI / 2), 
  e = Math.sin(d),
  f = Math.sin(c) * Math.cos(d),
  a = new b(e, f)
  return a.rot_z(-Math.PI / 4)
  
}
a.prototype.rot_x = function(b) {
  var c, d;
  c = Math.cos(this.psi),
  d = c ? (this.phi / c + b) * c 
        : this.phi
  return new a(this.psi, d)
}
a.prototype.rot_y = function(b) {
  return new a(this.psi + b, this.phi)
}

c = {createLoc: function(a, c) {
    return new b(a, c)
  },createDef: function(b, c) {
    return new a(b, c)
  },getLoc: function(a, b) {
    return b.rot_x(a.toDef().phi).rot_y(a.toDef().psi).toLoc()
  },getDef: function(a, b) {
    var c = b.toDef().rot_y(-a.toDef().psi)
    var d = c.rot_x(-a.toDef().phi)
    
    return b.toDef().rot_y(-a.toDef().psi).rot_x(-a.toDef().phi)
  }
}
  
module.exports = c
      
},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
module.exports = function(h){
  var g = validator()
  var gg = new g()
  gg.setMainVal([0.52,1])
  
}
},{"./foll2.js":1,"./geo.js":2}]},{},[3]);
