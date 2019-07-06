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

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

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
    public ResponseEntity<StudentRegistrationModel> createStudentRegistration(@Valid @RequestBody StudentRegistrationModel studentRegistrationModel) throws URISyntaxException {
        log.debug("REST request to save StudentRegistration : {}", studentRegistrationModel);
        if (studentRegistrationModel.getId() != null) {
            throw new BadRequestAlertException("A new studentRegistration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentRegistrationModel result = studentRegistrationService.save(studentRegistrationModel);
        return ResponseEntity.created(new URI("/api/student-registrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
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
    public ResponseEntity<StudentRegistrationModel> updateStudentRegistration(@Valid @RequestBody StudentRegistrationModel studentRegistrationModel) throws URISyntaxException {
        log.debug("REST request to update StudentRegistration : {}", studentRegistrationModel);
        if (studentRegistrationModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentRegistrationModel result = studentRegistrationService.save(studentRegistrationModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentRegistrationModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /student-registrations : get all Student Registrations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of studentRegistrations in body
     */
    @GetMapping("/student-registrations")
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
    public ResponseEntity<Void> deleteStudentRegistration(@PathVariable Long id) {
        log.debug("REST request to delete StudentRegistration : {}", id);
        studentRegistrationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
