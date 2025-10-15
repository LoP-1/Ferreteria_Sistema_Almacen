package quantify.sistema.almacenes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quantify.sistema.almacenes.record.productos.SubirProductoDTO;
import quantify.sistema.almacenes.service.ProductoService;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    //agregar un producto nuevo
    @PostMapping
    public ResponseEntity<?> subirProducto(@RequestBody SubirProductoDTO producto){
        productoService.agregarProducto(producto);
        return ResponseEntity.ok("Producto agregado correctamente");
    }


    //agregar mas stock a un producto
    @PostMapping("/stock")
    public ResponseEntity<?> agregarStock(@RequestParam Integer cantidad, @RequestParam String codigoSku){
        productoService.agregarStock(cantidad, codigoSku);
        return ResponseEntity.ok("Se agrego " + cantidad + " stock al producto " + codigoSku);
    }


    //listar todos los productos
    @GetMapping
    public ResponseEntity<?> listarProductos(){
        return ResponseEntity.ok(productoService.listarProductos());
    }

    //obtener productos con bajo stock
    @GetMapping("/bajoStock")
    public ResponseEntity<?> productosBajoStock(){
        return ResponseEntity.ok(productoService.productosBajoStock());
    }

}
