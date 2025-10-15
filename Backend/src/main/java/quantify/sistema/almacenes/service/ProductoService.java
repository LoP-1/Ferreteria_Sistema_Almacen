package quantify.sistema.almacenes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quantify.sistema.almacenes.models.Productos;
import quantify.sistema.almacenes.models.Proveedores;
import quantify.sistema.almacenes.record.productos.SubirProductoDTO;
import quantify.sistema.almacenes.repository.ProductosRepository;
import quantify.sistema.almacenes.repository.ProveedoresRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    ProductosRepository productosRepository;
    @Autowired
    ProveedoresRepository proveedoresRepository;

    //guardar un producto en la bd
    public String agregarProducto(SubirProductoDTO producto){
        Productos listo = new Productos();

        listo.setCategoria(producto.categoria());
        listo.setCodigoSku(producto.codigoSku());
        listo.setNombre(producto.nombre());
        listo.setDescripcion(producto.descripcion());
        listo.setPrecioCompra(producto.precioCompra());
        listo.setStockActual(producto.stockInicial());
        listo.setStockMinimo(producto.stockMinimo());

        if (producto.rucProveedor() != null) {
            Optional<Proveedores> proveedorOpt = proveedoresRepository.findByRuc(producto.rucProveedor());
            proveedorOpt.ifPresent(listo::setProveedor);
        }

        productosRepository.save(listo);
        return "Producto agregado exitosamente";
    }


    //agregar mas stock a un producto
    public String agregarStock(Integer cantidad, String codigoSku){
        Optional<Productos> productoOpt = productosRepository.findByCodigoSku(codigoSku);
        productoOpt.ifPresent(producto -> {
            producto.setStockActual(producto.getStockActual() + cantidad);
            productosRepository.save(producto);
        });
        return "Se agrego " + cantidad + " stock al producto " + codigoSku;
    }


    //listar todos los productos
    public Iterable<Productos> listarProductos(){
        return productosRepository.findAll();
    }

    //obtener productos con bajo stock
    public Iterable<Productos> productosBajoStock() {
        List<Productos> productosResultado = new ArrayList<>();

        for (Productos producto : productosRepository.findAll()) {
            if (producto.getStockActual() < producto.getStockMinimo()) {
                productosResultado.add(producto);
            }
        }
        return productosResultado;
    }
}
