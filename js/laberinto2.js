var canvas;
var ctx;
var FPS = 50;

var cesped = '#00b503';
var puerta = '#f09000';
var camino = '#594d01';
var llave = '#f5f51d';
var protagonista;

//Objeto jugador
var jugador = function(){
  this.x = 8;
  this.y = 8;
  this.color ='#ff000d';

  this.dibuja = ()=>{
    ctx.fillStyle=this.color;
    ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF);
  }

  this.llave = false;

  this.margenes = (x,y)=>{
    var colision = false;
    if (escenario[y][x]==0) {
      colision = true;
    }
    return(colision);
  }

  this.victoria = ()=>{
    console.log("Had ganado");
    this.x = 8;
    this.y = 8;
    this.llave = false;
    escenario[8][4]=3
  }


  this.arriba =()=>{
    if (this.margenes(this.x,this.y-1) == false) {
      this.y--;
      this.logicaObjetos()
      }
    }
  this.abajo =()=>{
    if (this.margenes(this.x,this.y+1) == false) {
      this.y++;
      this.logicaObjetos()
      }
    }
  this.derecha =()=>{
    if (this.margenes(this.x+1,this.y) == false) {
      this.x++;
      this.logicaObjetos()
      }
    }
  this.izquierda =()=>{
    if (this.margenes(this.x-1,this.y) == false) {
      this.x--;
      this.logicaObjetos()
      }
    }

  this.logicaObjetos=()=>{
    var objeto = escenario[this.y][this.x];
      //Obtiene llave
    if (objeto == 3) {
      this.llave = true;
      escenario[this.y][this.x]=2;
      console.log("Has obtenido la llave!! :)");
      }
      if (objeto == 1) {
        if (this.llave == true) {
          this.victoria();
        }
        else {
          console.log("Te falta la llave");
        }

      }
    /*if (objeto == 1 && this.llave == true) {
      escenario[this.y][this.x]=2;
      console.log("Fin del juego");
    }*/

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
  canvas.width = 750;
  canvas.height = 500;
}
var anchoF =50;
var altoF = 50;

var escenario= [
  [0,0,0,0,0,0,0,0,0,0,2,0,2,0,0],
  [0,0,2,0,2,0,0,0,0,0,0,2,0,2,0],
  [0,2,2,2,2,0,0,0,2,0,2,0,2,0,0],
  [0,2,0,0,2,2,2,0,2,0,0,2,2,0,0],
  [0,2,0,2,2,0,2,2,2,2,2,0,2,0,0],
  [0,0,2,2,0,0,2,0,0,0,2,0,2,0,0],
  [0,0,2,0,0,2,2,2,2,0,2,2,2,0,0],
  [0,2,2,2,0,0,0,0,2,0,0,0,2,0,0],
  [0,2,2,3,0,0,0,2,2,2,0,2,2,1,0],
  [0,0,0,0,0,0,0,0,2,0,0,0,0,0,0]

];

function dibujaEscenario()
{
  var color;
    for (y = 0; y < 10; y++) {
      for ( x = 0; x < 15; x++) {
        if (escenario[y][x]==0) {
          color = cesped;
        }
        if (escenario[y][x]==1) {
          color = puerta;
        }
        if (escenario[y][x]==2) {
          color = camino;
        }
        if (escenario[y][x]==3) {
          color = llave;
        }

        ctx.fillStyle = color;
        ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);

    }

  }
}
