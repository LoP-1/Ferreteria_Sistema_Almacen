package quantify.sistema.almacenes.record.salida;

import java.sql.Timestamp;
import java.util.List;

public record SalidaDTO(
        Integer idSalida,
        Timestamp fechaSalida,
        String boleta,
        String motivo,
        String empleadoResponsable,
        List<Producto> detalles
) {}