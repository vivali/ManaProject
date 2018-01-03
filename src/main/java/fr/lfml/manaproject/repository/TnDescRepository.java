package fr.lfml.manaproject.repository;

import fr.lfml.manaproject.domain.TnDesc;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TnDesc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TnDescRepository extends JpaRepository<TnDesc, Long> {

}
