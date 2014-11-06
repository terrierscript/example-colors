var parse = require('parse-color');

var a =[ "#AA3939",
 "#D46A6A",
 "#FFAAAA",
 ]

var b =[ "#FFB213", 
"#FFC141",
"#FFCF6C"]

var c=[ "#243F1C", "#35482E", "#5D7C53"]
var d=["#362222","#947474", "#5b4747"]
var e = ["#000", "#181818", "#5D5c5c"]
var f = ["#38c029", "#57d04A", "#7edf73"]
var cs = [a,b,c, d,e, f]
cs.forEach(function(arr){
  arr.forEach(function(color){
    console.log(parse(color).hsv)
    
  })
})