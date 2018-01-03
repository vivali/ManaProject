package fr.lfml.manaproject.repository;

import fr.lfml.manaproject.domain.FnDesc;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FnDesc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FnDescRepository extends JpaRepository<FnDesc, Long> {

}
