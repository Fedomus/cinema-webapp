fetch('peliculas/peliculas.json')
      .then( response => response.json())
      .then( (data) => {
            for (const literal of data){
                  peliculas.push(new Pelicula(literal.id, literal.nombre, literal.sucursal, literal.idioma, literal.formato, literal.dirImagen, literal.genero, literal.actores, literal.director, literal.origen, literal.duracion, literal.calificacion, literal.sinopsis, literal.dirTrailer))
            }
            cargarCartelera(peliculas);
            generarFiltros(peliculas);
      })
      .catch( mensaje => console.error(mensaje))


carousel();
loadLinkNav();
cargarCarrito();

