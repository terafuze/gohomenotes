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

import com.terafuze.gohomenotes.service.StudentRegistrationService;
import com.terafuze.gohomenotes.web.models.StudentRegistrationModel;


/**
 * REST controller for managing Student Registrations.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"student-registration-resource"})
public class StudentRegistrationRestController {

    private final Logger log = LoggerFactory.getLogger(StudentRegistrationRestController.class);

    private static final String ENTITY_NAME = "studentRegistration";

    private final StudentRegistrationService studentRegistrationService;

    public StudentRegistrationRestController(StudentRegistrationService studentRegistrationService) {
        this.studentRegistrationService = studentRegistrationService;
    }

    /**
     * POST  /student-registrations : Create a Student Registration.
     *
     * @param Student Registration Model the Student Registration Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new studentRegistrationModel, or with status 400 (Bad Request) if the studentRegistration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/student-registrations")
    @Timed
    public ResponseEntity<StudentRegistrationModel> createStudentRegistration(@Valid @RequestBody StudentRegistrationModel studentRegistrationModel) throws URISyntaxException {
        log.debug("REST request to save StudentRegistration : {}", studentRegistrationModel);
        if (studentRegistrationModel.getId() != null) {
            throw new BadRequestAlertException("A new studentRegistration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentRegistrationModel result = studentRegistrationService.save(studentRegistrationModel);
        return ResponseEntity.created(new URI("/api/student-registrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /student-registrations : Updates an existing studentRegistration.
     *
     * @param Student Registration Model the Student Registration Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated studentRegistrationModel,
     * or with status 400 (Bad Request) if the Student Registration Model is not valid,
     * or with status 500 (Internal Server Error) if the Student Registration Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/student-registrations")
    @Timed
    public ResponseEntity<StudentRegistrationModel> updateStudentRegistration(@Valid @RequestBody StudentRegistrationModel studentRegistrationModel) throws URISyntaxException {
        log.debug("REST request to update StudentRegistration : {}", studentRegistrationModel);
        if (studentRegistrationModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentRegistrationModel result = studentRegistrationService.save(studentRegistrationModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, studentRegistrationModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /student-registrations : get all Student Registrations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of studentRegistrations in body
     */
    @GetMapping("/student-registrations")
    @Timed
    public List<StudentRegistrationModel> getAllStudentRegistrations() {
        log.debug("REST request to get all StudentRegistrations");
        return studentRegistrationService.findAll();
    }

    
    /**
     * GET  /student-registrations/:id : get the Student Registration for a given "id".
     *
     * @param id the id of an existing studentRegistration
     * @return the ResponseEntity with status 200 (OK) and with body the Student Registration Model, or with status 404 (Not Found)
     */
    @GetMapping("/student-registrations/{id}")
    @Timed
    public ResponseEntity<StudentRegistrationModel> getStudentRegistration(@PathVariable Long id) {
        log.debug("REST request to get StudentRegistration : {}", id);
        Optional<StudentRegistrationModel> studentRegistrationModel = studentRegistrationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentRegistrationModel);
    }

    /**
     * DELETE  /student-registrations/:id : delete the "id" studentRegistration.
     *
     * @param id the id of the Student Registration Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/student-registrations/{id}")
    @Timed
    public ResponseEntity<Void> deleteStudentRegistration(@PathVariable Long id) {
        log.debug("REST request to delete StudentRegistration : {}", id);
        studentRegistrationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
