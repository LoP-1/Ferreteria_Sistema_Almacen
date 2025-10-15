package quantify.sistema.almacenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quantify.sistema.almacenes.models.movimiento.Salidas;

public interface SalidasRepository  extends JpaRepository<Salidas,Integer> {
}
