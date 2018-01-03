package fr.lfml.manaproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.lfml.manaproject.domain.FuncNeed;

import fr.lfml.manaproject.repository.FuncNeedRepository;
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
 * REST controller for managing FuncNeed.
 */
@RestController
@RequestMapping("/api")
public class FuncNeedResource {

    private final Logger log = LoggerFactory.getLogger(FuncNeedResource.class);

    private static final String ENTITY_NAME = "funcNeed";

    private final FuncNeedRepository funcNeedRepository;

    public FuncNeedResource(FuncNeedRepository funcNeedRepository) {
        this.funcNeedRepository = funcNeedRepository;
    }

    /**
     * POST  /func-needs : Create a new funcNeed.
     *
     * @param funcNeed the funcNeed to create
     * @return the ResponseEntity with status 201 (Created) and with body the new funcNeed, or with status 400 (Bad Request) if the funcNeed has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/func-needs")
    @Timed
    public ResponseEntity<FuncNeed> createFuncNeed(@Valid @RequestBody FuncNeed funcNeed) throws URISyntaxException {
        log.debug("REST request to save FuncNeed : {}", funcNeed);
        if (funcNeed.getId() != null) {
            throw new BadRequestAlertException("A new funcNeed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FuncNeed result = funcNeedRepository.save(funcNeed);
        return ResponseEntity.created(new URI("/api/func-needs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /func-needs : Updates an existing funcNeed.
     *
     * @param funcNeed the funcNeed to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated funcNeed,
     * or with status 400 (Bad Request) if the funcNeed is not valid,
     * or with status 500 (Internal Server Error) if the funcNeed couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/func-needs")
    @Timed
    public ResponseEntity<FuncNeed> updateFuncNeed(@Valid @RequestBody FuncNeed funcNeed) throws URISyntaxException {
        log.debug("REST request to update FuncNeed : {}", funcNeed);
        if (funcNeed.getId() == null) {
            return createFuncNeed(funcNeed);
        }
        FuncNeed result = funcNeedRepository.save(funcNeed);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, funcNeed.getId().toString()))
            .body(result);
    }

    /**
     * GET  /func-needs : get all the funcNeeds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of funcNeeds in body
     */
    @GetMapping("/func-needs")
    @Timed
    public List<FuncNeed> getAllFuncNeeds() {
        log.debug("REST request to get all FuncNeeds");
        return funcNeedRepository.findAll();
        }

    /**
     * GET  /func-needs/:id : get the "id" funcNeed.
     *
     * @param id the id of the funcNeed to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the funcNeed, or with status 404 (Not Found)
     */
    @GetMapping("/func-needs/{id}")
    @Timed
    public ResponseEntity<FuncNeed> getFuncNeed(@PathVariable Long id) {
        log.debug("REST request to get FuncNeed : {}", id);
        FuncNeed funcNeed = funcNeedRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(funcNeed));
    }

    /**
     * DELETE  /func-needs/:id : delete the "id" funcNeed.
     *
     * @param id the id of the funcNeed to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/func-needs/{id}")
    @Timed
    public ResponseEntity<Void> deleteFuncNeed(@PathVariable Long id) {
        log.debug("REST request to delete FuncNeed : {}", id);
        funcNeedRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
