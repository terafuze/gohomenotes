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

import com.terafuze.gohomenotes.service.SchoolService;
import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.web.models.AfterSchoolProgramModel;
import com.terafuze.gohomenotes.web.models.DismissalLocationModel;
import com.terafuze.gohomenotes.web.models.SchoolGradeModel;
import com.terafuze.gohomenotes.web.models.SchoolModel;
import com.terafuze.gohomenotes.web.models.StudentModel;
import com.terafuze.gohomenotes.web.models.TeacherModel;
import com.terafuze.gohomenotes.web.utils.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;
import io.micrometer.core.annotation.Timed;
import io.swagger.annotations.Api;


/**
 * REST controller for managing Schools.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"school-resource"})
public class SchoolRestController {

    private final Logger log = LoggerFactory.getLogger(SchoolRestController.class);

    private static final String ENTITY_NAME = "school";

    private final SchoolService schoolService;

    public SchoolRestController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    /**
     * POST  /schools : Create a School.
     *
     * @param School Model the School Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new schoolModel, or with status 400 (Bad Request) if the school has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/schools")
    @Timed
    public ResponseEntity<SchoolModel> createSchool(@Valid @RequestBody SchoolModel schoolModel) throws URISyntaxException {
        log.debug("REST request to save School : {}", schoolModel);
        if (schoolModel.getId() != null) {
            throw new BadRequestAlertException("A new school cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchoolModel result = schoolService.save(schoolModel);
        return ResponseEntity.created(new URI("/api/schools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /schools : Updates an existing school.
     *
     * @param School Model the School Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated schoolModel,
     * or with status 400 (Bad Request) if the School Model is not valid,
     * or with status 500 (Internal Server Error) if the School Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/schools")
    @Timed
    public ResponseEntity<SchoolModel> updateSchool(@Valid @RequestBody SchoolModel schoolModel) throws URISyntaxException {
        log.debug("REST request to update School : {}", schoolModel);
        if (schoolModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SchoolModel result = schoolService.save(schoolModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, schoolModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /schools : get all Schools.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of schools in body
     */
    @GetMapping("/schools")
    @Timed
    public List<SchoolModel> getAllSchools() {
        log.debug("REST request to get all Schools");
        return schoolService.findAll();
    }

    /**
     * GET  /schools/:id/after-school-programs : get all After School Program for a given School.
     *
     * @param id the id of an existing School
     * @return a ResponseEntity with status 200 (OK) and with body of After School Programs for the School or with status 404 if the School does not exist for the given ID.
     */
    @GetMapping("/schools/{id}/after-school-programs")
    @Timed
    public List<AfterSchoolProgramModel> getAfterSchoolPrograms(@PathVariable Long id) {
        log.debug("REST request to get all After School Programses for School : {}", id);
        return schoolService.getAfterSchoolPrograms(id);
    }/**
     * GET  /schools/:id/dismissal-locations : get all Dismissal Location for a given School.
     *
     * @param id the id of an existing School
     * @return a ResponseEntity with status 200 (OK) and with body of Dismissal Locations for the School or with status 404 if the School does not exist for the given ID.
     */
    @GetMapping("/schools/{id}/dismissal-locations")
    @Timed
    public List<DismissalLocationModel> getDismissalLocations(@PathVariable Long id) {
        log.debug("REST request to get all Dismissal Locationses for School : {}", id);
        return schoolService.getDismissalLocations(id);
    }/**
     * GET  /schools/:id/school-grades : get all School Grade for a given School.
     *
     * @param id the id of an existing School
     * @return a ResponseEntity with status 200 (OK) and with body of School Grades for the School or with status 404 if the School does not exist for the given ID.
     */
    @GetMapping("/schools/{id}/school-grades")
    @Timed
    public List<SchoolGradeModel> getSchoolGrades(@PathVariable Long id) {
        log.debug("REST request to get all School Gradeses for School : {}", id);
        return schoolService.getSchoolGrades(id);
    }/**
     * GET  /schools/:id/students : get all Student for a given School.
     *
     * @param id the id of an existing School
     * @return a ResponseEntity with status 200 (OK) and with body of Students for the School or with status 404 if the School does not exist for the given ID.
     */
    @GetMapping("/schools/{id}/students")
    @Timed
    public List<StudentModel> getStudents(@PathVariable Long id) {
        log.debug("REST request to get all Studentses for School : {}", id);
        return schoolService.getStudents(id);
    }/**
     * GET  /schools/:id/teachers : get all Teacher for a given School.
     *
     * @param id the id of an existing School
     * @return a ResponseEntity with status 200 (OK) and with body of Teachers for the School or with status 404 if the School does not exist for the given ID.
     */
    @GetMapping("/schools/{id}/teachers")
    @Timed
    public List<TeacherModel> getTeachers(@PathVariable Long id) {
        log.debug("REST request to get all Teacherses for School : {}", id);
        return schoolService.getTeachers(id);
    }
    /**
     * GET  /schools/:id : get the School for a given "id".
     *
     * @param id the id of an existing school
     * @return the ResponseEntity with status 200 (OK) and with body the School Model, or with status 404 (Not Found)
     */
    @GetMapping("/schools/{id}")
    @Timed
    public ResponseEntity<SchoolModel> getSchool(@PathVariable Long id) {
        log.debug("REST request to get School : {}", id);
        Optional<SchoolModel> schoolModel = schoolService.findOne(id);
        return ResponseUtil.wrapOrNotFound(schoolModel);
    }

    /**
     * DELETE  /schools/:id : delete the "id" school.
     *
     * @param id the id of the School Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/schools/{id}")
    @Timed
    public ResponseEntity<Void> deleteSchool(@PathVariable Long id) {
        log.debug("REST request to delete School : {}", id);
        schoolService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
