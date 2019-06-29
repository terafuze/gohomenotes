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

import com.terafuze.gohomenotes.service.TransportationChangeRequestService;
import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.web.models.TransportationChangeRequestModel;
import com.terafuze.gohomenotes.web.utils.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;
import io.micrometer.core.annotation.Timed;
import io.swagger.annotations.Api;


/**
 * REST controller for managing Transportation Change Requests.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"transportation-change-request-resource"})
public class TransportationChangeRequestRestController {

    private final Logger log = LoggerFactory.getLogger(TransportationChangeRequestRestController.class);

    private static final String ENTITY_NAME = "transportationChangeRequest";

    private final TransportationChangeRequestService transportationChangeRequestService;

    public TransportationChangeRequestRestController(TransportationChangeRequestService transportationChangeRequestService) {
        this.transportationChangeRequestService = transportationChangeRequestService;
    }

    /**
     * POST  /transportation-change-requests : Create a Transportation Change Request.
     *
     * @param Transportation Change Request Model the Transportation Change Request Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportationChangeRequestModel, or with status 400 (Bad Request) if the transportationChangeRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transportation-change-requests")
    @Timed
    public ResponseEntity<TransportationChangeRequestModel> createTransportationChangeRequest(@Valid @RequestBody TransportationChangeRequestModel transportationChangeRequestModel) throws URISyntaxException {
        log.debug("REST request to save TransportationChangeRequest : {}", transportationChangeRequestModel);
        if (transportationChangeRequestModel.getId() != null) {
            throw new BadRequestAlertException("A new transportationChangeRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportationChangeRequestModel result = transportationChangeRequestService.save(transportationChangeRequestModel);
        return ResponseEntity.created(new URI("/api/transportation-change-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transportation-change-requests : Updates an existing transportationChangeRequest.
     *
     * @param Transportation Change Request Model the Transportation Change Request Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportationChangeRequestModel,
     * or with status 400 (Bad Request) if the Transportation Change Request Model is not valid,
     * or with status 500 (Internal Server Error) if the Transportation Change Request Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transportation-change-requests")
    @Timed
    public ResponseEntity<TransportationChangeRequestModel> updateTransportationChangeRequest(@Valid @RequestBody TransportationChangeRequestModel transportationChangeRequestModel) throws URISyntaxException {
        log.debug("REST request to update TransportationChangeRequest : {}", transportationChangeRequestModel);
        if (transportationChangeRequestModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportationChangeRequestModel result = transportationChangeRequestService.save(transportationChangeRequestModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportationChangeRequestModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transportation-change-requests : get all Transportation Change Requests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transportationChangeRequests in body
     */
    @GetMapping("/transportation-change-requests")
    @Timed
    public List<TransportationChangeRequestModel> getAllTransportationChangeRequests() {
        log.debug("REST request to get all TransportationChangeRequests");
        return transportationChangeRequestService.findAll();
    }

    
    /**
     * GET  /transportation-change-requests/:id : get the Transportation Change Request for a given "id".
     *
     * @param id the id of an existing transportationChangeRequest
     * @return the ResponseEntity with status 200 (OK) and with body the Transportation Change Request Model, or with status 404 (Not Found)
     */
    @GetMapping("/transportation-change-requests/{id}")
    @Timed
    public ResponseEntity<TransportationChangeRequestModel> getTransportationChangeRequest(@PathVariable Long id) {
        log.debug("REST request to get TransportationChangeRequest : {}", id);
        Optional<TransportationChangeRequestModel> transportationChangeRequestModel = transportationChangeRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transportationChangeRequestModel);
    }

    /**
     * DELETE  /transportation-change-requests/:id : delete the "id" transportationChangeRequest.
     *
     * @param id the id of the Transportation Change Request Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transportation-change-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportationChangeRequest(@PathVariable Long id) {
        log.debug("REST request to delete TransportationChangeRequest : {}", id);
        transportationChangeRequestService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
