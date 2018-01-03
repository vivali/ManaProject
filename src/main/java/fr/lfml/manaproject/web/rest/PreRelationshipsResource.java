package fr.lfml.manaproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.lfml.manaproject.domain.PreRelationships;

import fr.lfml.manaproject.repository.PreRelationshipsRepository;
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
 * REST controller for managing PreRelationships.
 */
@RestController
@RequestMapping("/api")
public class PreRelationshipsResource {

    private final Logger log = LoggerFactory.getLogger(PreRelationshipsResource.class);

    private static final String ENTITY_NAME = "preRelationships";

    private final PreRelationshipsRepository preRelationshipsRepository;

    public PreRelationshipsResource(PreRelationshipsRepository preRelationshipsRepository) {
        this.preRelationshipsRepository = preRelationshipsRepository;
    }

    /**
     * POST  /pre-relationships : Create a new preRelationships.
     *
     * @param preRelationships the preRelationships to create
     * @return the ResponseEntity with status 201 (Created) and with body the new preRelationships, or with status 400 (Bad Request) if the preRelationships has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pre-relationships")
    @Timed
    public ResponseEntity<PreRelationships> createPreRelationships(@Valid @RequestBody PreRelationships preRelationships) throws URISyntaxException {
        log.debug("REST request to save PreRelationships : {}", preRelationships);
        if (preRelationships.getId() != null) {
            throw new BadRequestAlertException("A new preRelationships cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PreRelationships result = preRelationshipsRepository.save(preRelationships);
        return ResponseEntity.created(new URI("/api/pre-relationships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pre-relationships : Updates an existing preRelationships.
     *
     * @param preRelationships the preRelationships to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated preRelationships,
     * or with status 400 (Bad Request) if the preRelationships is not valid,
     * or with status 500 (Internal Server Error) if the preRelationships couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pre-relationships")
    @Timed
    public ResponseEntity<PreRelationships> updatePreRelationships(@Valid @RequestBody PreRelationships preRelationships) throws URISyntaxException {
        log.debug("REST request to update PreRelationships : {}", preRelationships);
        if (preRelationships.getId() == null) {
            return createPreRelationships(preRelationships);
        }
        PreRelationships result = preRelationshipsRepository.save(preRelationships);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, preRelationships.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pre-relationships : get all the preRelationships.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of preRelationships in body
     */
    @GetMapping("/pre-relationships")
    @Timed
    public List<PreRelationships> getAllPreRelationships() {
        log.debug("REST request to get all PreRelationships");
        return preRelationshipsRepository.findAll();
        }

    /**
     * GET  /pre-relationships/:id : get the "id" preRelationships.
     *
     * @param id the id of the preRelationships to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the preRelationships, or with status 404 (Not Found)
     */
    @GetMapping("/pre-relationships/{id}")
    @Timed
    public ResponseEntity<PreRelationships> getPreRelationships(@PathVariable Long id) {
        log.debug("REST request to get PreRelationships : {}", id);
        PreRelationships preRelationships = preRelationshipsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(preRelationships));
    }

    /**
     * DELETE  /pre-relationships/:id : delete the "id" preRelationships.
     *
     * @param id the id of the preRelationships to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pre-relationships/{id}")
    @Timed
    public ResponseEntity<Void> deletePreRelationships(@PathVariable Long id) {
        log.debug("REST request to delete PreRelationships : {}", id);
        preRelationshipsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
