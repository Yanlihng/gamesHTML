function guardar(valor) {
  localStorage.setItem("nombre_jugador", valor);
  console.log("dato guardado");
}

function cargar() {
  var dato = localStorage.getItem("nombre_jugador");
  console.log("dato cargado");

  console.log(dato);
}
function borrar() {
  localStorage.removeItem("nombre_jugador");
  console.log("dato borrado");
}

function inicializar() {}
