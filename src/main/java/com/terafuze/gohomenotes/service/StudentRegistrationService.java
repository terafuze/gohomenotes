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

import com.terafuze.gohomenotes.domain.StudentRegistration;
import com.terafuze.gohomenotes.repository.StudentRegistrationRepository;
import com.terafuze.gohomenotes.web.models.StudentRegistrationModel;
import com.terafuze.gohomenotes.web.mappers.StudentRegistrationMapper;


/**
 * Service Implementation for managing Student Registrations.
 */
@Service
@Transactional
public class StudentRegistrationService {

    private final Logger log = LoggerFactory.getLogger(StudentRegistrationService.class);

    private final StudentRegistrationRepository studentRegistrationRepository;

    private final StudentRegistrationMapper studentRegistrationMapper;

    

    public StudentRegistrationService(StudentRegistrationRepository studentRegistrationRepository, StudentRegistrationMapper studentRegistrationMapper) {
        this.studentRegistrationRepository = studentRegistrationRepository;
        this.studentRegistrationMapper = studentRegistrationMapper;
    }

    /**
     * Save a studentRegistration.
     *
     * @param studentRegistrationModel the entity to save
     * @return the persisted entity
     */
    public StudentRegistrationModel save(StudentRegistrationModel studentRegistrationModel) {
        log.debug("Request to save StudentRegistration : {}", studentRegistrationModel);
        StudentRegistration studentRegistration = studentRegistrationMapper.toEntity(studentRegistrationModel);
        studentRegistration = studentRegistrationRepository.save(studentRegistration);
        return studentRegistrationMapper.toModel(studentRegistration);
    }

    /**
     * Get all studentRegistrations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<StudentRegistrationModel> findAll() {
        log.debug("Request to get all StudentRegistrations");
        return studentRegistrationRepository.findAll(new Sort(Sort.Direction.ASC, "lastName")).stream()
            .map(studentRegistrationMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one studentRegistration by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<StudentRegistrationModel> findOne(Long id) {
        log.debug("Request to get StudentRegistration : {}", id);
        Optional<StudentRegistration> studentRegistration = this.studentRegistrationRepository.findById(id);
        Optional<StudentRegistrationModel> model = studentRegistration.map(this.studentRegistrationMapper::toModel);
        return model;
    }

    /**
     * Delete the studentRegistration by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete StudentRegistration : {}", id);
        studentRegistrationRepository.deleteById(id);
    }
}
