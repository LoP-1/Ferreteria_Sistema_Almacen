package quantify.sistema.almacenes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quantify.sistema.almacenes.models.Proveedores;
import quantify.sistema.almacenes.service.ProveedoresService;

@RestController
@RequestMapping("/proveedores")
public class ProveedoresController {

    @Autowired
    ProveedoresService proveedoresService;

    //agregar un proveedor nuevo
    @PostMapping("/agregar")
    public String agregarProveedor(@RequestBody Proveedores proveedores){
        return proveedoresService.agregarProveedor(proveedores);
    }

    //actualizar un proveedor existente
    @PutMapping("/agregar")
    public String actulizarProveedor(@RequestBody Proveedores proveedores){
        return proveedoresService.actualizarProveedor(proveedores);
    }

}
