package quantify.sistema.almacenes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quantify.sistema.almacenes.models.Empleados;
import quantify.sistema.almacenes.record.auth.UsuarioDTO;
import quantify.sistema.almacenes.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    //registrar usuario
    @PostMapping("/registrar")
    public String registrar(@RequestBody Empleados usuario){
        return authService.registrar(usuario);
    }

    //login
    @PostMapping("/login")
    public String login(@RequestBody UsuarioDTO usuario){
        return authService.login(usuario);
    }

}
