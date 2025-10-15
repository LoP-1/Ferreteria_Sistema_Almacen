package quantify.sistema.almacenes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quantify.sistema.almacenes.models.Productos;
import quantify.sistema.almacenes.models.movimiento.DetalleSalida;
import quantify.sistema.almacenes.models.movimiento.Salidas;
import quantify.sistema.almacenes.record.salida.Producto;
import quantify.sistema.almacenes.record.salida.SalidaProductosDTO;
import quantify.sistema.almacenes.repository.DetalleSalidaRepository;
import quantify.sistema.almacenes.repository.EmpleadosRepository;
import quantify.sistema.almacenes.repository.ProductosRepository;
import quantify.sistema.almacenes.repository.SalidasRepository;

import java.util.Optional;

@Service
public class SalidaService {

    @Autowired
    EmpleadosRepository empleadosRepository;

    @Autowired
    private SalidasRepository salidasRepository;

    @Autowired
    private ProductosRepository productosRepository;

    @Autowired
    private DetalleSalidaRepository detalleSalidaRepository;

    //realizar un pedido de salida
    public String realizarEntrega(SalidaProductosDTO salidaProductos) {

        // Crear la salida principal
        Salidas entrega = new Salidas();
        entrega.setFechaSalida(new java.sql.Timestamp(System.currentTimeMillis()));
        entrega.setMotivo(salidaProductos.comentarios());
        entrega.setBoleta(salidaProductos.NroBoleta());
        entrega.setEmpleadoResponsable(empleadosRepository.getReferenceById(salidaProductos.idEmpleado()));

        // Guardar la salida (para tener el idSalida)
        entrega = salidasRepository.save(entrega);

        // Para cada producto en la lista
        for (Producto prodSalida : salidaProductos.productosList()) {
            Optional<Productos> productoOpt = productosRepository.findByCodigoSku(prodSalida.CodigoSku());
            if (productoOpt.isEmpty()) {
                throw new RuntimeException("Producto con SKU " + prodSalida.CodigoSku() + " no encontrado");
            }
            Productos producto = productoOpt.get();

            // Verificar stock
            if (producto.getStockActual() < prodSalida.cantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto " + producto.getCodigoSku());
            }

            // Descontar stock
            producto.setStockActual(producto.getStockActual() - prodSalida.cantidad());
            productosRepository.save(producto);

            // Crear detalle de salida
            DetalleSalida detalle = new DetalleSalida();
            detalle.setSalida(entrega);
            detalle.setProducto(producto);
            detalle.setCantidad(prodSalida.cantidad());
            detalleSalidaRepository.save(detalle);
        }

        return "Entrega de productos completada. Boleta: " + entrega.getBoleta();
    }

}

