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

import com.terafuze.gohomenotes.service.HostRequestService;
import com.terafuze.gohomenotes.web.models.HostRequestModel;


/**
 * REST controller for managing Host Requests.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"host-request-resource"})
public class HostRequestRestController {

    private final Logger log = LoggerFactory.getLogger(HostRequestRestController.class);

    private static final String ENTITY_NAME = "hostRequest";

    private final HostRequestService hostRequestService;

    public HostRequestRestController(HostRequestService hostRequestService) {
        this.hostRequestService = hostRequestService;
    }

    /**
     * POST  /host-requests : Create a Host Request.
     *
     * @param Host Request Model the Host Request Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hostRequestModel, or with status 400 (Bad Request) if the hostRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/host-requests")
    @Timed
    public ResponseEntity<HostRequestModel> createHostRequest(@Valid @RequestBody HostRequestModel hostRequestModel) throws URISyntaxException {
        log.debug("REST request to save HostRequest : {}", hostRequestModel);
        if (hostRequestModel.getId() != null) {
            throw new BadRequestAlertException("A new hostRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HostRequestModel result = hostRequestService.save(hostRequestModel);
        return ResponseEntity.created(new URI("/api/host-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /host-requests : Updates an existing hostRequest.
     *
     * @param Host Request Model the Host Request Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hostRequestModel,
     * or with status 400 (Bad Request) if the Host Request Model is not valid,
     * or with status 500 (Internal Server Error) if the Host Request Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/host-requests")
    @Timed
    public ResponseEntity<HostRequestModel> updateHostRequest(@Valid @RequestBody HostRequestModel hostRequestModel) throws URISyntaxException {
        log.debug("REST request to update HostRequest : {}", hostRequestModel);
        if (hostRequestModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HostRequestModel result = hostRequestService.save(hostRequestModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hostRequestModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /host-requests : get all Host Requests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hostRequests in body
     */
    @GetMapping("/host-requests")
    @Timed
    public List<HostRequestModel> getAllHostRequests() {
        log.debug("REST request to get all HostRequests");
        return hostRequestService.findAll();
    }

    

    /**
     * GET  /host-requests/:id : get the Host Request for a given "id".
     *
     * @param id the id of an existing hostRequest
     * @return the ResponseEntity with status 200 (OK) and with body the Host Request Model, or with status 404 (Not Found)
     */
    @GetMapping("/host-requests/{id}")
    @Timed
    public ResponseEntity<HostRequestModel> getHostRequest(@PathVariable Long id) {
        log.debug("REST request to get HostRequest : {}", id);
        Optional<HostRequestModel> hostRequestModel = hostRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(hostRequestModel);
    }

    /**
     * DELETE  /host-requests/:id : delete the "id" hostRequest.
     *
     * @param id the id of the Host Request Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/host-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteHostRequest(@PathVariable Long id) {
        log.debug("REST request to delete HostRequest : {}", id);
        hostRequestService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
