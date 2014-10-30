var parse = require('parse-color');

var a =[ "#AA3939",
 "#FFAAAA",
 "#D46A6A",]

var b =[ "#FFB213", "#FFCF6C", "#FFC141"]

var c=[ "#243F1C", "#5D7C53","#35482E"]
var d=["#362222","#5b4747","#947474"]
var e = ["#000", "#181818", "#5D5c5c"]
var cs = [a,b,c, d,e]
cs.forEach(function(arr){
  arr.forEach(function(color){
    console.log(parse(color).hsv)
    
  })
})