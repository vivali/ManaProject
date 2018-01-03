package fr.lfml.manaproject.repository;

import fr.lfml.manaproject.domain.PreRelationships;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PreRelationships entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PreRelationshipsRepository extends JpaRepository<PreRelationships, Long> {

}
