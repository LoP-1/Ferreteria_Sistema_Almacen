package quantify.sistema.almacenes.models.movimiento;

import jakarta.persistence.*;
import quantify.sistema.almacenes.models.Productos;

@Entity
@Table(name = "detalle_salida")
public class DetalleSalida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDetalleSalida;

    @ManyToOne
    @JoinColumn(name = "idSalida", nullable = false)
    private Salidas salida;

    @ManyToOne
    @JoinColumn(name = "idProducto", nullable = false)
    private Productos producto;

    @Column(nullable = false)
    private Integer cantidad;

    // Getters y Setters
    public Integer getIdDetalleSalida() { return idDetalleSalida; }
    public void setIdDetalleSalida(Integer idDetalleSalida) { this.idDetalleSalida = idDetalleSalida; }

    public Salidas getSalida() { return salida; }
    public void setSalida(Salidas salida) { this.salida = salida; }

    public Productos getProducto() { return producto; }
    public void setProducto(Productos producto) { this.producto = producto; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}