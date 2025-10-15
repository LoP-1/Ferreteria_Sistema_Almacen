package quantify.sistema.almacenes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quantify.sistema.almacenes.models.Empleados;
import quantify.sistema.almacenes.record.auth.UsuarioDTO;
import quantify.sistema.almacenes.repository.EmpleadosRepository;

@Service
public class AuthService {

    @Autowired
    EmpleadosRepository empleadosRepository;

    //login de usuario
    public String login(UsuarioDTO usuario){
        Empleados empleados = empleadosRepository.findByEmail(usuario.email());
        System.out.println(empleados);

        if (empleados == null) {
            return "error: usuario no encontrado";
        }

        if (empleados.getContraseña().equals(usuario.contraseña())){
            return "ok";
        } else {
            return "error: contraseña incorrecta";
        }
    }

    //registrar usuario
    public String registrar(Empleados usuario){
        empleadosRepository.save(usuario);
        return "ok";
    }

}
