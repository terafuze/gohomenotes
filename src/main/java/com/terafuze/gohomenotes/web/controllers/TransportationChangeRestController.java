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

import com.terafuze.gohomenotes.service.TransportationChangeService;
import com.terafuze.gohomenotes.web.models.TransportationChangeModel;


/**
 * REST controller for managing Transportation Changes.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"transportation-change-resource"})
public class TransportationChangeRestController {

    private final Logger log = LoggerFactory.getLogger(TransportationChangeRestController.class);

    private static final String ENTITY_NAME = "transportationChange";

    private final TransportationChangeService transportationChangeService;

    public TransportationChangeRestController(TransportationChangeService transportationChangeService) {
        this.transportationChangeService = transportationChangeService;
    }

    /**
     * POST  /transportation-changes : Create a Transportation Change.
     *
     * @param Transportation Change Model the Transportation Change Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportationChangeModel, or with status 400 (Bad Request) if the transportationChange has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transportation-changes")
    @Timed
    public ResponseEntity<TransportationChangeModel> createTransportationChange(@Valid @RequestBody TransportationChangeModel transportationChangeModel) throws URISyntaxException {
        log.debug("REST request to save TransportationChange : {}", transportationChangeModel);
        if (transportationChangeModel.getId() != null) {
            throw new BadRequestAlertException("A new transportationChange cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportationChangeModel result = transportationChangeService.save(transportationChangeModel);
        return ResponseEntity.created(new URI("/api/transportation-changes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transportation-changes : Updates an existing transportationChange.
     *
     * @param Transportation Change Model the Transportation Change Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportationChangeModel,
     * or with status 400 (Bad Request) if the Transportation Change Model is not valid,
     * or with status 500 (Internal Server Error) if the Transportation Change Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transportation-changes")
    @Timed
    public ResponseEntity<TransportationChangeModel> updateTransportationChange(@Valid @RequestBody TransportationChangeModel transportationChangeModel) throws URISyntaxException {
        log.debug("REST request to update TransportationChange : {}", transportationChangeModel);
        if (transportationChangeModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportationChangeModel result = transportationChangeService.save(transportationChangeModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportationChangeModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transportation-changes : get all Transportation Changes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transportationChanges in body
     */
    @GetMapping("/transportation-changes")
    @Timed
    public List<TransportationChangeModel> getAllTransportationChanges() {
        log.debug("REST request to get all TransportationChanges");
        return transportationChangeService.findAll();
    }

    

    /**
     * GET  /transportation-changes/:id : get the Transportation Change for a given "id".
     *
     * @param id the id of an existing transportationChange
     * @return the ResponseEntity with status 200 (OK) and with body the Transportation Change Model, or with status 404 (Not Found)
     */
    @GetMapping("/transportation-changes/{id}")
    @Timed
    public ResponseEntity<TransportationChangeModel> getTransportationChange(@PathVariable Long id) {
        log.debug("REST request to get TransportationChange : {}", id);
        Optional<TransportationChangeModel> transportationChangeModel = transportationChangeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transportationChangeModel);
    }

    /**
     * DELETE  /transportation-changes/:id : delete the "id" transportationChange.
     *
     * @param id the id of the Transportation Change Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transportation-changes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportationChange(@PathVariable Long id) {
        log.debug("REST request to delete TransportationChange : {}", id);
        transportationChangeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
