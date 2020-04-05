'use strict'
var canvas;
var ctx;
var FPS = 50;
var imgRex;

function inicializar(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');

//Carga de la imagen en canvas
  imgRex = new Image();
  imgRex.src = "rex.png";



  setInterval(function(){
    principal();
  },1000/FPS);
}

function principal() {
  borrarCanvas();
  personaje1.dibuja();
  personaje2.dibuja();
  personaje3.dibuja();
  prota.dibuja();
  prota.texto();

  personaje1.mueve(1);
  personaje2.mueve(3);
  personaje3.mueve(4);

  //console.log('funcion');
}





var protagonista =function(x,y){
  this.x = x;
  this.y = y;
  this.velocidad = 3;

  this.texto = ()=>{
    ctx.font = '30px impact';
    ctx.fillStyle = 'green';
    ctx.fillText('x: '+this.x,100,100);
    ctx.fillText('y: '+this.y,120,120);
  }

  this.dibuja=()=>{
    ctx.drawImage(imgRex,this.x,this.y);
  }

  this.arriba= ()=>{
    this.y -= this.velocidad;
  }

  this.abajo= ()=>{
    this.y += this.velocidad;
  }

  this.izquierda= ()=>{
    this.x -= this.velocidad;
  }

  this.derecha= ()=>{
    this.x += this.velocidad;
  }


}


var personaje = function(x,y) {
  this.x = x;
  this.y = y;
  this.derecha = true;

  //Metodos
  this.dibuja=()=>{
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x,this.y,50,50);
  }

  this.mueve=(velocidad)=>{
    if (this.derecha == true) {
      if (this.x < 400) {
        this.x+=velocidad;
      }else {
        this.derecha = false;
      }
    }
    else {
      if (this.x > 50) {
        this.x-=velocidad;
      }else {
        this.derecha = true;
      }
    }
  }
}

var personaje1 = new personaje(10,50);
var personaje2 = new personaje(10,120);
var personaje3 = new personaje(10,250);
var prota = new protagonista(20,100);


document.addEventListener('keydown',(tecla)=>{
  //console.log(tecla.keyCode);
  //Arriba
  if(tecla.keyCode == 38){
    prota.arriba();
  }
  //abajo
  if(tecla.keyCode == 40){
    prota.abajo();
  }
  //Izquierda
  if(tecla.keyCode == 37){
    prota.izquierda();
  }
  //derecha
  if(tecla.keyCode == 39){
    prota.derecha();
  }

});



function borrarCanvas(){
  canvas.width = 500;
  canvas.height = 400;
}
