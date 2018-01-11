package fr.lfml.manaproject.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A FnDesc.
 */
@Entity
@Table(name = "fn_desc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FnDesc implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(name = "description", nullable = false)
	private String description;

	@ManyToOne
	private Project project;

	@ManyToOne
	private FuncNeed func_need;

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

	public FnDesc description(String description) {
		this.description = description;
		return this;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Project getProjectid() {
		return project;
	}

	public FnDesc projectid(Project project) {
		this.project = project;
		return this;
	}

	public void setProjectid(Project project) {
		this.project = project;
	}

	public FuncNeed getFuncneedid() {
		return func_need;
	}

	public FnDesc funcneedid(FuncNeed funcNeed) {
		this.func_need = funcNeed;
		return this;
	}

	public void setFuncneedid(FuncNeed funcNeed) {
		this.func_need = funcNeed;
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
		FnDesc fnDesc = (FnDesc) o;
		if (fnDesc.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), fnDesc.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "FnDesc{" + "id=" + getId() + ", description='" + getDescription() + "'" + "}";
	}
}
