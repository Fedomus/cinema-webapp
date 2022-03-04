// navbar

function loadLinkNav(){
      let linkNav = document.querySelector('.linkNav');
      let user = JSON.parse(localStorage.getItem('usuario')) || 'null';
      if (user != 'null'){
            linkNav.innerHTML='';
            let divUser = document.createElement('div');
            divUser.id='linkNav'
            divUser.innerHTML=`<img src=''/>
                              <button class="btn btn-secondary" id='usuario'>${user.nombre}</button>
                              <div class="dropdown">
                                    
                              </div>
                              <button class="btn btn-secondary" id='logOut'>Salir</button>`;
            linkNav.append(divUser);
            logOut();
      } else {
            linkNav.innerHTML='';
            let divLogin = document.createElement('div');
            divLogin.innerHTML=`
            <button id="botonLogin" type="submit" class="btn btn-primary">Iniciar sesión</button>`
            linkNav.append(divLogin);
            irALogin();
      }
}


function irALogin(){
      let botonLogin= document.querySelector('#botonLogin');
      botonLogin.addEventListener('click', () => {
            window.location.href='login.html'
      });
}

function logOut(){
      let logOut = document.querySelector('#logOut');
      logOut.addEventListener('click', () => {
            localStorage.removeItem('usuario');
            Swal.fire({
                  text: '¿Esta seguro de que desea salir?',
                  confirmButtonText: 'Si'
                }).then( () => {
                        window.location.href='index.html'
                });
      })
}

// carousel

function carousel(){
      const imgs = document.querySelectorAll(".imagenCarousel");
      imgs[2].style.display = 'block';
      let i = 0;
      setInterval(function(){ 
            if(i == 0) {
                  imgs[2].style.display = 'none';
                  imgs[i].style.display = 'block';
            } else if(i == imgs.length ) {
                  imgs[i - 1].style.display = 'none';
                  imgs[0].style.display = 'block';
                  i = 0;
            } else {
                  imgs[i - 1].style.display = 'none';
                  imgs[i].style.display = 'block';
            }
      i++;
      }, 3000);
}

// cartelera

function cargarCartelera(peliculas){
      divCartelera.innerHTML='';
      for (const pelicula of peliculas){
            let divPelicula= document.createElement("div");
            divPelicula.innerHTML=`<div class='pelicula' id="${pelicula.id}"><img src=${pelicula.dirImagen} alt="nombre peli" width="160" height="240">
            <h6 style="color:silver;">${pelicula.nombre}</h6></div>`;  
            divCartelera.append(divPelicula);     
      }
      const enlaces = divCartelera.children;
      for(const enlace of enlaces){
            enlace.addEventListener('click', cargarPelicula)
      }
}

function cargarPelicula(){
      let peliculaElegida= peliculas.find( (pelicula) => pelicula.nombre == this.innerText);
      sessionStorage.setItem('peliculaElegida', JSON.stringify(peliculaElegida));
      window.location.href='detallePeli.html';
}

function arraySinDuplicados(lista) {
      let unicos = [];
      lista.forEach(categoria => {
            !unicos.includes(categoria) && unicos.push(categoria);
      });
      return unicos;
}

function generarFiltros(peliculas){
      const sucursales= peliculas.map(pelicula => pelicula.sucursal)
      crearSelectSucursales(arraySinDuplicados(sucursales));
      const idiomas= peliculas.map(pelicula => pelicula.idioma)
      crearSelectIdiomas(arraySinDuplicados(idiomas));   
      const formatos= peliculas.map(pelicula => pelicula.formato)
      crearSelectFormatos(arraySinDuplicados(formatos));
}


function crearSelectSucursales(lista) {     
      let newSelect = document.createElement('select');
      newSelect.id='opcionesSucursal'
      newSelect.innerHTML = "<option>" + lista.join('</option><option>') + "</option>";
      filtroSucursales.append(newSelect);
      newSelect.addEventListener('change', mostrarFiltradas)
}

function crearSelectIdiomas(lista) {     
      let newSelect = document.createElement('select');
      newSelect.id='opcionesIdioma'
      newSelect.innerHTML = "<option>Todos</option></todos><option>" + lista.join('</option><option>') + "</option>";
      filtroIdiomas.append(newSelect);
      newSelect.addEventListener('change', mostrarFiltradas)
}

