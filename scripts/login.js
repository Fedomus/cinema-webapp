fetch("usuarios/usuarios.json")
      .then( response => response.json())
      .then( (data) => {
            for (const literal of data){
                  usuarios.push(new Usuario(literal.id, literal.nombre, literal.apellido, literal.email, literal.contraseña))
            }
      })

login();
carousel();
irARegistro();
loadLinkNav();

