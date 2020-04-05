var canvas;
var ctx;
var FPS = 50;

var anchoCanvas = 400;
var altoCanvas = 640;

var anchoTablero = 10;
var altoTablero = 16;

var anchoF = 40;
var altoF = 40;

var pieza;
var objPieza = function(){
  this.x = 0;
  this.y = 0;
  console.log("pieza");
}

//(12*17)->(10*16)
var tablero =[
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1]
];

function inicializaTeclado(){
  document.addEventListener('keydown',(tecla)=>{
    if(tecla.keyCode == 38){
      console.log('arriba');
    }
    if(tecla.keyCode == 40){
      console.log('abajo');
    }
    if(tecla.keyCode == 37){
      console.log('izquierda');
    }
    if(tecla.keyCode == 39){
      console.log('derecha');
    }


  });
}

function inicializar(){

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = anchoCanvas;
  canvas.height = altoCanvas;

  inicializaTeclado();

  pieza = new objPieza();

  setInterval(()=>{
      principal();
    },1000/FPS);
}

function borrarCanvas(){
  canvas.width = anchoCanvas;
  canvas.height = altoCanvas;

}

function principal(){
  borrarCanvas();
}
