package quantify.sistema.almacenes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quantify.sistema.almacenes.record.salida.SalidaProductosDTO;
import quantify.sistema.almacenes.service.SalidaService;

@RestController
@RequestMapping("/salidas")
public class SalidaController {

    @Autowired
    SalidaService salidaService;

    @PostMapping()
    public String registrarSalida(SalidaProductosDTO salidaProductosDTO){
        salidaService.realizarEntrega(salidaProductosDTO);
        return "ok";
    }




}
