b = ->
  b = (a, b) ->
    @x = Math.max(-1, Math.min(1, a))
    @y = Math.max(-1, Math.min(1, b))

    return
  return

b::toDef = ->
  b = undefined
  c = undefined
  d = undefined
  e = undefined
  f = undefined
  d = @rot_z(Math.PI / 4)
  (if d.x < 1 then (b = d.y / Math.sqrt(1 - d.x * d.x)
  b = Math.max(-1, Math.min(1, b))
  e = Math.asin(b)
  ) else e = 0)
  (if d.y < 1 then (c = d.x
  c = Math.max(-1, Math.min(1, c))
  f = Math.asin(c)
  ) else f = 0)
  new a(f, e)


# 回転？
b::rot_z = (a) ->
  new b(@x * Math.cos(a) + @y * Math.sin(a), -@x * Math.sin(a) + @y * Math.cos(a))

a = ->
  a = (a, b) ->
    @psi = a
    @phi = b

    return
  a::toLoc = ->
    a = undefined
    c = undefined
    d = undefined
    e = undefined
    f = undefined
    d = Math.min(Math.max(@psi, -Math.PI / 2), Math.PI / 2)
    c = Math.min(Math.max(@phi, -Math.PI / 2), Math.PI / 2)
    e = Math.sin(d)
    f = Math.sin(c) * Math.cos(d)
    a = new b(e, f)
    a.rot_z(-Math.PI / 4)

  a::rot_x = (b) ->
    c = undefined
    d = undefined
    c = Math.cos(@psi)
    d = (if c then (@phi / c + b) * c else @phi)
    new a(@psi, d)

  a::rot_y = (b) ->
    new a(@psi + b, @phi)

  a
()
c =
  createLoc: (a, c) ->
    new b(a, c)

  createDef: (b, c) ->
    new a(b, c)

  getLoc: (a, b) ->
    b.rot_x(a.toDef().phi).rot_y(a.toDef().psi).toLoc()

  getDef: (a, b) ->
    b.toDef().rot_y(-a.toDef().psi).rot_x -a.toDef().phi

c = undefined
bb = new b(1, 1)
aa = new a(1, 1)
console.log bb.toDef()
console.log c.getLoc(bb, aa)