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
 * A Version.
 */
@Entity
@Table(name = "version")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Version implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(name = "number", nullable = false)
	private String number;

	@ManyToOne
	private Project project;

	@ManyToOne
	private Techno techno;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumber() {
		return number;
	}

	public Version number(String number) {
		this.number = number;
		return this;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Project getProject() {
		return project;
	}

	public Version projectid(Project project) {
		this.project = project;
		return this;
	}

	public void setProjectid(Project project) {
		this.project = project;
	}

	public Techno getTechnoid() {
		return techno;
	}

	public Version technoid(Techno techno) {
		this.techno = techno;
		return this;
	}

	public void setTechnoid(Techno techno) {
		this.techno = techno;
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
		Version version = (Version) o;
		if (version.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), version.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "Version{" + "id=" + getId() + ", number='" + getNumber() + "'" + "}";
	}
}
