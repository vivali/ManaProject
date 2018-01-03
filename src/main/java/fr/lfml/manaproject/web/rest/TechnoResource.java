package fr.lfml.manaproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.lfml.manaproject.domain.Techno;

import fr.lfml.manaproject.repository.TechnoRepository;
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
 * REST controller for managing Techno.
 */
@RestController
@RequestMapping("/api")
public class TechnoResource {

    private final Logger log = LoggerFactory.getLogger(TechnoResource.class);

    private static final String ENTITY_NAME = "techno";

    private final TechnoRepository technoRepository;

    public TechnoResource(TechnoRepository technoRepository) {
        this.technoRepository = technoRepository;
    }

    /**
     * POST  /technos : Create a new techno.
     *
     * @param techno the techno to create
     * @return the ResponseEntity with status 201 (Created) and with body the new techno, or with status 400 (Bad Request) if the techno has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/technos")
    @Timed
    public ResponseEntity<Techno> createTechno(@Valid @RequestBody Techno techno) throws URISyntaxException {
        log.debug("REST request to save Techno : {}", techno);
        if (techno.getId() != null) {
            throw new BadRequestAlertException("A new techno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Techno result = technoRepository.save(techno);
        return ResponseEntity.created(new URI("/api/technos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /technos : Updates an existing techno.
     *
     * @param techno the techno to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated techno,
     * or with status 400 (Bad Request) if the techno is not valid,
     * or with status 500 (Internal Server Error) if the techno couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/technos")
    @Timed
    public ResponseEntity<Techno> updateTechno(@Valid @RequestBody Techno techno) throws URISyntaxException {
        log.debug("REST request to update Techno : {}", techno);
        if (techno.getId() == null) {
            return createTechno(techno);
        }
        Techno result = technoRepository.save(techno);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, techno.getId().toString()))
            .body(result);
    }

    /**
     * GET  /technos : get all the technos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of technos in body
     */
    @GetMapping("/technos")
    @Timed
    public List<Techno> getAllTechnos() {
        log.debug("REST request to get all Technos");
        return technoRepository.findAll();
        }

    /**
     * GET  /technos/:id : get the "id" techno.
     *
     * @param id the id of the techno to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the techno, or with status 404 (Not Found)
     */
    @GetMapping("/technos/{id}")
    @Timed
    public ResponseEntity<Techno> getTechno(@PathVariable Long id) {
        log.debug("REST request to get Techno : {}", id);
        Techno techno = technoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(techno));
    }

    /**
     * DELETE  /technos/:id : delete the "id" techno.
     *
     * @param id the id of the techno to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/technos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTechno(@PathVariable Long id) {
        log.debug("REST request to delete Techno : {}", id);
        technoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
