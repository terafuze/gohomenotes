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

import com.terafuze.gohomenotes.domain.SchoolGrade;
import com.terafuze.gohomenotes.repository.SchoolGradeRepository;
import com.terafuze.gohomenotes.web.models.SchoolGradeModel;
import com.terafuze.gohomenotes.web.mappers.SchoolGradeMapper;


/**
 * Service Implementation for managing School Grades.
 */
@Service
@Transactional
public class SchoolGradeService {

    private final Logger log = LoggerFactory.getLogger(SchoolGradeService.class);

    private final SchoolGradeRepository schoolGradeRepository;

    private final SchoolGradeMapper schoolGradeMapper;

    

    public SchoolGradeService(SchoolGradeRepository schoolGradeRepository, SchoolGradeMapper schoolGradeMapper) {
        this.schoolGradeRepository = schoolGradeRepository;
        this.schoolGradeMapper = schoolGradeMapper;
    }

    /**
     * Save a schoolGrade.
     *
     * @param schoolGradeModel the entity to save
     * @return the persisted entity
     */
    public SchoolGradeModel save(SchoolGradeModel schoolGradeModel) {
        log.debug("Request to save SchoolGrade : {}", schoolGradeModel);
        SchoolGrade schoolGrade = schoolGradeMapper.toEntity(schoolGradeModel);
        schoolGrade = schoolGradeRepository.save(schoolGrade);
        return schoolGradeMapper.toModel(schoolGrade);
    }

    /**
     * Get all schoolGrades.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<SchoolGradeModel> findAll() {
        log.debug("Request to get all SchoolGrades");
        return schoolGradeRepository.findAll(new Sort(Sort.Direction.ASC, "name")).stream()
            .map(schoolGradeMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one schoolGrade by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<SchoolGradeModel> findOne(Long id) {
        log.debug("Request to get SchoolGrade : {}", id);
        Optional<SchoolGrade> schoolGrade = this.schoolGradeRepository.findById(id);
        Optional<SchoolGradeModel> model = schoolGrade.map(this.schoolGradeMapper::toModel);
        return model;
    }

    /**
     * Delete the schoolGrade by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SchoolGrade : {}", id);
        schoolGradeRepository.deleteById(id);
    }
}
