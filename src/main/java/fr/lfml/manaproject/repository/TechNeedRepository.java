package fr.lfml.manaproject.repository;

import fr.lfml.manaproject.domain.TechNeed;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TechNeed entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TechNeedRepository extends JpaRepository<TechNeed, Long> {

}
