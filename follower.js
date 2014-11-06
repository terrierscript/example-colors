console.log("aaa")
  var a, b, c;
  b = function() {
    function b(a, b) {
      this.x = Math.max(-1, Math.min(1, a)), this.y = Math.max(-1, Math.min(1, b))
    }
    return b.prototype.toDef = function() {
      var b, c, d, e, f;
      return d = this.rot_z(Math.PI / 4), d.x < 1 ? (b = d.y / Math.sqrt(1 - d.x * d.x), b = Math.max(-1, Math.min(1, b)), e = Math.asin(b)) : e = 0, d.y < 1 ? (c = d.x, c = Math.max(-1, Math.min(1, c)), f = Math.asin(c)) : f = 0, new a(f, e)
    }, b.prototype.rot_z = function(a) {
      return new b(this.x * Math.cos(a) + this.y * Math.sin(a), -this.x * Math.sin(a) + this.y * Math.cos(a))
    }, b
  }(),
  a = function() {
    function a(a, b) {
      this.psi = a, this.phi = b
    }
    return a.prototype.toLoc = function() {
      var a, c, d, e, f;
      return d = Math.min(Math.max(this.psi, -Math.PI / 2), Math.PI / 2), c = Math.min(Math.max(this.phi, -Math.PI / 2), Math.PI / 2), e = Math.sin(d), f = Math.sin(c) * Math.cos(d), a = new b(e, f), a.rot_z(-Math.PI / 4)
    }, a.prototype.rot_x = function(b) {
      var c, d;
      return c = Math.cos(this.psi), d = c ? (this.phi / c + b) * c : this.phi, new a(this.psi, d)
    }, a.prototype.rot_y = function(b) {
      return new a(this.psi + b, this.phi)
    }, a
  }(), 
  c = {createLoc: function(a, c) {
      return new b(a, c)
    },createDef: function(b, c) {
      return new a(b, c)
    },getLoc: function(a, b) {
      return b.rot_x(a.toDef().phi).rot_y(a.toDef().psi).toLoc()
    },getDef: function(a, b) {
      return b.toDef().rot_y(-a.toDef().psi).rot_x(-a.toDef().phi)
    }}, c
    
var bb = new b(1, 1)
var aa  =new a(1, 1)
console.log(bb.toDef())
console.log(c.getLoc(bb, aa))


/////
f = d.getLoc(g, this.getDef(e))
this.locToPoint(this.point[e], f)