function crearSelectFormatos(lista) {     
      let newSelect = document.createElement('select');
      newSelect.id='opcionesFormato'
      newSelect.innerHTML = "<option>Todos</option><option>" + lista.join('</option><option>') + "</option>";
      filtroFormatos.append(newSelect);
      newSelect.addEventListener('change', mostrarFiltradas)
}

function mostrarFiltradas(){
      let opcionesSucursal=document.getElementById('opcionesSucursal');
      let opcionesIdioma=document.getElementById('opcionesIdioma');
      let opcionesFormato=document.getElementById('opcionesFormato');
      let sucursalElegida= opcionesSucursal.options[opcionesSucursal.selectedIndex].text;
      let idiomaElegido= opcionesIdioma.options[opcionesIdioma.selectedIndex].text;
      let formatoElegido= opcionesFormato.options[opcionesFormato.selectedIndex].text;
      if ((sucursalElegida != 'Todas') && (idiomaElegido == 'Todos') &&  (formatoElegido == 'Todos')){
            let peliculasFiltradas= peliculas.filter(pelicula=> ((pelicula.sucursal==sucursalElegida) || (pelicula.sucursal == 'Todas')));
            cargarCartelera(peliculasFiltradas);
      }
      if ((sucursalElegida == 'Todas') && (idiomaElegido != 'Todos') &&  (formatoElegido == 'Todos')){
            peliculasFiltradas= peliculas.filter(pelicula=> (pelicula.idioma==idiomaElegido));
            cargarCartelera(peliculasFiltradas);
      }
      if ((sucursalElegida == 'Todas') && (idiomaElegido == 'Todos') &&  (formatoElegido != 'Todos')){
            peliculasFiltradas= peliculas.filter(pelicula=> (pelicula.formato==formatoElegido));
            cargarCartelera(peliculasFiltradas);
      }
      if ((sucursalElegida != 'Todas') && (idiomaElegido != 'Todos') &&  (formatoElegido == 'Todos')){
            peliculasFiltradas= peliculas.filter(pelicula=> ((pelicula.sucursal==sucursalElegida) || (pelicula.sucursal == 'Todas')) && (pelicula.idioma==idiomaElegido));
            cargarCartelera(peliculasFiltradas);
      }
      if ((sucursalElegida == 'Todas') && (idiomaElegido != 'Todos') &&  (formatoElegido != 'Todos')){
            peliculasFiltradas= peliculas.filter(pelicula=> (pelicula.idioma==idiomaElegido) && (pelicula.formato==formatoElegido));
            cargarCartelera(peliculasFiltradas);
      }
      if ((sucursalElegida != 'Todas') && (idiomaElegido == 'Todos') &&  (formatoElegido != 'Todos')){
            peliculasFiltradas= peliculas.filter(pelicula=> ((pelicula.sucursal==sucursalElegida) || (pelicula.sucursal == 'Todas')) && (pelicula.formato==formatoElegido));
            cargarCartelera(peliculasFiltradas);
      }
      if ((sucursalElegida != 'Todas') && (idiomaElegido != 'Todos') &&  (formatoElegido != 'Todos')){
            peliculasFiltradas= peliculas.filter(pelicula=> ((pelicula.sucursal==sucursalElegida) || (pelicula.sucursal == 'Todas')) && (pelicula.idioma==idiomaElegido) && (pelicula.formato==formatoElegido));
            cargarCartelera(peliculasFiltradas);
      }
      if ((sucursalElegida == 'Todas') && (idiomaElegido == 'Todos') &&  (formatoElegido == 'Todos')){
            cargarCartelera(peliculas);
      }
}

//Elegir Funcion

function agregarOpcionesSucursal(){
      let sucursales = [];
      for (const funcion of funciones){
            if (funcion.pelicula == pelicula.nombre){
                  sucursales.push(funcion.sucursal);
                  let opcionesSucursal= sucursales.filter((item,index)=>{
                        return sucursales.indexOf(item) === index;
                      })
                  selectSucursal.innerHTML=`    <option selected>Complejo</option>
                                                <option>${opcionesSucursal.join('</option><option>')}</option>`
            }
      }      
      selectSucursal.addEventListener('change', agregarOpcionesDia);
}

