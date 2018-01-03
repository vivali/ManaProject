package fr.lfml.manaproject.repository;

import fr.lfml.manaproject.domain.Techno;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Techno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TechnoRepository extends JpaRepository<Techno, Long> {

}
