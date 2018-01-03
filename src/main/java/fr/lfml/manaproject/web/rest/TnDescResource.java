package fr.lfml.manaproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.lfml.manaproject.domain.TnDesc;

import fr.lfml.manaproject.repository.TnDescRepository;
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
 * REST controller for managing TnDesc.
 */
@RestController
@RequestMapping("/api")
public class TnDescResource {

    private final Logger log = LoggerFactory.getLogger(TnDescResource.class);

    private static final String ENTITY_NAME = "tnDesc";

    private final TnDescRepository tnDescRepository;

    public TnDescResource(TnDescRepository tnDescRepository) {
        this.tnDescRepository = tnDescRepository;
    }

    /**
     * POST  /tn-descs : Create a new tnDesc.
     *
     * @param tnDesc the tnDesc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tnDesc, or with status 400 (Bad Request) if the tnDesc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tn-descs")
    @Timed
    public ResponseEntity<TnDesc> createTnDesc(@Valid @RequestBody TnDesc tnDesc) throws URISyntaxException {
        log.debug("REST request to save TnDesc : {}", tnDesc);
        if (tnDesc.getId() != null) {
            throw new BadRequestAlertException("A new tnDesc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TnDesc result = tnDescRepository.save(tnDesc);
        return ResponseEntity.created(new URI("/api/tn-descs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tn-descs : Updates an existing tnDesc.
     *
     * @param tnDesc the tnDesc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tnDesc,
     * or with status 400 (Bad Request) if the tnDesc is not valid,
     * or with status 500 (Internal Server Error) if the tnDesc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tn-descs")
    @Timed
    public ResponseEntity<TnDesc> updateTnDesc(@Valid @RequestBody TnDesc tnDesc) throws URISyntaxException {
        log.debug("REST request to update TnDesc : {}", tnDesc);
        if (tnDesc.getId() == null) {
            return createTnDesc(tnDesc);
        }
        TnDesc result = tnDescRepository.save(tnDesc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tnDesc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tn-descs : get all the tnDescs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tnDescs in body
     */
    @GetMapping("/tn-descs")
    @Timed
    public List<TnDesc> getAllTnDescs() {
        log.debug("REST request to get all TnDescs");
        return tnDescRepository.findAll();
        }

    /**
     * GET  /tn-descs/:id : get the "id" tnDesc.
     *
     * @param id the id of the tnDesc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tnDesc, or with status 404 (Not Found)
     */
    @GetMapping("/tn-descs/{id}")
    @Timed
    public ResponseEntity<TnDesc> getTnDesc(@PathVariable Long id) {
        log.debug("REST request to get TnDesc : {}", id);
        TnDesc tnDesc = tnDescRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tnDesc));
    }

    /**
     * DELETE  /tn-descs/:id : delete the "id" tnDesc.
     *
     * @param id the id of the tnDesc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tn-descs/{id}")
    @Timed
    public ResponseEntity<Void> deleteTnDesc(@PathVariable Long id) {
        log.debug("REST request to delete TnDesc : {}", id);
        tnDescRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
