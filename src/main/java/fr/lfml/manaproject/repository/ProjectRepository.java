package fr.lfml.manaproject.repository;

import fr.lfml.manaproject.domain.Project;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select project from Project project where project.userid.login = ?#{principal.username}")
    List<Project> findByUseridIsCurrentUser();

}
