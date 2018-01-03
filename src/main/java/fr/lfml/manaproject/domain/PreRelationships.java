package fr.lfml.manaproject.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PreRelationships.
 */
@Entity
@Table(name = "pre_relationships")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PreRelationships implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_number", nullable = false)
    private Integer number;

    @ManyToOne
    private Experience experienceid;

    @ManyToOne
    private Role roleid;

    @ManyToOne
    private Project projectid;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public PreRelationships number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Experience getExperienceid() {
        return experienceid;
    }

    public PreRelationships experienceid(Experience experience) {
        this.experienceid = experience;
        return this;
    }

    public void setExperienceid(Experience experience) {
        this.experienceid = experience;
    }

    public Role getRoleid() {
        return roleid;
    }

    public PreRelationships roleid(Role role) {
        this.roleid = role;
        return this;
    }

    public void setRoleid(Role role) {
        this.roleid = role;
    }

    public Project getProjectid() {
        return projectid;
    }

    public PreRelationships projectid(Project project) {
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
        PreRelationships preRelationships = (PreRelationships) o;
        if (preRelationships.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), preRelationships.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PreRelationships{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            "}";
    }
}
