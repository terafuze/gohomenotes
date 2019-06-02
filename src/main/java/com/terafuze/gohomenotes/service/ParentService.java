package com.terafuze.gohomenotes.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.terafuze.gohomenotes.domain.Parent;
import com.terafuze.gohomenotes.domain.UserProfile;
import com.terafuze.gohomenotes.repository.ParentRepository;
import com.terafuze.gohomenotes.repository.UserProfileRepository;
import com.terafuze.gohomenotes.web.mappers.ParentMapper;
import com.terafuze.gohomenotes.web.mappers.StudentMapper;
import com.terafuze.gohomenotes.web.mappers.UserProfileMapper;
import com.terafuze.gohomenotes.web.models.ParentModel;
import com.terafuze.gohomenotes.web.models.StudentModel;




/**
 * Service Implementation for managing Parents.
 */
@Service
@Transactional
public class ParentService {

    private final Logger log = LoggerFactory.getLogger(ParentService.class);

    private final ParentRepository parentRepository;

    private final ParentMapper parentMapper;

    @Autowired
    private final StudentMapper studentMapper = null;
	
    @Autowired
    private final UserProfileRepository userProfileRepository = null;

    @Autowired
    private final UserProfileMapper userProfileMapper = null;
    
    public ParentService(ParentRepository parentRepository, ParentMapper parentMapper) {
        this.parentRepository = parentRepository;
        this.parentMapper = parentMapper;
    }

    /**
     * Save a parent.
     *
     * @param parentModel the entity to save
     * @return the persisted entity
     */
    public ParentModel save(ParentModel parentModel) {
        log.debug("Request to save Parent : {}", parentModel);
        Parent parent = parentMapper.toEntity(parentModel);
        UserProfile userProfile = userProfileMapper.userProfileFromParentModel(parentModel);
        userProfile = userProfileRepository.save(userProfile);
        userProfile.setParent(parent);
        parent = parentRepository.save(parent);
        return parentMapper.toModel(parent);
    }
    
    /**
     * Save a Parent.
     *
     * @param parentModel the entity to be updated
     * @return the persisted entity
     */
    public ParentModel updateParent(ParentModel parentModel) {
        log.debug("Request to update Parent : {}", parentModel);
        Parent parent = parentMapper.toEntity(parentModel);
        Optional<UserProfile> optional = userProfileRepository.findById(parentModel.getUserProfileId());
        UserProfile userProfile = optional.get();
        userProfile = userProfileMapper.updateUserProfileFromParentModel(parentModel, userProfile);
        parent.setUserProfile(userProfile);
        parent = parentRepository.save(parent);
        return parentMapper.toModel(parent);
    }
    
    /**
     * Get all parents.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ParentModel> findAll() {
        log.debug("Request to get all Parents");
        return parentRepository.findAll().stream()
            .map(parentMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all Students for a given Parent
     *
     * @param id the id of an Parent
     * @return list of Students that are owned by the Parent
     */
    @Transactional(readOnly = true)
    public List<StudentModel> getStudents(Long id) {
        log.debug("Get Students for Parent : {}", id);
        Optional<Parent> parent = parentRepository.findById(id);
        return parent.get().getStudents().stream()
            .map(studentMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }
    

    /**
     * Get one parent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ParentModel> findOne(Long id) {
        log.debug("Request to get Parent : {}", id);
        return parentRepository.findById(id)
            .map(parentMapper::toModel);
    }

    /**
     * Delete the parent by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Parent : {}", id);
        parentRepository.deleteById(id);
    }
}
