package quantify.sistema.almacenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quantify.sistema.almacenes.models.movimiento.DetalleSalida;

public interface DetalleSalidaRepository extends JpaRepository<DetalleSalida, Integer> {
}
