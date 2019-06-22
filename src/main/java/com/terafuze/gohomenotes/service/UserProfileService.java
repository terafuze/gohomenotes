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

import com.terafuze.gohomenotes.domain.User;
import com.terafuze.gohomenotes.domain.UserProfile;
import com.terafuze.gohomenotes.repository.UserProfileRepository;
import com.terafuze.gohomenotes.repository.UserRepository;
import com.terafuze.gohomenotes.security.SecurityUtils;
import com.terafuze.gohomenotes.web.mappers.UserProfileMapper;
import com.terafuze.gohomenotes.web.models.UserProfileModel;




/**
 * Service Implementation for managing User Profiles.
 */
@Service
@Transactional
public class UserProfileService {

    private final Logger log = LoggerFactory.getLogger(UserProfileService.class);
    
    private final UserRepository userRepository;
    
    private final UserProfileRepository userProfileRepository;

    private final UserProfileMapper userProfileMapper;

    public UserProfileService(
    		UserRepository userRepository,
    		UserProfileRepository userProfileRepository, 
    		UserProfileMapper userProfileMapper) {
    	this.userRepository = userRepository;
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
        if (userProfileModel.getUserId() != null) {
        	Optional<User> user = this.userRepository.findById(userProfileModel.getUserId());
        	userProfile.setUser(user.get());
        }
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

    @Transactional(readOnly = true)
    public Optional<UserProfileModel> getUserProfileForCurrentUser() {
        log.debug("Request to get UserProfile for the currently logged in user");
        List<UserProfile> userProfileList = this.userProfileRepository.findByUserIsCurrentUser();
        Optional<UserProfile> userProfile = Optional.of(userProfileList.get(0));
        return userProfile.map(userProfileMapper::toModel);
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
