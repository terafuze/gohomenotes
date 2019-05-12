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

import com.terafuze.gohomenotes.domain.UserProfile;
import com.terafuze.gohomenotes.repository.UserProfileRepository;
import com.terafuze.gohomenotes.web.models.UserProfileModel;
import com.terafuze.gohomenotes.web.mappers.UserProfileMapper;




/**
 * Service Implementation for managing User Profiles.
 */
@Service
@Transactional
public class UserProfileService {

    private final Logger log = LoggerFactory.getLogger(UserProfileService.class);

    private final UserProfileRepository userProfileRepository;

    private final UserProfileMapper userProfileMapper;

    

    public UserProfileService(UserProfileRepository userProfileRepository, UserProfileMapper userProfileMapper) {
        this.userProfileRepository = userProfileRepository;
        this.userProfileMapper = userProfileMapper;
    }

    /**
     * Save a userProfile.
     *
     * @param userProfileModel the entity to save
     * @return the persisted entity
     */
    public UserProfileModel save(UserProfileModel userProfileModel) {
        log.debug("Request to save UserProfile : {}", userProfileModel);
        UserProfile userProfile = userProfileMapper.toEntity(userProfileModel);
        userProfile = userProfileRepository.save(userProfile);
        return userProfileMapper.toModel(userProfile);
    }

    /**
     * Get all userProfiles.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<UserProfileModel> findAll() {
        log.debug("Request to get all UserProfiles");
        return userProfileRepository.findAll(new Sort(Sort.Direction.ASC, "lastName")).stream()
            .map(userProfileMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one userProfile by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<UserProfileModel> findOne(Long id) {
        log.debug("Request to get UserProfile : {}", id);
        return userProfileRepository.findById(id)
        	.map(userProfileMapper::toModel);
    }

    /**
     * Delete the userProfile by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserProfile : {}", id);
        userProfileRepository.deleteById(id);
    }
}
