package quantify.sistema.almacenes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quantify.sistema.almacenes.models.Proveedores;
import quantify.sistema.almacenes.repository.ProveedoresRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedoresService {

    @Autowired
    ProveedoresRepository proveedoresRepository;

    //agregar un proveedor nuevo
    public String agregarProveedor(Proveedores proveedor){
        proveedoresRepository.save(proveedor);
        return "Proveedor agregado exitosamente";
    }

    //actualizar un proveedor existente
    public String actualizarProveedor(Proveedores proveedor){
        if (proveedor.getIdProveedor() == null) {
            return "Error: El ID del proveedor es requerido para actualizar.";
        }

        // Buscar el proveedor existente por ID
        Optional<Proveedores> existenteOpt = proveedoresRepository.findById(proveedor.getIdProveedor());
        if (existenteOpt.isEmpty()) {
            return "Error: Proveedor no encontrado.";
        }

        Proveedores existente = existenteOpt.get();
        // Actualizar solo los campos necesarios
        existente.setNombreEmpresa(proveedor.getNombreEmpresa());
        existente.setRuc(proveedor.getRuc());
        existente.setContactoNombre(proveedor.getContactoNombre());
        existente.setTelefono(proveedor.getTelefono());
        existente.setEmail(proveedor.getEmail());
        existente.setDescripcion(proveedor.getDescripcion());

        proveedoresRepository.save(existente);

        return "Proveedor actualizado exitosamente";
    }

    public List<Proveedores> listarProveedores(){
        return proveedoresRepository.findAll();
    }

}
