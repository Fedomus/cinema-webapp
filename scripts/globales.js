
// Main

const peliculas = [];

let idiomaCastellano= document.getElementById("castellano");
let espacioOpcionesIdioma = document.getElementById('idiomas');
let espacioOpcionesFormato = document.getElementById('botones-formato');
const filtroSucursales = document.getElementById("sucursales");
const filtroIdiomas = document.getElementById("idiomas");
const filtroFormatos= document.getElementById("formatos");
let divCartelera= document.querySelector(".cartelera");

//fichastecnicas

const pelicula= JSON.parse(sessionStorage.getItem('peliculaElegida'))

//elegir funcion

const funciones = [];

let selectSucursal = document.querySelector('#seleccionarSucursal');
let selectDia = document.querySelector('#seleccionarDia');
let selectHora = document.querySelector('#seleccionarHora');
let confirmarSeleccion = document.querySelector('.aceptar');
let espacioTitulo = document.getElementsByClassName("espaciotitulo");
let espacioSelectDia= document.getElementById('espacioSelectDia')
let espacioSelectHora= document.getElementById('espacioSelectHora')
let espacioTrailer= document.querySelector('.trailer');

//elegir asientos

let divEncabezado = document.querySelector(".titulo");
let cine= document.querySelector(".filas");

let funcionElegida= JSON.parse(sessionStorage.getItem('funcionElegida'))
const funcionAgregada = JSON.parse(localStorage.getItem('funcionAgregada'));

// Login

const usuarios = [];

//Pago

let detalleFuncion = document.querySelector('.detalleFuncion');
let espacioPago= document.querySelector('.espacioPago');
let botonAceptar= document.querySelector('#aceptarPago');
let formularioCliente = document.querySelector('#registroDatosPersonales')

let divCheck= document.querySelectorAll('.form-check');




