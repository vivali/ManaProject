package fr.lfml.manaproject.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
	private TechNeed tech_need;

	@ManyToOne
	@JoinColumn(name = "project_id")
	private Project project;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
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

	public TechNeed getTech_need() {
		return tech_need;
	}

	public TnDesc techneedid(TechNeed techNeed) {
		this.tech_need = techNeed;
		return this;
	}

	public void setTech_need(TechNeed techNeed) {
		this.tech_need = techNeed;
	}

	public Project getProject() {
		return project;
	}

	public TnDesc projectid(Project project) {
		this.project = project;
		return this;
	}

	public void setProject(Project project) {
		this.project = project;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

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
		return "TnDesc{" + "id=" + getId() + ", description='" + getDescription() + "'" + "}";
	}
}
