package fr.lfml.manaproject.repository;

import fr.lfml.manaproject.domain.FuncNeed;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FuncNeed entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FuncNeedRepository extends JpaRepository<FuncNeed, Long> {

}
