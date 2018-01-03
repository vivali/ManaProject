package fr.lfml.manaproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.lfml.manaproject.domain.FnDesc;

import fr.lfml.manaproject.repository.FnDescRepository;
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
 * REST controller for managing FnDesc.
 */
@RestController
@RequestMapping("/api")
public class FnDescResource {

    private final Logger log = LoggerFactory.getLogger(FnDescResource.class);

    private static final String ENTITY_NAME = "fnDesc";

    private final FnDescRepository fnDescRepository;

    public FnDescResource(FnDescRepository fnDescRepository) {
        this.fnDescRepository = fnDescRepository;
    }

    /**
     * POST  /fn-descs : Create a new fnDesc.
     *
     * @param fnDesc the fnDesc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fnDesc, or with status 400 (Bad Request) if the fnDesc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fn-descs")
    @Timed
    public ResponseEntity<FnDesc> createFnDesc(@Valid @RequestBody FnDesc fnDesc) throws URISyntaxException {
        log.debug("REST request to save FnDesc : {}", fnDesc);
        if (fnDesc.getId() != null) {
            throw new BadRequestAlertException("A new fnDesc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FnDesc result = fnDescRepository.save(fnDesc);
        return ResponseEntity.created(new URI("/api/fn-descs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fn-descs : Updates an existing fnDesc.
     *
     * @param fnDesc the fnDesc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fnDesc,
     * or with status 400 (Bad Request) if the fnDesc is not valid,
     * or with status 500 (Internal Server Error) if the fnDesc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fn-descs")
    @Timed
    public ResponseEntity<FnDesc> updateFnDesc(@Valid @RequestBody FnDesc fnDesc) throws URISyntaxException {
        log.debug("REST request to update FnDesc : {}", fnDesc);
        if (fnDesc.getId() == null) {
            return createFnDesc(fnDesc);
        }
        FnDesc result = fnDescRepository.save(fnDesc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fnDesc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fn-descs : get all the fnDescs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fnDescs in body
     */
    @GetMapping("/fn-descs")
    @Timed
    public List<FnDesc> getAllFnDescs() {
        log.debug("REST request to get all FnDescs");
        return fnDescRepository.findAll();
        }

    /**
     * GET  /fn-descs/:id : get the "id" fnDesc.
     *
     * @param id the id of the fnDesc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fnDesc, or with status 404 (Not Found)
     */
    @GetMapping("/fn-descs/{id}")
    @Timed
    public ResponseEntity<FnDesc> getFnDesc(@PathVariable Long id) {
        log.debug("REST request to get FnDesc : {}", id);
        FnDesc fnDesc = fnDescRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fnDesc));
    }

    /**
     * DELETE  /fn-descs/:id : delete the "id" fnDesc.
     *
     * @param id the id of the fnDesc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fn-descs/{id}")
    @Timed
    public ResponseEntity<Void> deleteFnDesc(@PathVariable Long id) {
        log.debug("REST request to delete FnDesc : {}", id);
        fnDescRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
