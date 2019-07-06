package com.terafuze.gohomenotes.web.controllers;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.micrometer.core.annotation.Timed;
import io.swagger.annotations.Api;

import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.service.FamilyRegistrationService;
import com.terafuze.gohomenotes.web.models.FamilyRegistrationModel;
import com.terafuze.gohomenotes.web.models.ParentRegistrationModel;
import com.terafuze.gohomenotes.web.models.StudentRegistrationModel;


/**
 * REST controller for managing Family Registrations.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"family-registration-resource"})
public class FamilyRegistrationRestController {

    private final Logger log = LoggerFactory.getLogger(FamilyRegistrationRestController.class);

    private static final String ENTITY_NAME = "familyRegistration";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FamilyRegistrationService familyRegistrationService;

    public FamilyRegistrationRestController(FamilyRegistrationService familyRegistrationService) {
        this.familyRegistrationService = familyRegistrationService;
    }

    /**
     * POST  /family-registrations : Create a Family Registration.
     *
     * @param Family Registration Model the Family Registration Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new familyRegistrationModel, or with status 400 (Bad Request) if the familyRegistration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/family-registrations")
    public ResponseEntity<FamilyRegistrationModel> createFamilyRegistration(@Valid @RequestBody FamilyRegistrationModel familyRegistrationModel) throws URISyntaxException {
        log.debug("REST request to save FamilyRegistration : {}", familyRegistrationModel);
        if (familyRegistrationModel.getId() != null) {
            throw new BadRequestAlertException("A new familyRegistration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FamilyRegistrationModel result = familyRegistrationService.save(familyRegistrationModel);
        return ResponseEntity.created(new URI("/api/family-registrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /family-registrations : Updates an existing familyRegistration.
     *
     * @param Family Registration Model the Family Registration Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated familyRegistrationModel,
     * or with status 400 (Bad Request) if the Family Registration Model is not valid,
     * or with status 500 (Internal Server Error) if the Family Registration Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/family-registrations")
    public ResponseEntity<FamilyRegistrationModel> updateFamilyRegistration(@Valid @RequestBody FamilyRegistrationModel familyRegistrationModel) throws URISyntaxException {
        log.debug("REST request to update FamilyRegistration : {}", familyRegistrationModel);
        if (familyRegistrationModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FamilyRegistrationModel result = familyRegistrationService.save(familyRegistrationModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, familyRegistrationModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /family-registrations : get all Family Registrations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of familyRegistrations in body
     */
    @GetMapping("/family-registrations")
    public List<FamilyRegistrationModel> getAllFamilyRegistrations() {
        log.debug("REST request to get all FamilyRegistrations");
        return familyRegistrationService.findAll();
    }

    
    /**
     * GET  /family-registrations/:id/parent-registrations : get all Parent Registration for a given Family Registration.
     *
     * @param id the id of an existing Family Registration
     * @return a ResponseEntity with status 200 (OK) and with body of Parent Registrations for the Family Registration or with status 404 if the Family Registration does not exist for the given ID.
     */
    @GetMapping("/family-registrations/{id}/parent-registrations")
    public List<ParentRegistrationModel> getParentRegistrations(@PathVariable Long id) {
        log.debug("REST request to get all Parent Registrationses for FamilyRegistration : {}", id);
        return familyRegistrationService.getParentRegistrations(id);
    }

    
    /**
     * GET  /family-registrations/:id/student-registrations : get all Student Registration for a given Family Registration.
     *
     * @param id the id of an existing Family Registration
     * @return a ResponseEntity with status 200 (OK) and with body of Student Registrations for the Family Registration or with status 404 if the Family Registration does not exist for the given ID.
     */
    @GetMapping("/family-registrations/{id}/student-registrations")
    public List<StudentRegistrationModel> getStudentRegistrations(@PathVariable Long id) {
        log.debug("REST request to get all Student Registrationses for FamilyRegistration : {}", id);
        return familyRegistrationService.getStudentRegistrations(id);
    }

    
    /**
     * GET  /family-registrations/:id : get the Family Registration for a given "id".
     *
     * @param id the id of an existing familyRegistration
     * @return the ResponseEntity with status 200 (OK) and with body the Family Registration Model, or with status 404 (Not Found)
     */
    @GetMapping("/family-registrations/{id}")
    public ResponseEntity<FamilyRegistrationModel> getFamilyRegistration(@PathVariable Long id) {
        log.debug("REST request to get FamilyRegistration : {}", id);
        Optional<FamilyRegistrationModel> familyRegistrationModel = familyRegistrationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(familyRegistrationModel);
    }

    /**
     * DELETE  /family-registrations/:id : delete the "id" familyRegistration.
     *
     * @param id the id of the Family Registration Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/family-registrations/{id}")
    public ResponseEntity<Void> deleteFamilyRegistration(@PathVariable Long id) {
        log.debug("REST request to delete FamilyRegistration : {}", id);
        familyRegistrationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