function agregarOpcionesDia(){
      let sucursalElegida= selectSucursal.options[selectSucursal.selectedIndex].text;
      if (sucursalElegida == 'Complejo'){
            selectDia.innerHTML="";
            selectHora.innerHTML="";
            confirmarSeleccion.innerHTML="";
      } else {
            selectDia.innerHTML="";
            selectHora.innerHTML="";
            confirmarSeleccion.innerHTML="";
            let dias= [];
            for (const funcion of funciones){
                  if (funcion.pelicula == pelicula.nombre){
                        dias.push(funcion.dia);
                        let opcionesDia= dias.filter((item,index)=>{
                              return dias.indexOf(item) === index;
                            })
                        selectDia.innerHTML=`   <option selected>Día</option>
                                                <option>${opcionesDia.join('</option><option>')}</option>`
                  }
            }     
      selectDia.addEventListener('change', agregarOpcionesHora);
      }
}

function agregarOpcionesHora(){
      let diaElegido= selectDia.options[selectDia.selectedIndex].text;
      if (diaElegido == 'Día'){
            selectHora.innerHTML="";
            confirmarSeleccion.innerHTML="";
      } else {
            selectHora.innerHTML="";
            confirmarSeleccion.innerHTML="";
            let horariosAlmagro= [];
            let horariosFlores= [];
            for (const funcion of funciones){
                  if ((funcion.pelicula == pelicula.nombre) && (funcion.sucursal == 'Almagro')){
                        horariosAlmagro.push(funcion.hora);
                  } 
                  if ((funcion.pelicula == pelicula.nombre) && (funcion.sucursal == 'Flores')){
                        horariosFlores.push(funcion.hora);
                  }
            }
            let sucursalElegida= selectSucursal.options[selectSucursal.selectedIndex].text;
            if (sucursalElegida == 'Almagro') {
                  selectHora.innerHTML=`  <option selected>Horario</option>
                  <option>${horariosAlmagro.join('</option><option>')}</option>`
            }
            if (sucursalElegida == 'Flores') {
                  selectHora.innerHTML=`  <option selected>Horario</option>
                  <option>${horariosFlores.join('</option><option>')}</option>`
            }
      selectHora.addEventListener('change', agregarBoton);
      }
}

function agregarBoton(){
      let horarioElegido= selectHora.options[selectHora.selectedIndex].text;
      if (horarioElegido == 'Horario'){
            confirmarSeleccion.innerHTML="";
      } else {
            confirmarSeleccion.innerHTML=`<button id='seleccionarFuncion' type="button" class="btn btn-primary">Elegir Asientos</button> `
            let seleccionarFuncion = document.getElementById('seleccionarFuncion');
            seleccionarFuncion.addEventListener('click', cargarFuncion);  
      }
}

function cargarFuncion(){
      let sucursal = selectSucursal.options[selectSucursal.selectedIndex].text
      let dia = selectDia.options[selectDia.selectedIndex].text
      let hora = selectHora.options[selectHora.selectedIndex].text
      let funcionElegida = funciones.find( (funcion) => funcion.pelicula == pelicula.nombre && funcion.sucursal == sucursal && funcion.dia == dia && funcion.hora == hora);
      sessionStorage.setItem('funcionElegida', JSON.stringify(funcionElegida))
      window.location.href = 'asientos.html';
}

//mostrar fichas tecnicas

