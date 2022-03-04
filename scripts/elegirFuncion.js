fetch("funcionesDeCine/funcionesDeCine.json")
      .then( response => response.json())
      .then( (data) => {
            for (const literal of data){
                  funciones.push(new FuncionDeCine(literal.pelicula, literal.sucursal, literal.dia, literal.hora, literal.sala))
            }
            agregarOpcionesSucursal()
      })
      .catch( (mensaje) => console.error(mensaje));


carousel();