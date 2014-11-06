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
      