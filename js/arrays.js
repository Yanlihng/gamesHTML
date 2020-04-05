function inicializar(){

}
var mochila = [];
function compra(objeto){
  if(objeto == 1){
    mochila.push("espada");
  }
  else {
    mochila.push("pocion");
  }
  muestraInventario();
}

function muestraInventario(){
    //for (var i = 0; i < mochila.length; i++) {
      //console.log(i + '- '+mochila[i]);
      //}
      mochila.push("A");
      mochila.push("B");
      mochila.push("C");
      mochila.push("D");
      mochila.push("E");
      console.log(mochila);
}

function vender(){
  mochila.splice(2,1);
  //mochila.pop();
  //muestraInventario();
}
