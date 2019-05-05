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

import com.terafuze.gohomenotes.service.AfterSchoolProgramService;
import com.terafuze.gohomenotes.web.models.AfterSchoolProgramModel;


/**
 * REST controller for managing After School Programs.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"after-school-program-resource"})
public class AfterSchoolProgramRestController {

    private final Logger log = LoggerFactory.getLogger(AfterSchoolProgramRestController.class);

    private static final String ENTITY_NAME = "afterSchoolProgram";

    private final AfterSchoolProgramService afterSchoolProgramService;

    public AfterSchoolProgramRestController(AfterSchoolProgramService afterSchoolProgramService) {
        this.afterSchoolProgramService = afterSchoolProgramService;
    }

    /**
     * POST  /after-school-programs : Create a After School Program.
     *
     * @param After School Program Model the After School Program Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new afterSchoolProgramModel, or with status 400 (Bad Request) if the afterSchoolProgram has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/after-school-programs")
    @Timed
    public ResponseEntity<AfterSchoolProgramModel> createAfterSchoolProgram(@Valid @RequestBody AfterSchoolProgramModel afterSchoolProgramModel) throws URISyntaxException {
        log.debug("REST request to save AfterSchoolProgram : {}", afterSchoolProgramModel);
        if (afterSchoolProgramModel.getId() != null) {
            throw new BadRequestAlertException("A new afterSchoolProgram cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AfterSchoolProgramModel result = afterSchoolProgramService.save(afterSchoolProgramModel);
        return ResponseEntity.created(new URI("/api/after-school-programs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /after-school-programs : Updates an existing afterSchoolProgram.
     *
     * @param After School Program Model the After School Program Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated afterSchoolProgramModel,
     * or with status 400 (Bad Request) if the After School Program Model is not valid,
     * or with status 500 (Internal Server Error) if the After School Program Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/after-school-programs")
    @Timed
    public ResponseEntity<AfterSchoolProgramModel> updateAfterSchoolProgram(@Valid @RequestBody AfterSchoolProgramModel afterSchoolProgramModel) throws URISyntaxException {
        log.debug("REST request to update AfterSchoolProgram : {}", afterSchoolProgramModel);
        if (afterSchoolProgramModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AfterSchoolProgramModel result = afterSchoolProgramService.save(afterSchoolProgramModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, afterSchoolProgramModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /after-school-programs : get all After School Programs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of afterSchoolPrograms in body
     */
    @GetMapping("/after-school-programs")
    @Timed
    public List<AfterSchoolProgramModel> getAllAfterSchoolPrograms() {
        log.debug("REST request to get all AfterSchoolPrograms");
        return afterSchoolProgramService.findAll();
    }

    

    /**
     * GET  /after-school-programs/:id : get the After School Program for a given "id".
     *
     * @param id the id of an existing afterSchoolProgram
     * @return the ResponseEntity with status 200 (OK) and with body the After School Program Model, or with status 404 (Not Found)
     */
    @GetMapping("/after-school-programs/{id}")
    @Timed
    public ResponseEntity<AfterSchoolProgramModel> getAfterSchoolProgram(@PathVariable Long id) {
        log.debug("REST request to get AfterSchoolProgram : {}", id);
        Optional<AfterSchoolProgramModel> afterSchoolProgramModel = afterSchoolProgramService.findOne(id);
        return ResponseUtil.wrapOrNotFound(afterSchoolProgramModel);
    }

    /**
     * DELETE  /after-school-programs/:id : delete the "id" afterSchoolProgram.
     *
     * @param id the id of the After School Program Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/after-school-programs/{id}")
    @Timed
    public ResponseEntity<Void> deleteAfterSchoolProgram(@PathVariable Long id) {
        log.debug("REST request to delete AfterSchoolProgram : {}", id);
        afterSchoolProgramService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
