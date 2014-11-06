var colorTable = {byPalette: {}, 
  sorted: {},
  byLum: {}
}
var c = this
var b = function(a, b) {
  var c, d;
  return c = a.getLum(), d = b.getLum(), c < d ? 1 : c > d ? -1 : 0
}
a = function(a) {
  var d, e, f, h, i, j, k, l;
  d = c.col[a];
  if (!d) return null;
  i = [], j = [], k = [];
  for (f = l = 0; l <= 4; f = ++l)
    e = new g(d.baseHSV.h), 
    h = c.getVar(f, a), 
    e.setSV(h[0], h[1]), 
    i[f] = e,
    k[f] = e, 
    f > 0 && (j[f] = e);
  return j.sort(b), j.unshift(i[0]), k.sort(b), c.colorTable.byPalette[a] = i, c.colorTable.sorted[a] = j, c.colorTable.byLum[a] = k
}, a("pri"), a("sec1"), a("sec2"), a("compl")


/////
  define("lib.point.follower", [], function() {
    var a, b, c;
    return b = function() {
      // constructor
      function b(a, b) {
        this.x = Math.max(-1, Math.min(1, a)), // -1 to 1
        this.y = Math.max(-1, Math.min(1, b)) // -1 to 1
      }
      return b.prototype.toDef = function() {
        var b, c, d, e, f;
        return 
        d = this.rot_z(Math.PI / 4), 
        d.x < 1 ? (b = d.y / Math.sqrt(1 - d.x * d.x),
         b = Math.max(-1, Math.min(1, b)), e = Math.asin(b)) : e = 0, d.y < 1 ? (c = d.x, c = Math.max(-1, Math.min(1, c)), f = Math.asin(c)) : f = 0, new a(f, e)
      }, 
      b.prototype.rot_z = function(a) {
        return new b(this.x * Math.cos(a) + this.y * Math.sin(a), -this.x * Math.sin(a) + this.y * Math.cos(a))
      }, b
    }(), a = function() {
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
    }(), c = {createLoc: function(a, c) {
        return new b(a, c)
      },createDef: function(b, c) {
        return new a(b, c)
      },getLoc: function(a, b) {
        return b.rot_x(a.toDef().phi).rot_y(a.toDef().psi).toLoc()
      },getDef: function(a, b) {
        return b.toDef().rot_y(-a.toDef().psi).rot_x(-a.toDef().phi)
      }}, c
  })
  
  
  
        return c.prototype.draw = function() {
        var a, b, c, d, e, f;
        return f = this, this.$e = $("<DIV>", {"class": "control-palette " + this.options.className}), this.$container.empty().append(this.$e), b = $("<TABLE>"), this.$e.append(b), a = $("<TBODY>"), b.append(a), c = $("<TR>"), a.append(c), d = function(a) {
          var b, d, e, g, h, i;
          d = $("<TD>", {"class": "bgcol-" + a + "-0"}), f.options.asStatic && (e = f.palette.colorTable.sorted[a][0], d.css("background", e.getCSS())), c.append(d), i = [];
          for (g = h = 1; h <= 4; g = ++h)
            b = $("<SPAN>", {"class": "var var-" + g + " bgcol-" + a + "-" + g}), d.append(b), f.options.asStatic ? (e = f.palette.colorTable.sorted[a][g], i.push(b.css("background", e.getCSS()))) : i.push(void 0);
          return i
        }, d("pri"), this.palette.hasSecs() && (d("sec1"), d("sec2")), this.palette.hasCompl() && d("compl"), e = this.palette.getColCnt(), c.find(".bgcol-pri-0").addClass("span" + (5 - e))
      }, c.prototype.colorize = function() {
        return a.trigger("palette/colorize", {$e: this.$e,sorted: !0,converted: !1})
      }, c
    }(), c