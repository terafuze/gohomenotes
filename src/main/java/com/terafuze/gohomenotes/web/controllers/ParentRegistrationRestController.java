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

import com.terafuze.gohomenotes.service.ParentRegistrationService;
import com.terafuze.gohomenotes.web.models.ParentRegistrationModel;


/**
 * REST controller for managing Parent Registrations.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"parent-registration-resource"})
public class ParentRegistrationRestController {

    private final Logger log = LoggerFactory.getLogger(ParentRegistrationRestController.class);

    private static final String ENTITY_NAME = "parentRegistration";

    private final ParentRegistrationService parentRegistrationService;

    public ParentRegistrationRestController(ParentRegistrationService parentRegistrationService) {
        this.parentRegistrationService = parentRegistrationService;
    }

    /**
     * POST  /parent-registrations : Create a Parent Registration.
     *
     * @param Parent Registration Model the Parent Registration Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parentRegistrationModel, or with status 400 (Bad Request) if the parentRegistration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parent-registrations")
    @Timed
    public ResponseEntity<ParentRegistrationModel> createParentRegistration(@Valid @RequestBody ParentRegistrationModel parentRegistrationModel) throws URISyntaxException {
        log.debug("REST request to save ParentRegistration : {}", parentRegistrationModel);
        if (parentRegistrationModel.getId() != null) {
            throw new BadRequestAlertException("A new parentRegistration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParentRegistrationModel result = parentRegistrationService.save(parentRegistrationModel);
        return ResponseEntity.created(new URI("/api/parent-registrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parent-registrations : Updates an existing parentRegistration.
     *
     * @param Parent Registration Model the Parent Registration Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parentRegistrationModel,
     * or with status 400 (Bad Request) if the Parent Registration Model is not valid,
     * or with status 500 (Internal Server Error) if the Parent Registration Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parent-registrations")
    @Timed
    public ResponseEntity<ParentRegistrationModel> updateParentRegistration(@Valid @RequestBody ParentRegistrationModel parentRegistrationModel) throws URISyntaxException {
        log.debug("REST request to update ParentRegistration : {}", parentRegistrationModel);
        if (parentRegistrationModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParentRegistrationModel result = parentRegistrationService.save(parentRegistrationModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parentRegistrationModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parent-registrations : get all Parent Registrations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parentRegistrations in body
     */
    @GetMapping("/parent-registrations")
    @Timed
    public List<ParentRegistrationModel> getAllParentRegistrations() {
        log.debug("REST request to get all ParentRegistrations");
        return parentRegistrationService.findAll();
    }

    
    /**
     * GET  /parent-registrations/:id : get the Parent Registration for a given "id".
     *
     * @param id the id of an existing parentRegistration
     * @return the ResponseEntity with status 200 (OK) and with body the Parent Registration Model, or with status 404 (Not Found)
     */
    @GetMapping("/parent-registrations/{id}")
    @Timed
    public ResponseEntity<ParentRegistrationModel> getParentRegistration(@PathVariable Long id) {
        log.debug("REST request to get ParentRegistration : {}", id);
        Optional<ParentRegistrationModel> parentRegistrationModel = parentRegistrationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parentRegistrationModel);
    }

    /**
     * DELETE  /parent-registrations/:id : delete the "id" parentRegistration.
     *
     * @param id the id of the Parent Registration Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parent-registrations/{id}")
    @Timed
    public ResponseEntity<Void> deleteParentRegistration(@PathVariable Long id) {
        log.debug("REST request to delete ParentRegistration : {}", id);
        parentRegistrationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
