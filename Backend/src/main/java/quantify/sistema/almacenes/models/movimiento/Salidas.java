package quantify.sistema.almacenes.models.movimiento;

import jakarta.persistence.*;
import quantify.sistema.almacenes.models.Empleados;

import java.sql.Timestamp;

@Entity
@Table(name = "salidas")
public class Salidas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSalida;

    @Column(nullable = false)
    private Timestamp fechaSalida;

    @Column
    private String boleta;

    @ManyToOne
    @JoinColumn(name = "idEmpleadoResponsable", nullable = false)
    private Empleados empleadoResponsable;

    @Column(nullable = false)
    private String motivo;

    // Getters y Setters

    public Integer getIdSalida() {
        return idSalida;
    }

    public void setIdSalida(Integer idSalida) {
        this.idSalida = idSalida;
    }

    public Timestamp getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Timestamp fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public String getBoleta() {
        return boleta;
    }

    public void setBoleta(String boleta) {
        this.boleta = boleta;
    }

    public Empleados getEmpleadoResponsable() {
        return empleadoResponsable;
    }

    public void setEmpleadoResponsable(Empleados empleadoResponsable) {
        this.empleadoResponsable = empleadoResponsable;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}
