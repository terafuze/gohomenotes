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
import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.Api;
import io.github.jhipster.web.util.ResponseUtil;

import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.web.utils.HeaderUtil;

import com.terafuze.gohomenotes.service.UserProfileService;
import com.terafuze.gohomenotes.web.models.UserProfileModel;


/**
 * REST controller for managing User Profiles.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"user-profile-resource"})
public class UserProfileRestController {

    private final Logger log = LoggerFactory.getLogger(UserProfileRestController.class);

    private static final String ENTITY_NAME = "userProfile";

    private final UserProfileService userProfileService;

    public UserProfileRestController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    /**
     * POST  /user-profiles : Create a User Profile.
     *
     * @param User Profile Model the User Profile Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userProfileModel, or with status 400 (Bad Request) if the userProfile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-profiles")
    @Timed
    public ResponseEntity<UserProfileModel> createUserProfile(@Valid @RequestBody UserProfileModel userProfileModel) throws URISyntaxException {
        log.debug("REST request to save UserProfile : {}", userProfileModel);
        if (userProfileModel.getId() != null) {
            throw new BadRequestAlertException("A new userProfile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserProfileModel result = userProfileService.save(userProfileModel);
        return ResponseEntity.created(new URI("/api/user-profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-profiles : Updates an existing userProfile.
     *
     * @param User Profile Model the User Profile Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userProfileModel,
     * or with status 400 (Bad Request) if the User Profile Model is not valid,
     * or with status 500 (Internal Server Error) if the User Profile Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-profiles")
    @Timed
    public ResponseEntity<UserProfileModel> updateUserProfile(@Valid @RequestBody UserProfileModel userProfileModel) throws URISyntaxException {
        log.debug("REST request to update UserProfile : {}", userProfileModel);
        if (userProfileModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserProfileModel result = userProfileService.save(userProfileModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userProfileModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-profiles : get all User Profiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userProfiles in body
     */
    @GetMapping("/user-profiles")
    @Timed
    public List<UserProfileModel> getAllUserProfiles() {
        log.debug("REST request to get all UserProfiles");
        return userProfileService.findAll();
    }

    
    /**
     * GET  /user-profiles/:id : get the User Profile for a given "id".
     *
     * @param id the id of an existing userProfile
     * @return the ResponseEntity with status 200 (OK) and with body the User Profile Model, or with status 404 (Not Found)
     */
    @GetMapping("/user-profiles/{id}")
    @Timed
    public ResponseEntity<UserProfileModel> getUserProfile(@PathVariable Long id) {
        log.debug("REST request to get UserProfile : {}", id);
        Optional<UserProfileModel> userProfileModel = userProfileService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userProfileModel);
    }

    /**
     * DELETE  /user-profiles/:id : delete the "id" userProfile.
     *
     * @param id the id of the User Profile Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-profiles/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
        log.debug("REST request to delete UserProfile : {}", id);
        userProfileService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
