package fr.lfml.manaproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import fr.lfml.manaproject.domain.Project;

/**
 * Spring Data JPA repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	@Query("select project from Project project where project.user.login = ?#{principal.username}")
	List<Project> findByUseridIsCurrentUser();

}
