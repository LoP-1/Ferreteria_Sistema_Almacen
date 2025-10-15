package quantify.sistema.almacenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quantify.sistema.almacenes.models.Productos;

import java.util.Optional;

public interface ProductosRepository extends JpaRepository<Productos, Integer> {
    Optional<Productos> findByCodigoSku(String codigoSku);
}