var canvas;
var ctx;
var FPS = 50;

var cesped = '#85ed88';
var agua = '#4842f5';
var tierra = '#594d01';
var llave = '#f5f51d';
var protagonista;

//Objeto jugador
var jugador = function(){
  this.x = 1;
  this.y = 1;
  this.color ='#ff000d';

  this.dibuja = ()=>{
    ctx.fillStyle=this.color;
    ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF);
  }

  this.margenes = (x,y)=>{
    var colision = false;
    if (escenario[y][x]==0) {
      colision = true;
    }
    return(colision);
  }


  this.arriba =()=>{
    if (this.margenes(this.x,this.y-1) == false) {
      this.y--;
      }
  }
  this.abajo =()=>{
    if (this.margenes(this.x,this.y+1) == false) {
      this.y++;
    }
  }
  this.derecha =()=>{
    if (this.margenes(this.x+1,this.y) == false) {
      this.x++;
    }
  }
  this.izquierda =()=>{
    if (this.margenes(this.x-1,this.y) == false) {
      this.x--;
    }
  }

}

function inicializar(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  //Creamos al jugador
  protagonista = new jugador();
  //moviento teclado
  document.addEventListener('keydown',(tecla)=>{
    switch (tecla.keyCode) {
      case 38:
      protagonista.arriba();
      break;
      case 40:
      protagonista.abajo();
      break;
      case 37:
      protagonista.izquierda();
      break;
      case 39:
      protagonista.derecha();
      break;

      default:


    /*if(tecla.keyCode == 38){
      protagonista.arriba();
    }
    //abajo
    if(tecla.keyCode == 40){
      protagonista.abajo();
    }
    //Izquierda
    if(tecla.keyCode == 37){
      protagonista.izquierda();
    }
    //derecha
    if(tecla.keyCode == 39){
      protagonista.derecha();*/
    }
  });
  setInterval(function(){
    principal();
  },1000/FPS);
}
function principal() {
  borrarCanvas();
  dibujaEscenario();
  protagonista.dibuja();

}
function borrarCanvas(){
  canvas.width = 500;
  canvas.height = 500;
}
var anchoF =50;
var altoF = 50;

var escenario= [
  [0,0,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,2,0,0,0],
  [0,0,2,0,2,2,2,2,2,0],
  [0,0,2,0,2,0,0,2,0,0],
  [0,0,2,2,2,0,2,2,0,0],
  [0,2,2,0,0,0,2,0,0,0],
  [0,0,2,0,0,0,2,0,0,0],
  [0,0,2,0,0,2,3,2,0,0],
  [0,2,2,2,0,0,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],

];

function dibujaEscenario()
{
  var color;
    for (y = 0; y < 10; y++) {
      for ( x = 0; x < 10; x++) {
        if (escenario[y][x]==0) {
          color = cesped;
        }
        if (escenario[y][x]==1) {
          color = agua;
        }
        if (escenario[y][x]==2) {
          color = tierra;
        }
        if (escenario[y][x]==3) {
          color = llave;
        }

        ctx.fillStyle = color;
        ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);

    }

  }
}
