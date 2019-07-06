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
import com.terafuze.gohomenotes.service.SchoolGradeService;
import com.terafuze.gohomenotes.web.models.SchoolGradeModel;


/**
 * REST controller for managing School Grades.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"school-grade-resource"})
public class SchoolGradeRestController {

    private final Logger log = LoggerFactory.getLogger(SchoolGradeRestController.class);

    private static final String ENTITY_NAME = "schoolGrade";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SchoolGradeService schoolGradeService;

    public SchoolGradeRestController(SchoolGradeService schoolGradeService) {
        this.schoolGradeService = schoolGradeService;
    }

    /**
     * POST  /school-grades : Create a School Grade.
     *
     * @param School Grade Model the School Grade Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new schoolGradeModel, or with status 400 (Bad Request) if the schoolGrade has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/school-grades")
    public ResponseEntity<SchoolGradeModel> createSchoolGrade(@Valid @RequestBody SchoolGradeModel schoolGradeModel) throws URISyntaxException {
        log.debug("REST request to save SchoolGrade : {}", schoolGradeModel);
        if (schoolGradeModel.getId() != null) {
            throw new BadRequestAlertException("A new schoolGrade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchoolGradeModel result = schoolGradeService.save(schoolGradeModel);
        return ResponseEntity.created(new URI("/api/school-grades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /school-grades : Updates an existing schoolGrade.
     *
     * @param School Grade Model the School Grade Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated schoolGradeModel,
     * or with status 400 (Bad Request) if the School Grade Model is not valid,
     * or with status 500 (Internal Server Error) if the School Grade Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/school-grades")
    public ResponseEntity<SchoolGradeModel> updateSchoolGrade(@Valid @RequestBody SchoolGradeModel schoolGradeModel) throws URISyntaxException {
        log.debug("REST request to update SchoolGrade : {}", schoolGradeModel);
        if (schoolGradeModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SchoolGradeModel result = schoolGradeService.save(schoolGradeModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, schoolGradeModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /school-grades : get all School Grades.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of schoolGrades in body
     */
    @GetMapping("/school-grades")
    public List<SchoolGradeModel> getAllSchoolGrades() {
        log.debug("REST request to get all SchoolGrades");
        return schoolGradeService.findAll();
    }

    
    /**
     * GET  /school-grades/:id : get the School Grade for a given "id".
     *
     * @param id the id of an existing schoolGrade
     * @return the ResponseEntity with status 200 (OK) and with body the School Grade Model, or with status 404 (Not Found)
     */
    @GetMapping("/school-grades/{id}")
    public ResponseEntity<SchoolGradeModel> getSchoolGrade(@PathVariable Long id) {
        log.debug("REST request to get SchoolGrade : {}", id);
        Optional<SchoolGradeModel> schoolGradeModel = schoolGradeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(schoolGradeModel);
    }

    /**
     * DELETE  /school-grades/:id : delete the "id" schoolGrade.
     *
     * @param id the id of the School Grade Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/school-grades/{id}")
    public ResponseEntity<Void> deleteSchoolGrade(@PathVariable Long id) {
        log.debug("REST request to delete SchoolGrade : {}", id);
        schoolGradeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
