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

import com.terafuze.gohomenotes.service.FamilyService;
import com.terafuze.gohomenotes.web.models.FamilyModel;
import com.terafuze.gohomenotes.web.models.StudentModel;
import com.terafuze.gohomenotes.web.models.ParentModel;


/**
 * REST controller for managing Families.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"family-resource"})
public class FamilyRestController {

    private final Logger log = LoggerFactory.getLogger(FamilyRestController.class);

    private static final String ENTITY_NAME = "family";

    private final FamilyService familyService;

    public FamilyRestController(FamilyService familyService) {
        this.familyService = familyService;
    }

    /**
     * POST  /families : Create a Family.
     *
     * @param Family Model the Family Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new familyModel, or with status 400 (Bad Request) if the family has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/families")
    @Timed
    public ResponseEntity<FamilyModel> createFamily(@Valid @RequestBody FamilyModel familyModel) throws URISyntaxException {
        log.debug("REST request to save Family : {}", familyModel);
        if (familyModel.getId() != null) {
            throw new BadRequestAlertException("A new family cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FamilyModel result = familyService.save(familyModel);
        return ResponseEntity.created(new URI("/api/families/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /families : Updates an existing family.
     *
     * @param Family Model the Family Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated familyModel,
     * or with status 400 (Bad Request) if the Family Model is not valid,
     * or with status 500 (Internal Server Error) if the Family Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/families")
    @Timed
    public ResponseEntity<FamilyModel> updateFamily(@Valid @RequestBody FamilyModel familyModel) throws URISyntaxException {
        log.debug("REST request to update Family : {}", familyModel);
        if (familyModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FamilyModel result = familyService.save(familyModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, familyModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /families : get all Familys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of familys in body
     */
    @GetMapping("/families")
    @Timed
    public List<FamilyModel> getAllFamilys() {
        log.debug("REST request to get all Familys");
        return familyService.findAll();
    }

    /**
     * GET  /families/:id/students : get all Student for a given Family.
     *
     * @param id the id of an existing Family
     * @return a ResponseEntity with status 200 (OK) and with body of Students for the Family or with status 404 if the Family does not exist for the given ID.
     */
    @GetMapping("/families/{id}/students")
    @Timed
    public List<StudentModel> getStudents(@PathVariable Long id) {
        log.debug("REST request to get all Childrens for Family : {}", id);
        return familyService.getStudents(id);
    }/**
     * GET  /families/:id/parents : get all Parent for a given Family.
     *
     * @param id the id of an existing Family
     * @return a ResponseEntity with status 200 (OK) and with body of Parents for the Family or with status 404 if the Family does not exist for the given ID.
     */
    @GetMapping("/families/{id}/parents")
    @Timed
    public List<ParentModel> getParents(@PathVariable Long id) {
        log.debug("REST request to get all Parents for Family : {}", id);
        return familyService.getParents(id);
    }
    /**
     * GET  /families/:id : get the Family for a given "id".
     *
     * @param id the id of an existing family
     * @return the ResponseEntity with status 200 (OK) and with body the Family Model, or with status 404 (Not Found)
     */
    @GetMapping("/families/{id}")
    @Timed
    public ResponseEntity<FamilyModel> getFamily(@PathVariable Long id) {
        log.debug("REST request to get Family : {}", id);
        Optional<FamilyModel> familyModel = familyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(familyModel);
    }

    /**
     * DELETE  /families/:id : delete the "id" family.
     *
     * @param id the id of the Family Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/families/{id}")
    @Timed
    public ResponseEntity<Void> deleteFamily(@PathVariable Long id) {
        log.debug("REST request to delete Family : {}", id);
        familyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
