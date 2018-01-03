package fr.lfml.manaproject.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "picture", nullable = false)
    private String picture;

    @NotNull
    @Column(name = "manday", nullable = false)
    private Integer manday;

    @NotNull
    @Column(name = "referent", nullable = false)
    private String referent;

    @NotNull
    @Column(name = "jhi_year", nullable = false)
    private Integer year;

    @ManyToOne
    private User userid;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Project title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Project description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture() {
        return picture;
    }

    public Project picture(String picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Integer getManday() {
        return manday;
    }

    public Project manday(Integer manday) {
        this.manday = manday;
        return this;
    }

    public void setManday(Integer manday) {
        this.manday = manday;
    }

    public String getReferent() {
        return referent;
    }

    public Project referent(String referent) {
        this.referent = referent;
        return this;
    }

    public void setReferent(String referent) {
        this.referent = referent;
    }

    public Integer getYear() {
        return year;
    }

    public Project year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public User getUserid() {
        return userid;
    }

    public Project userid(User user) {
        this.userid = user;
        return this;
    }

    public void setUserid(User user) {
        this.userid = user;
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
        Project project = (Project) o;
        if (project.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), project.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", manday='" + getManday() + "'" +
            ", referent='" + getReferent() + "'" +
            ", year='" + getYear() + "'" +
            "}";
    }
}
