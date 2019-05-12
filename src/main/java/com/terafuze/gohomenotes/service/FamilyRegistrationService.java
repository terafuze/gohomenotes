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

import com.terafuze.gohomenotes.domain.FamilyRegistration;
import com.terafuze.gohomenotes.repository.FamilyRegistrationRepository;
import com.terafuze.gohomenotes.web.models.FamilyRegistrationModel;
import com.terafuze.gohomenotes.web.mappers.FamilyRegistrationMapper;
import com.terafuze.gohomenotes.web.mappers.ParentRegistrationMapper;
import com.terafuze.gohomenotes.web.mappers.StudentRegistrationMapper;

import com.terafuze.gohomenotes.web.models.ParentRegistrationModel;
import com.terafuze.gohomenotes.web.models.StudentRegistrationModel;

import com.terafuze.gohomenotes.domain.ParentRegistration;
import com.terafuze.gohomenotes.domain.StudentRegistration;


/**
 * Service Implementation for managing Family Registrations.
 */
@Service
@Transactional
public class FamilyRegistrationService {

    private final Logger log = LoggerFactory.getLogger(FamilyRegistrationService.class);

    private final FamilyRegistrationRepository familyRegistrationRepository;

    private final FamilyRegistrationMapper familyRegistrationMapper;

    @Autowired
    private final ParentRegistrationMapper parentRegistrationMapper = null;
    @Autowired
    private final StudentRegistrationMapper studentRegistrationMapper = null;
    

    public FamilyRegistrationService(FamilyRegistrationRepository familyRegistrationRepository, FamilyRegistrationMapper familyRegistrationMapper) {
        this.familyRegistrationRepository = familyRegistrationRepository;
        this.familyRegistrationMapper = familyRegistrationMapper;
    }

    /**
     * Save a familyRegistration.
     *
     * @param familyRegistrationModel the entity to save
     * @return the persisted entity
     */
    public FamilyRegistrationModel save(FamilyRegistrationModel familyRegistrationModel) {
        log.debug("Request to save FamilyRegistration : {}", familyRegistrationModel);
        FamilyRegistration familyRegistration = familyRegistrationMapper.toEntity(familyRegistrationModel);
        familyRegistration = familyRegistrationRepository.save(familyRegistration);
        return familyRegistrationMapper.toModel(familyRegistration);
    }

    /**
     * Get all familyRegistrations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FamilyRegistrationModel> findAll() {
        log.debug("Request to get all FamilyRegistrations");
        return familyRegistrationRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(familyRegistrationMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all Parent Registrations for a given Family Registration
     *
     * @param id the id of an Family Registration
     * @return list of Parent Registrations that are owned by the Family Registration
     */
    @Transactional(readOnly = true)
    public List<ParentRegistrationModel> getParentRegistrations(Long id) {
        log.debug("Get Parent Registrations for Family Registration : {}", id);
        Optional<FamilyRegistration> familyRegistration = familyRegistrationRepository.findById(id);
        return familyRegistration.get().getParentRegistrations().stream()
        	.map(parentRegistrationMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    /**
     * Get all Student Registrations for a given Family Registration
     *
     * @param id the id of an Family Registration
     * @return list of Student Registrations that are owned by the Family Registration
     */
    @Transactional(readOnly = true)
    public List<StudentRegistrationModel> getStudentRegistrations(Long id) {
        log.debug("Get Student Registrations for Family Registration : {}", id);
        Optional<FamilyRegistration> familyRegistration = familyRegistrationRepository.findById(id);
        return familyRegistration.get().getStudentRegistrations().stream()
        	.map(studentRegistrationMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    

    /**
     * Get one familyRegistration by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<FamilyRegistrationModel> findOne(Long id) {
        log.debug("Request to get FamilyRegistration : {}", id);
        return familyRegistrationRepository.findById(id)
        	.map(familyRegistrationMapper::toModel);
    }

    /**
     * Delete the familyRegistration by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FamilyRegistration : {}", id);
        familyRegistrationRepository.deleteById(id);
    }
}
