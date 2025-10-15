package quantify.sistema.almacenes.record.salida;


import java.util.List;

public record SalidaProductosDTO(
        Integer idEmpleado,
        String NroBoleta,
        String comentarios,
        List<Producto> productosList
) {
}