function mostrarDetalle(){
      let titulo= document.querySelector('.espaciotitulo');
      let divTitulo = document.getElementById('tituloPelicula');
      let imagen= document.querySelector('.imagen')
      let divImagen = document.createElement('div');
      let ficha= document.querySelector('.ficha')
      let divFicha = document.createElement('div');
      let sinopsis= document.querySelector('.sinopsis')
      let divSinopsis = document.createElement('div');
      let trailer= document.querySelector('.trailer')
      let divTrailer= document.createElement('div');
      divTitulo.innerHTML= `${pelicula.nombre}`;
      titulo.append(divTitulo);
      divImagen.innerHTML= `<img class="imagen" src="${pelicula.dirImagen}">`;
      imagen.append(divImagen);
      divFicha.innerHTML=`<h6>Género: ${pelicula.genero}</h6>
                        <h6>Actores: ${pelicula.actores}</h6>
                        <h6>Director: ${pelicula.director}</h6>
                        <h6>Origen: ${pelicula.origen}</h6>
                        <h6>Duración: ${pelicula.duracion}</h6>
                        <h6>Calificación: ${pelicula.calificacion}</h6> 
                        <h6>Formato: ${pelicula.formato}</h6>    
                        <h6>Idiomas: ${pelicula.idioma}</h6>`
      ficha.append(divFicha);
      divSinopsis.innerHTML= `<p><h6>Sinopsis:</h6>${pelicula.sinopsis}</p>`
      sinopsis.append(divSinopsis);
      divTrailer.innerHTML= `<iframe class="video" src="${pelicula.dirTrailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      trailer.append(divTrailer);
}

// Elegir asientos

function agregarEncabezado(){
      const {sucursal, pelicula, dia, hora} = funcionElegida;
      let divFuncion = document.createElement('div');
      divFuncion.innerHTML=  `<br>
                              <h5>Voyage ${sucursal}</h5>
                              <hr>
                              <h5>${pelicula}</h5>
                              <h6> ${dia} ${hora}</h6>
                              <hr>
                              <br>
                              <h6>Asientos Elegidos: </h6>`
      detalleFuncion.append(divFuncion);
}

function agregarAsientos(){
      for(let asiento of funcionElegida.asientosLibres){
            let botonAsiento = document.createElement("button");
            botonAsiento.className= "asiento";
            botonAsiento.id= asiento;
            cine.append(botonAsiento);
      }
      eventoClick();
}

function eventoClick(){
      let asientos = cine.children;
      let asientosElegidos= [];
      espacioAsientosElegidos= document.createElement('h6')
      for (const asiento of asientos){
            asiento.addEventListener('click', function(){
                  if (asientosElegidos.includes(asiento.id)){
                        let indice= asientosElegidos.indexOf(asiento.id);
                        asientosElegidos.splice(indice, 1);
                        espacioAsientosElegidos.innerHTML="";
                        espacioAsientosElegidos.innerHTML=`${asientosElegidos.join(', ')}`
                        asiento.style='background-color: white;'
                  } else {
                        asientosElegidos.push(asiento.id);
                        espacioAsientosElegidos.innerHTML="";
                        espacioAsientosElegidos.innerHTML=`${asientosElegidos.join(', ')}`
                        detalleFuncion.append(espacioAsientosElegidos);
                        asiento.style='background-color: #41e0b1;'  
                  }
                  
            });
      }
      return asientosElegidos;
}

function calcularMonto(dia, cantidad){
      dia != 'Viernes' ? total= (cantidad*300) : total= (cantidad*150);
      return total;
}

function cargarDatos(){
      let botonAsientos = document.querySelector('#botonConfirmarAsientos');
      const ASIENTOS = eventoClick();
      botonAsientos.onclick = () => {
            if (ASIENTOS.length > 0) {
                  for (const asiento of ASIENTOS){
                        let indiceAsiento= funcionElegida.asientosLibres.indexOf(asiento);
                        funcionElegida.asientosLibres.splice(indiceAsiento, 1);
                  }
                  let funcionAsientos = {...funcionElegida, asientosElegidos: ASIENTOS}
                  let funcionAgregada = {...funcionAsientos, monto: calcularMonto(funcionAsientos.dia, funcionAsientos.asientosElegidos.length)}
                  localStorage.setItem('funcionAgregada', JSON.stringify(funcionAgregada));
                  let user = JSON.parse(localStorage.getItem('usuario')) || 'null';
                  if (user != 'null'){
                        window.location.href='modopago.html'
                  } else {
                        window.location.href='loginPago.html'
                  }
            } else {
                  Swal.fire('Debe seleccionar un asiento')
            }
      }
}

function cargarCarrito () {
      let linkCompra = document.querySelector('.dropdown') || 'null';
      let compra = funcionAgregada || 'null';
      if (compra != 'null' && linkCompra != 'null'){
            linkCompra.innerHTML=`
            <button type="button" id='miCompra' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Mi compra
          </button>
          
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Mi compra</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div>
                        ${compra.asientosElegidos.length} x ${compra.pelicula + ' ' +compra.hora}
                  </div>
                  <div>
                        $ ${compra.monto}
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" id='' class="cancelarCompra btn btn-secondary" data-bs-dismiss="modal">Cancelar compra</button>
                  <button type="button" id='irAPagar' class="btn btn-success">Pagar</button>
                </div>
              </div>
            </div>
          </div>
                        `;

      irAPagar(); 
      cancelarCompra();
      }
}

function irAPagar(){
      let botonPagar = document.querySelector('#irAPagar');
      botonPagar.onclick = () => {
            window.location.href='modopago.html'
      }
}

function cancelarCompra(){
      let botonCancelar = document.querySelector('.cancelarCompra');
      botonCancelar.onclick = () => {
            localStorage.removeItem('funcionAgregada');
            window.location.href='index.html'
      }
}

//login para el pago

function agregarDetallesFuncion(){
      const {sucursal, asientosElegidos, pelicula, dia, hora, sala, monto} = funcionAgregada;
      detalleFuncion.innerHTML=`
      <br> 
      <h5>Voyage ${sucursal}</h5>
      <hr>
            <h5>${pelicula}</h5>
      <hr>
      <span>${dia}</span>
      <span>${hora}</span>
      <span>${sala}</span>
      <span>Asiento/s ${asientosElegidos}</span>
      <br>
      <h6>Total: $${monto}</h6>
      <br>`
}

function iniciarSesion(){
      let encabezado= document.createElement('div');
      encabezado.innerHTML=`
      <br>
      <span>Inicia sesión para poder adquirir tu/s entrada/s. </span>
      <span>Una vez hecho el pago, la/s enviaremos a tu casilla de correo electrónico</span>
      <br>
      `
      espacioPago.prepend(encabezado);
}

function irARegistro(){
      let botonRegistrarse = document.querySelector('#botonRegistrarse');
      botonRegistrarse.addEventListener('click', () => {
            window.location.href='signup.html';
      });
}

function volverAPaginaAnterior(){
      let user = JSON.parse(localStorage.getItem('usuario')) || 'null';
      if (user != 'null'){
            localStorage.removeItem('funcionAgregada')
            history.back();
      }
}

// Login

function login(){
      let botonIngresar= document.querySelector('#botonIngresar');
      botonIngresar.addEventListener('click', (e) => {
            e.preventDefault()
            let email = document.querySelector('#email').value;
            let pass = document.querySelector('#pass').value;
            let usuario = usuarios.find( (usuario) => ((usuario.email == email) && (usuario.contraseña == pass))) || 'ninguno';
            if (usuario != 'ninguno') {
                  localStorage.setItem('usuario', JSON.stringify(usuario));
                  history.back()
            } else {
                  Swal.fire('Usuario o contraseña inválidos');
            }
      });
}

//modo pago

function interfazModoPago(){
      const {monto} = funcionAgregada
      let monto3cuotas = monto*0.2;
      let monto6cuotas = monto * 0.4;
      // let cliente = JSON.parse(localStorage.getItem('Cliente'));
      document.querySelector('#labelUnPago').innerHTML=`Un pago de $${monto}`
      document.querySelector('#labelDosPagos').innerHTML=`2 pagos sin interés de $${monto/2}`
      document.querySelector('#labelTresPagos').innerHTML=`3 pagos con una tasa de 20%. Total de $${monto3cuotas}, en 3 cuotas de $${monto3cuotas/3}`
      document.querySelector('#labelSeisPagos').innerHTML=`6 pagos con una tasa del 40%. Total de $${monto6cuotas}, en 6 cuotas de $${monto6cuotas/6}`
      aceptarModoPago();
}

function aceptarModoPago(){
      let botonAceptarModoPago= document.querySelector('#botonPago');
      botonAceptarModoPago.onclick = () => {
            Swal.fire(
                  'Compra realizada',
                  'Se ha realizado la compra',
                  'success'
            ).then( () => {
                  localStorage.removeItem('funcionAgregada')
                  window.location.href='index.html'
            })
      }
}


