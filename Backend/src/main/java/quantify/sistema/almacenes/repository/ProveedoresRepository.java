package quantify.sistema.almacenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quantify.sistema.almacenes.models.Productos;
import quantify.sistema.almacenes.models.Proveedores;

import java.util.Optional;

public interface ProveedoresRepository extends JpaRepository<Proveedores, Integer> {
    Optional<Proveedores> findByRuc(String Ruc);
}
