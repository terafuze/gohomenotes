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

import com.terafuze.gohomenotes.domain.ParentRegistration;
import com.terafuze.gohomenotes.repository.ParentRegistrationRepository;
import com.terafuze.gohomenotes.web.models.ParentRegistrationModel;
import com.terafuze.gohomenotes.web.mappers.ParentRegistrationMapper;


/**
 * Service Implementation for managing Parent Registrations.
 */
@Service
@Transactional
public class ParentRegistrationService {

    private final Logger log = LoggerFactory.getLogger(ParentRegistrationService.class);

    private final ParentRegistrationRepository parentRegistrationRepository;

    private final ParentRegistrationMapper parentRegistrationMapper;

    

    public ParentRegistrationService(ParentRegistrationRepository parentRegistrationRepository, ParentRegistrationMapper parentRegistrationMapper) {
        this.parentRegistrationRepository = parentRegistrationRepository;
        this.parentRegistrationMapper = parentRegistrationMapper;
    }

    /**
     * Save a parentRegistration.
     *
     * @param parentRegistrationModel the entity to save
     * @return the persisted entity
     */
    public ParentRegistrationModel save(ParentRegistrationModel parentRegistrationModel) {
        log.debug("Request to save ParentRegistration : {}", parentRegistrationModel);
        ParentRegistration parentRegistration = parentRegistrationMapper.toEntity(parentRegistrationModel);
        parentRegistration = parentRegistrationRepository.save(parentRegistration);
        return parentRegistrationMapper.toModel(parentRegistration);
    }

    /**
     * Get all parentRegistrations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ParentRegistrationModel> findAll() {
        log.debug("Request to get all ParentRegistrations");
        return parentRegistrationRepository.findAll(new Sort(Sort.Direction.ASC, "lastName")).stream()
            .map(parentRegistrationMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one parentRegistration by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ParentRegistrationModel> findOne(Long id) {
        log.debug("Request to get ParentRegistration : {}", id);
        Optional<ParentRegistration> parentRegistration = this.parentRegistrationRepository.findById(id);
        Optional<ParentRegistrationModel> model = parentRegistration.map(this.parentRegistrationMapper::toModel);
        return model;
    }

    /**
     * Delete the parentRegistration by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ParentRegistration : {}", id);
        parentRegistrationRepository.deleteById(id);
    }
}
