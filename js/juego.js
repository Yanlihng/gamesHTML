var canvas;
var ctx;
var FPS = 50;

var cesped = '#85ed88';
var agua = '#4842f5';
var tierra = '#594d01';

function inicializar(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  setInterval(function(){
    principal();
  },1000/FPS);
}
function principal() {
  borrarCanvas();
  dibujaEscenario();

}
function borrarCanvas(){
  canvas.width = 500;
  canvas.height = 400;
}
var anchoF =50;
var altoF = 50;

var escenario= [
  [0,1,0,0,2],
  [0,1,1,0,0],
  [0,0,1,1,1],
  [0,2,2,2,1],
  [2,2,2,2,1]

];

function dibujaEscenario()
{
  var color;
    for (y = 0; y < 5; y++) {
      for ( x = 0; x < 5; x++) {
        if (escenario[y][x]==0) {
          color = cesped;
        }
        if (escenario[y][x]==1) {
          color = agua;
        }
        if (escenario[y][x]==2) {
          color = tierra;
        }
        ctx.fillStyle = color;
        ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);

    }

  }
}





/*var lista =[
            [0,1,2,3],
            [4,5,6,7],
            [8,9,0,1],
            [2,3,4,5]
          ];
console.log(lista[2][2]);*/
