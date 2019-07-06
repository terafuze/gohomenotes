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
import com.terafuze.gohomenotes.service.StudentService;
import com.terafuze.gohomenotes.web.models.StudentModel;
import com.terafuze.gohomenotes.web.models.ParentModel;


/**
 * REST controller for managing Students.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"student-resource"})
public class StudentRestController {

    private final Logger log = LoggerFactory.getLogger(StudentRestController.class);

    private static final String ENTITY_NAME = "student";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentService studentService;

    public StudentRestController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * POST  /students : Create a Student.
     *
     * @param Student Model the Student Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new studentModel, or with status 400 (Bad Request) if the student has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/students")
    public ResponseEntity<StudentModel> createStudent(@Valid @RequestBody StudentModel studentModel) throws URISyntaxException {
        log.debug("REST request to save Student : {}", studentModel);
        if (studentModel.getId() != null) {
            throw new BadRequestAlertException("A new student cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentModel result = studentService.save(studentModel);
        return ResponseEntity.created(new URI("/api/students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /students : Updates an existing student.
     *
     * @param Student Model the Student Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated studentModel,
     * or with status 400 (Bad Request) if the Student Model is not valid,
     * or with status 500 (Internal Server Error) if the Student Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/students")
    public ResponseEntity<StudentModel> updateStudent(@Valid @RequestBody StudentModel studentModel) throws URISyntaxException {
        log.debug("REST request to update Student : {}", studentModel);
        if (studentModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentModel result = studentService.save(studentModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /students : get all Students.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of students in body
     */
    @GetMapping("/students")
    public List<StudentModel> getAllStudents() {
        log.debug("REST request to get all Students");
        return studentService.findAll();
    }

    
    /**
     * GET  /students/:id/parents : get all Parent for a given Student.
     *
     * @param id the id of an existing Student
     * @return a ResponseEntity with status 200 (OK) and with body of Parents for the Student or with status 404 if the Student does not exist for the given ID.
     */
    @GetMapping("/students/{id}/parents")
    public List<ParentModel> getParents(@PathVariable Long id) {
        log.debug("REST request to get all Parentses for Student : {}", id);
        return studentService.getParents(id);
    }

    
    /**
     * GET  /students/:id : get the Student for a given "id".
     *
     * @param id the id of an existing student
     * @return the ResponseEntity with status 200 (OK) and with body the Student Model, or with status 404 (Not Found)
     */
    @GetMapping("/students/{id}")
    public ResponseEntity<StudentModel> getStudent(@PathVariable Long id) {
        log.debug("REST request to get Student : {}", id);
        Optional<StudentModel> studentModel = studentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentModel);
    }

    /**
     * DELETE  /students/:id : delete the "id" student.
     *
     * @param id the id of the Student Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        log.debug("REST request to delete Student : {}", id);
        studentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
