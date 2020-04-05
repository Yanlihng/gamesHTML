var canvas;
var ctx;
var FPS = 50;
var anchoF = 50;
var altoF = 50;

var cesped = '#00b503';
var puerta = '#f09000';
var camino = '#594d01';
var llave = '#f5f51d';
var protagonista;
var tileMap;
var enemigo=[];
var imagenAntorcha;

//objeto antorcha
var antorcha = function(x,y){
  this.x=x;
  this.y=y;
  this.retraso = 10;
  this.contador = 0;
  this.fotograma = 0;//0-3

  this.cambiaFotograma = ()=>{
    if (this.fotograma < 3) {
      this.fotograma++
    }
    else {
      this.fotograma = 0;
    }
  }

  this.dibuja = ()=>{
    if (this.contador < this.fotograma) {
      this.contador++;
    }
    else {
      this.contador = 0;
      this.cambiaFotograma();
    }
    ctx.drawImage(tileMap,this.fotograma*32,64,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }
}

//Clase u objeto enemigo
var malo = function(x,y){
  this.x = x;
  this.y = y;
  this.direccion = Math.floor(Math.random()*4);
  this.retraso= 50;
  this.fotograma = 0;
  this.dibuja = ()=>{

    ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);

  }

  this.compruebaColision = (x,y)=>{
    var colision = false;
    if(escenario[y][x]==0){
      colision = true;
      }
      return colision;
  }
//arriba
  this.mueve = ()=>{

    protagonista.colisionEnemigo(this.x,this.y);

    if (this.contador < this.retraso) {
      this.contador++;
    }
    else{
      this.contador = 0;
        if (this.direccion == 0){
          if (this.compruebaColision(this.x,this.y-1)==false) {
            this.y--;
          }
          else {
            this.direccion = Math.floor(Math.random()*4);
          }
        }
    //abajo
        if (this.direccion == 1){
          if (this.compruebaColision(this.x,this.y+1)==false) {
            this.y++;
          }
          else {
            this.direccion = Math.floor(Math.random()*4);
          }
        }
    //derecha
      if (this.direccion == 2){
        if (this.compruebaColision(this.x+1,this.y)==false) {
          this.x++;
        }
        else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }
    //izquierda
      if (this.direccion == 3){
        if (this.compruebaColision(this.x-1,this.y)==false) {
          this.x--;
        }
        else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }
    }
  }

}

//Objeto jugador
var jugador = function(){
  this.x = 8;
  this.y = 8;
  this.color ='#ff000d';

  this.dibuja = ()=>{

    ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);

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
    console.log("Has ganado!!!");
    this.x = 8;
    this.y = 8;
    this.llave = false;
    escenario[8][4]=3
  }

  this.muerte= ()=>{
    console.log('Has perdido ♫');
    this.x = 8;
    this.y = 8;
    this.llave = false;
    escenario[8][4]=3
  }

  this.colisionEnemigo = (x,y)=>{
    if (this.x == x && this.y == y) {
      this.muerte();
    }
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
  tileMap = new Image();
  tileMap.src = "img/tilemap.png";
  //creamos nuevo enemigo
  enemigo.push(new malo(2,1));
  enemigo.push(new malo(8,2));
  enemigo.push(new malo(10,4));
  //Creamos la antorcha
  imagenAntorcha1 = new antorcha(0,0);
  imagenAntorcha2 = new antorcha(14,0);
  imagenAntorcha3 = new antorcha(0,9);
  imagenAntorcha4 = new antorcha(14,9);

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
  for (var i = 0; i < enemigo.length; i++) {
    enemigo[i].dibuja();
    enemigo[i].mueve();
  }
  imagenAntorcha1.dibuja();
  imagenAntorcha2.dibuja();
  imagenAntorcha3.dibuja();
  imagenAntorcha4.dibuja();

}

function borrarCanvas(){
  canvas.width = 750;
  canvas.height = 500;
}

var escenario= [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,2,0,2,0,0,0,2,0,0,0,2,0,0],
  [0,2,2,2,2,0,0,0,2,0,0,2,2,0,0],
  [0,2,0,0,2,2,2,0,2,0,0,2,2,0,0],
  [0,2,0,2,2,0,2,2,2,2,2,0,2,2,0],
  [0,0,2,2,0,0,2,0,0,0,2,0,2,0,0],
  [0,0,2,0,0,2,2,2,2,0,2,2,2,2,0],
  [0,2,2,2,0,0,0,0,2,0,2,0,2,0,0],
  [0,2,2,3,0,0,0,2,2,2,0,2,2,1,0],
  [0,0,0,0,0,0,0,0,2,0,0,0,0,0,0]

];

function dibujaEscenario()
{
    for (y = 0; y < 10; y++) {
      for ( x = 0; x < 15; x++) {
        var tile = escenario[y][x];
        ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);
    }

  }
}
