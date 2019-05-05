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

import com.terafuze.gohomenotes.service.DismissalLocationService;
import com.terafuze.gohomenotes.web.models.DismissalLocationModel;


/**
 * REST controller for managing Dismissal Locations.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"dismissal-location-resource"})
public class DismissalLocationRestController {

    private final Logger log = LoggerFactory.getLogger(DismissalLocationRestController.class);

    private static final String ENTITY_NAME = "dismissalLocation";

    private final DismissalLocationService dismissalLocationService;

    public DismissalLocationRestController(DismissalLocationService dismissalLocationService) {
        this.dismissalLocationService = dismissalLocationService;
    }

    /**
     * POST  /dismissal-locations : Create a Dismissal Location.
     *
     * @param Dismissal Location Model the Dismissal Location Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dismissalLocationModel, or with status 400 (Bad Request) if the dismissalLocation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dismissal-locations")
    @Timed
    public ResponseEntity<DismissalLocationModel> createDismissalLocation(@Valid @RequestBody DismissalLocationModel dismissalLocationModel) throws URISyntaxException {
        log.debug("REST request to save DismissalLocation : {}", dismissalLocationModel);
        if (dismissalLocationModel.getId() != null) {
            throw new BadRequestAlertException("A new dismissalLocation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DismissalLocationModel result = dismissalLocationService.save(dismissalLocationModel);
        return ResponseEntity.created(new URI("/api/dismissal-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dismissal-locations : Updates an existing dismissalLocation.
     *
     * @param Dismissal Location Model the Dismissal Location Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dismissalLocationModel,
     * or with status 400 (Bad Request) if the Dismissal Location Model is not valid,
     * or with status 500 (Internal Server Error) if the Dismissal Location Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dismissal-locations")
    @Timed
    public ResponseEntity<DismissalLocationModel> updateDismissalLocation(@Valid @RequestBody DismissalLocationModel dismissalLocationModel) throws URISyntaxException {
        log.debug("REST request to update DismissalLocation : {}", dismissalLocationModel);
        if (dismissalLocationModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DismissalLocationModel result = dismissalLocationService.save(dismissalLocationModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dismissalLocationModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dismissal-locations : get all Dismissal Locations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dismissalLocations in body
     */
    @GetMapping("/dismissal-locations")
    @Timed
    public List<DismissalLocationModel> getAllDismissalLocations() {
        log.debug("REST request to get all DismissalLocations");
        return dismissalLocationService.findAll();
    }

    

    /**
     * GET  /dismissal-locations/:id : get the Dismissal Location for a given "id".
     *
     * @param id the id of an existing dismissalLocation
     * @return the ResponseEntity with status 200 (OK) and with body the Dismissal Location Model, or with status 404 (Not Found)
     */
    @GetMapping("/dismissal-locations/{id}")
    @Timed
    public ResponseEntity<DismissalLocationModel> getDismissalLocation(@PathVariable Long id) {
        log.debug("REST request to get DismissalLocation : {}", id);
        Optional<DismissalLocationModel> dismissalLocationModel = dismissalLocationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dismissalLocationModel);
    }

    /**
     * DELETE  /dismissal-locations/:id : delete the "id" dismissalLocation.
     *
     * @param id the id of the Dismissal Location Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dismissal-locations/{id}")
    @Timed
    public ResponseEntity<Void> deleteDismissalLocation(@PathVariable Long id) {
        log.debug("REST request to delete DismissalLocation : {}", id);
        dismissalLocationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
