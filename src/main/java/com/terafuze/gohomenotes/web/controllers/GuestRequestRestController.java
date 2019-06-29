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

import com.terafuze.gohomenotes.service.GuestRequestService;
import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.web.models.GuestRequestModel;
import com.terafuze.gohomenotes.web.utils.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;
import io.micrometer.core.annotation.Timed;
import io.swagger.annotations.Api;


/**
 * REST controller for managing Guest Requests.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"guest-request-resource"})
public class GuestRequestRestController {

    private final Logger log = LoggerFactory.getLogger(GuestRequestRestController.class);

    private static final String ENTITY_NAME = "guestRequest";

    private final GuestRequestService guestRequestService;

    public GuestRequestRestController(GuestRequestService guestRequestService) {
        this.guestRequestService = guestRequestService;
    }

    /**
     * POST  /guest-requests : Create a Guest Request.
     *
     * @param Guest Request Model the Guest Request Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new guestRequestModel, or with status 400 (Bad Request) if the guestRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/guest-requests")
    @Timed
    public ResponseEntity<GuestRequestModel> createGuestRequest(@Valid @RequestBody GuestRequestModel guestRequestModel) throws URISyntaxException {
        log.debug("REST request to save GuestRequest : {}", guestRequestModel);
        if (guestRequestModel.getId() != null) {
            throw new BadRequestAlertException("A new guestRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GuestRequestModel result = guestRequestService.save(guestRequestModel);
        return ResponseEntity.created(new URI("/api/guest-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /guest-requests : Updates an existing guestRequest.
     *
     * @param Guest Request Model the Guest Request Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated guestRequestModel,
     * or with status 400 (Bad Request) if the Guest Request Model is not valid,
     * or with status 500 (Internal Server Error) if the Guest Request Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/guest-requests")
    @Timed
    public ResponseEntity<GuestRequestModel> updateGuestRequest(@Valid @RequestBody GuestRequestModel guestRequestModel) throws URISyntaxException {
        log.debug("REST request to update GuestRequest : {}", guestRequestModel);
        if (guestRequestModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GuestRequestModel result = guestRequestService.save(guestRequestModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, guestRequestModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /guest-requests : get all Guest Requests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of guestRequests in body
     */
    @GetMapping("/guest-requests")
    @Timed
    public List<GuestRequestModel> getAllGuestRequests() {
        log.debug("REST request to get all GuestRequests");
        return guestRequestService.findAll();
    }

    
    /**
     * GET  /guest-requests/:id : get the Guest Request for a given "id".
     *
     * @param id the id of an existing guestRequest
     * @return the ResponseEntity with status 200 (OK) and with body the Guest Request Model, or with status 404 (Not Found)
     */
    @GetMapping("/guest-requests/{id}")
    @Timed
    public ResponseEntity<GuestRequestModel> getGuestRequest(@PathVariable Long id) {
        log.debug("REST request to get GuestRequest : {}", id);
        Optional<GuestRequestModel> guestRequestModel = guestRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(guestRequestModel);
    }

    /**
     * DELETE  /guest-requests/:id : delete the "id" guestRequest.
     *
     * @param id the id of the Guest Request Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/guest-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteGuestRequest(@PathVariable Long id) {
        log.debug("REST request to delete GuestRequest : {}", id);
        guestRequestService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
