package com.terafuze.gohomenotes.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import com.terafuze.gohomenotes.domain.School;
import com.terafuze.gohomenotes.repository.SchoolRepository;
import com.terafuze.gohomenotes.web.models.SchoolModel;
import com.terafuze.gohomenotes.web.mappers.SchoolMapper;
import com.terafuze.gohomenotes.web.mappers.AfterSchoolProgramMapper;
import com.terafuze.gohomenotes.web.mappers.DismissalLocationMapper;
import com.terafuze.gohomenotes.web.mappers.SchoolGradeMapper;
import com.terafuze.gohomenotes.web.mappers.StudentMapper;
import com.terafuze.gohomenotes.web.mappers.TeacherMapper;

import com.terafuze.gohomenotes.web.models.AfterSchoolProgramModel;
import com.terafuze.gohomenotes.web.models.DismissalLocationModel;
import com.terafuze.gohomenotes.web.models.SchoolGradeModel;
import com.terafuze.gohomenotes.web.models.StudentModel;
import com.terafuze.gohomenotes.web.models.TeacherModel;

import com.terafuze.gohomenotes.domain.AfterSchoolProgram;
import com.terafuze.gohomenotes.domain.DismissalLocation;
import com.terafuze.gohomenotes.domain.SchoolGrade;
import com.terafuze.gohomenotes.domain.Student;
import com.terafuze.gohomenotes.domain.Teacher;


/**
 * Service Implementation for managing Schools.
 */
@Service
@Transactional
public class SchoolService {

    private final Logger log = LoggerFactory.getLogger(SchoolService.class);

    private final SchoolRepository schoolRepository;

    private final SchoolMapper schoolMapper;

    @Autowired
    private final AfterSchoolProgramMapper afterSchoolProgramMapper = null;
    @Autowired
    private final DismissalLocationMapper dismissalLocationMapper = null;
    @Autowired
    private final SchoolGradeMapper schoolGradeMapper = null;
    @Autowired
    private final StudentMapper studentMapper = null;
    @Autowired
    private final TeacherMapper teacherMapper = null;
    

    public SchoolService(SchoolRepository schoolRepository, SchoolMapper schoolMapper) {
        this.schoolRepository = schoolRepository;
        this.schoolMapper = schoolMapper;
    }

    /**
     * Save a school.
     *
     * @param schoolModel the entity to save
     * @return the persisted entity
     */
    public SchoolModel save(SchoolModel schoolModel) {
        log.debug("Request to save School : {}", schoolModel);
        School school = schoolMapper.toEntity(schoolModel);
        school = schoolRepository.save(school);
        return schoolMapper.toModel(school);
    }

    /**
     * Get all schools.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<SchoolModel> findAll() {
        log.debug("Request to get all Schools");
        return schoolRepository.findAll(new Sort(Sort.Direction.ASC, "name")).stream()
            .map(schoolMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all After School Programs for a given School
     *
     * @param id the id of an School
     * @return list of After School Programs that are owned by the School
     */
    @Transactional(readOnly = true)
    public List<AfterSchoolProgramModel> getAfterSchoolPrograms(Long id) {
        log.debug("Get After School Programs for School : {}", id);
        Optional<School> school = schoolRepository.findById(id);
        return school.get().getAfterSchoolPrograms().stream()
        	.map(afterSchoolProgramMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    /**
     * Get all Dismissal Locations for a given School
     *
     * @param id the id of an School
     * @return list of Dismissal Locations that are owned by the School
     */
    @Transactional(readOnly = true)
    public List<DismissalLocationModel> getDismissalLocations(Long id) {
        log.debug("Get Dismissal Locations for School : {}", id);
        Optional<School> school = schoolRepository.findById(id);
        return school.get().getDismissalLocations().stream()
        	.map(dismissalLocationMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    /**
     * Get all School Grades for a given School
     *
     * @param id the id of an School
     * @return list of School Grades that are owned by the School
     */
    @Transactional(readOnly = true)
    public List<SchoolGradeModel> getSchoolGrades(Long id) {
        log.debug("Get School Grades for School : {}", id);
        Optional<School> school = schoolRepository.findById(id);
        return school.get().getSchoolGrades().stream()
        	.map(schoolGradeMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    /**
     * Get all Students for a given School
     *
     * @param id the id of an School
     * @return list of Students that are owned by the School
     */
    @Transactional(readOnly = true)
    public List<StudentModel> getStudents(Long id) {
        log.debug("Get Students for School : {}", id);
        Optional<School> school = schoolRepository.findById(id);
        return school.get().getStudents().stream()
        	.map(studentMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    /**
     * Get all Teachers for a given School
     *
     * @param id the id of an School
     * @return list of Teachers that are owned by the School
     */
    @Transactional(readOnly = true)
    public List<TeacherModel> getTeachers(Long id) {
        log.debug("Get Teachers for School : {}", id);
        Optional<School> school = schoolRepository.findById(id);
        return school.get().getTeachers().stream()
        	.map(teacherMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    

    /**
     * Get one school by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<SchoolModel> findOne(Long id) {
        log.debug("Request to get School : {}", id);
        return schoolRepository.findById(id)
        	.map(schoolMapper::toModel);
    }

    /**
     * Delete the school by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete School : {}", id);
        schoolRepository.deleteById(id);
    }
}
