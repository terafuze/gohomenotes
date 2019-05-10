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

import com.terafuze.gohomenotes.service.TeacherService;
import com.terafuze.gohomenotes.web.models.TeacherModel;


/**
 * REST controller for managing Teachers.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"teacher-resource"})
public class TeacherRestController {

    private final Logger log = LoggerFactory.getLogger(TeacherRestController.class);

    private static final String ENTITY_NAME = "teacher";

    private final TeacherService teacherService;

    public TeacherRestController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    /**
     * POST  /teachers : Create a Teacher.
     *
     * @param Teacher Model the Teacher Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teacherModel, or with status 400 (Bad Request) if the teacher has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teachers")
    @Timed
    public ResponseEntity<TeacherModel> createTeacher(@Valid @RequestBody TeacherModel teacherModel) throws URISyntaxException {
        log.debug("REST request to save Teacher : {}", teacherModel);
        if (teacherModel.getId() != null) {
            throw new BadRequestAlertException("A new teacher cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeacherModel result = teacherService.save(teacherModel);
        return ResponseEntity.created(new URI("/api/teachers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teachers : Updates an existing teacher.
     *
     * @param Teacher Model the Teacher Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teacherModel,
     * or with status 400 (Bad Request) if the Teacher Model is not valid,
     * or with status 500 (Internal Server Error) if the Teacher Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teachers")
    @Timed
    public ResponseEntity<TeacherModel> updateTeacher(@Valid @RequestBody TeacherModel teacherModel) throws URISyntaxException {
        log.debug("REST request to update Teacher : {}", teacherModel);
        if (teacherModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TeacherModel result = teacherService.save(teacherModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teacherModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /teachers : get all Teachers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of teachers in body
     */
    @GetMapping("/teachers")
    @Timed
    public List<TeacherModel> getAllTeachers() {
        log.debug("REST request to get all Teachers");
        return teacherService.findAll();
    }

    
    /**
     * GET  /teachers/:id : get the Teacher for a given "id".
     *
     * @param id the id of an existing teacher
     * @return the ResponseEntity with status 200 (OK) and with body the Teacher Model, or with status 404 (Not Found)
     */
    @GetMapping("/teachers/{id}")
    @Timed
    public ResponseEntity<TeacherModel> getTeacher(@PathVariable Long id) {
        log.debug("REST request to get Teacher : {}", id);
        Optional<TeacherModel> teacherModel = teacherService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teacherModel);
    }

    /**
     * DELETE  /teachers/:id : delete the "id" teacher.
     *
     * @param id the id of the Teacher Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teachers/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        log.debug("REST request to delete Teacher : {}", id);
        teacherService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
