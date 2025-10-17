package quantify.sistema.almacenes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quantify.sistema.almacenes.record.salida.SalidaDTO;
import quantify.sistema.almacenes.record.salida.SalidaProductosDTO;
import quantify.sistema.almacenes.service.SalidaService;

import java.util.List;

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

    @GetMapping()
    public List<SalidaDTO> listarSalidas(){
        return salidaService.listarSalidas();
    }


}
