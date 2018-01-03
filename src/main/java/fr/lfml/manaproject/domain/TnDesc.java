package fr.lfml.manaproject.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TnDesc.
 */
@Entity
@Table(name = "tn_desc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TnDesc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    private TechNeed techneedid;

    @ManyToOne
    private Project projectid;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public TnDesc description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TechNeed getTechneedid() {
        return techneedid;
    }

    public TnDesc techneedid(TechNeed techNeed) {
        this.techneedid = techNeed;
        return this;
    }

    public void setTechneedid(TechNeed techNeed) {
        this.techneedid = techNeed;
    }

    public Project getProjectid() {
        return projectid;
    }

    public TnDesc projectid(Project project) {
        this.projectid = project;
        return this;
    }

    public void setProjectid(Project project) {
        this.projectid = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TnDesc tnDesc = (TnDesc) o;
        if (tnDesc.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tnDesc.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TnDesc{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
