package com.terafuze.gohomenotes.web.controllers;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.micrometer.core.annotation.Timed;
import io.swagger.annotations.Api;

import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.service.EarlyPickupRequestService;
import com.terafuze.gohomenotes.web.models.EarlyPickupRequestModel;


/**
 * REST controller for managing Early Pickup Requests.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"early-pickup-request-resource"})
public class EarlyPickupRequestRestController {

    private final Logger log = LoggerFactory.getLogger(EarlyPickupRequestRestController.class);

    private static final String ENTITY_NAME = "earlyPickupRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EarlyPickupRequestService earlyPickupRequestService;

    public EarlyPickupRequestRestController(EarlyPickupRequestService earlyPickupRequestService) {
        this.earlyPickupRequestService = earlyPickupRequestService;
    }

    /**
     * POST  /early-pickup-requests : Create a Early Pickup Request.
     *
     * @param Early Pickup Request Model the Early Pickup Request Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new earlyPickupRequestModel, or with status 400 (Bad Request) if the earlyPickupRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/early-pickup-requests")
    public ResponseEntity<EarlyPickupRequestModel> createEarlyPickupRequest(@Valid @RequestBody EarlyPickupRequestModel earlyPickupRequestModel) throws URISyntaxException {
        log.debug("REST request to save EarlyPickupRequest : {}", earlyPickupRequestModel);
        if (earlyPickupRequestModel.getId() != null) {
            throw new BadRequestAlertException("A new earlyPickupRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EarlyPickupRequestModel result = earlyPickupRequestService.save(earlyPickupRequestModel);
        return ResponseEntity.created(new URI("/api/early-pickup-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /early-pickup-requests : Updates an existing earlyPickupRequest.
     *
     * @param Early Pickup Request Model the Early Pickup Request Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated earlyPickupRequestModel,
     * or with status 400 (Bad Request) if the Early Pickup Request Model is not valid,
     * or with status 500 (Internal Server Error) if the Early Pickup Request Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/early-pickup-requests")
    public ResponseEntity<EarlyPickupRequestModel> updateEarlyPickupRequest(@Valid @RequestBody EarlyPickupRequestModel earlyPickupRequestModel) throws URISyntaxException {
        log.debug("REST request to update EarlyPickupRequest : {}", earlyPickupRequestModel);
        if (earlyPickupRequestModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EarlyPickupRequestModel result = earlyPickupRequestService.save(earlyPickupRequestModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, earlyPickupRequestModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /early-pickup-requests : get all Early Pickup Requests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of earlyPickupRequests in body
     */
    @GetMapping("/early-pickup-requests")
    public List<EarlyPickupRequestModel> getAllEarlyPickupRequests() {
        log.debug("REST request to get all EarlyPickupRequests");
        return earlyPickupRequestService.findAll();
    }

    
    /**
     * GET  /early-pickup-requests/:id : get the Early Pickup Request for a given "id".
     *
     * @param id the id of an existing earlyPickupRequest
     * @return the ResponseEntity with status 200 (OK) and with body the Early Pickup Request Model, or with status 404 (Not Found)
     */
    @GetMapping("/early-pickup-requests/{id}")
    public ResponseEntity<EarlyPickupRequestModel> getEarlyPickupRequest(@PathVariable Long id) {
        log.debug("REST request to get EarlyPickupRequest : {}", id);
        Optional<EarlyPickupRequestModel> earlyPickupRequestModel = earlyPickupRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(earlyPickupRequestModel);
    }

    /**
     * DELETE  /early-pickup-requests/:id : delete the "id" earlyPickupRequest.
     *
     * @param id the id of the Early Pickup Request Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/early-pickup-requests/{id}")
    public ResponseEntity<Void> deleteEarlyPickupRequest(@PathVariable Long id) {
        log.debug("REST request to delete EarlyPickupRequest : {}", id);
        earlyPickupRequestService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
