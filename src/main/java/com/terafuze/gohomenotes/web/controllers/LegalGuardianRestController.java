package com.terafuze.gohomenotes.web.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.Api;
import io.github.jhipster.web.util.ResponseUtil;

import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.web.utils.HeaderUtil;

import com.terafuze.gohomenotes.service.LegalGuardianService;
import com.terafuze.gohomenotes.web.models.LegalGuardianModel;


/**
 * REST controller for managing Legal Guardians.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"legal-guardian-resource"})
public class LegalGuardianRestController {

    private final Logger log = LoggerFactory.getLogger(LegalGuardianRestController.class);

    private static final String ENTITY_NAME = "legalGuardian";

    private final LegalGuardianService legalGuardianService;

    public LegalGuardianRestController(LegalGuardianService legalGuardianService) {
        this.legalGuardianService = legalGuardianService;
    }

    /**
     * POST  /legal-guardians : Create a Legal Guardian.
     *
     * @param Legal Guardian Model the Legal Guardian Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new legalGuardianModel, or with status 400 (Bad Request) if the legalGuardian has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/legal-guardians")
    @Timed
    public ResponseEntity<LegalGuardianModel> createLegalGuardian(@Valid @RequestBody LegalGuardianModel legalGuardianModel) throws URISyntaxException {
        log.debug("REST request to save LegalGuardian : {}", legalGuardianModel);
        if (legalGuardianModel.getId() != null) {
            throw new BadRequestAlertException("A new legalGuardian cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LegalGuardianModel result = legalGuardianService.save(legalGuardianModel);
        return ResponseEntity.created(new URI("/api/legal-guardians/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /legal-guardians : Updates an existing legalGuardian.
     *
     * @param Legal Guardian Model the Legal Guardian Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated legalGuardianModel,
     * or with status 400 (Bad Request) if the Legal Guardian Model is not valid,
     * or with status 500 (Internal Server Error) if the Legal Guardian Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/legal-guardians")
    @Timed
    public ResponseEntity<LegalGuardianModel> updateLegalGuardian(@Valid @RequestBody LegalGuardianModel legalGuardianModel) throws URISyntaxException {
        log.debug("REST request to update LegalGuardian : {}", legalGuardianModel);
        if (legalGuardianModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LegalGuardianModel result = legalGuardianService.save(legalGuardianModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, legalGuardianModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /legal-guardians : get all Legal Guardians.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of legalGuardians in body
     */
    @GetMapping("/legal-guardians")
    @Timed
    public List<LegalGuardianModel> getAllLegalGuardians() {
        log.debug("REST request to get all LegalGuardians");
        return legalGuardianService.findAll();
    }

    

    /**
     * GET  /legal-guardians/:id : get the Legal Guardian for a given "id".
     *
     * @param id the id of an existing legalGuardian
     * @return the ResponseEntity with status 200 (OK) and with body the Legal Guardian Model, or with status 404 (Not Found)
     */
    @GetMapping("/legal-guardians/{id}")
    @Timed
    public ResponseEntity<LegalGuardianModel> getLegalGuardian(@PathVariable Long id) {
        log.debug("REST request to get LegalGuardian : {}", id);
        Optional<LegalGuardianModel> legalGuardianModel = legalGuardianService.findOne(id);
        return ResponseUtil.wrapOrNotFound(legalGuardianModel);
    }

    /**
     * DELETE  /legal-guardians/:id : delete the "id" legalGuardian.
     *
     * @param id the id of the Legal Guardian Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/legal-guardians/{id}")
    @Timed
    public ResponseEntity<Void> deleteLegalGuardian(@PathVariable Long id) {
        log.debug("REST request to delete LegalGuardian : {}", id);
        legalGuardianService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
