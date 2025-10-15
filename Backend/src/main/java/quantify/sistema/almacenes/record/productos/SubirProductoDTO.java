package quantify.sistema.almacenes.record.productos;

import java.math.BigDecimal;

public record SubirProductoDTO(
        String codigoSku,
        String nombre,
        String descripcion,
        BigDecimal precioCompra,
        Integer stockInicial,
        Integer stockMinimo,
        String categoria,
        String rucProveedor
) {
}
