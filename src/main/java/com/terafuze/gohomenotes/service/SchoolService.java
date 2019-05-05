package com.terafuze.gohomenotes.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.terafuze.gohomenotes.domain.School;
import com.terafuze.gohomenotes.repository.SchoolRepository;
import com.terafuze.gohomenotes.web.mappers.SchoolMapper;
import com.terafuze.gohomenotes.web.mappers.StudentMapper;
import com.terafuze.gohomenotes.web.models.SchoolModel;
import com.terafuze.gohomenotes.web.models.StudentModel;


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
    private final StudentMapper studentMapper = null;
    

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
