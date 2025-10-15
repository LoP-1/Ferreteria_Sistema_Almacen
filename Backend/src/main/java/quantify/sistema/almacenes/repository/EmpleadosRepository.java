package quantify.sistema.almacenes.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import quantify.sistema.almacenes.models.Empleados;

import java.util.List;

public interface EmpleadosRepository extends JpaRepository<Empleados,Integer> {
    List<Empleados> searchByEmail(String email);
    Empleados findByEmail(String email);
}
