package fr.lfml.manaproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.lfml.manaproject.domain.TechNeed;

import fr.lfml.manaproject.repository.TechNeedRepository;
import fr.lfml.manaproject.web.rest.errors.BadRequestAlertException;
import fr.lfml.manaproject.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TechNeed.
 */
@RestController
@RequestMapping("/api")
public class TechNeedResource {

    private final Logger log = LoggerFactory.getLogger(TechNeedResource.class);

    private static final String ENTITY_NAME = "techNeed";

    private final TechNeedRepository techNeedRepository;

    public TechNeedResource(TechNeedRepository techNeedRepository) {
        this.techNeedRepository = techNeedRepository;
    }

    /**
     * POST  /tech-needs : Create a new techNeed.
     *
     * @param techNeed the techNeed to create
     * @return the ResponseEntity with status 201 (Created) and with body the new techNeed, or with status 400 (Bad Request) if the techNeed has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tech-needs")
    @Timed
    public ResponseEntity<TechNeed> createTechNeed(@Valid @RequestBody TechNeed techNeed) throws URISyntaxException {
        log.debug("REST request to save TechNeed : {}", techNeed);
        if (techNeed.getId() != null) {
            throw new BadRequestAlertException("A new techNeed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TechNeed result = techNeedRepository.save(techNeed);
        return ResponseEntity.created(new URI("/api/tech-needs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tech-needs : Updates an existing techNeed.
     *
     * @param techNeed the techNeed to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated techNeed,
     * or with status 400 (Bad Request) if the techNeed is not valid,
     * or with status 500 (Internal Server Error) if the techNeed couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tech-needs")
    @Timed
    public ResponseEntity<TechNeed> updateTechNeed(@Valid @RequestBody TechNeed techNeed) throws URISyntaxException {
        log.debug("REST request to update TechNeed : {}", techNeed);
        if (techNeed.getId() == null) {
            return createTechNeed(techNeed);
        }
        TechNeed result = techNeedRepository.save(techNeed);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, techNeed.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tech-needs : get all the techNeeds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of techNeeds in body
     */
    @GetMapping("/tech-needs")
    @Timed
    public List<TechNeed> getAllTechNeeds() {
        log.debug("REST request to get all TechNeeds");
        return techNeedRepository.findAll();
        }

    /**
     * GET  /tech-needs/:id : get the "id" techNeed.
     *
     * @param id the id of the techNeed to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the techNeed, or with status 404 (Not Found)
     */
    @GetMapping("/tech-needs/{id}")
    @Timed
    public ResponseEntity<TechNeed> getTechNeed(@PathVariable Long id) {
        log.debug("REST request to get TechNeed : {}", id);
        TechNeed techNeed = techNeedRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(techNeed));
    }

    /**
     * DELETE  /tech-needs/:id : delete the "id" techNeed.
     *
     * @param id the id of the techNeed to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tech-needs/{id}")
    @Timed
    public ResponseEntity<Void> deleteTechNeed(@PathVariable Long id) {
        log.debug("REST request to delete TechNeed : {}", id);
        techNeedRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
