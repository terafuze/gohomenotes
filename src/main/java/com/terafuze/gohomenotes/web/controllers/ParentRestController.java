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

import com.terafuze.gohomenotes.service.ParentService;
import com.terafuze.gohomenotes.web.models.ParentModel;


/**
 * REST controller for managing Parents.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"parent-resource"})
public class ParentRestController {

    private final Logger log = LoggerFactory.getLogger(ParentRestController.class);

    private static final String ENTITY_NAME = "parent";

    private final ParentService parentService;

    public ParentRestController(ParentService parentService) {
        this.parentService = parentService;
    }

    /**
     * POST  /parents : Create a Parent.
     *
     * @param Parent Model the Parent Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parentModel, or with status 400 (Bad Request) if the parent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parents")
    @Timed
    public ResponseEntity<ParentModel> createParent(@Valid @RequestBody ParentModel parentModel) throws URISyntaxException {
        log.debug("REST request to save Parent : {}", parentModel);
        if (parentModel.getId() != null) {
            throw new BadRequestAlertException("A new parent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParentModel result = parentService.save(parentModel);
        return ResponseEntity.created(new URI("/api/parents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parents : Updates an existing parent.
     *
     * @param Parent Model the Parent Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parentModel,
     * or with status 400 (Bad Request) if the Parent Model is not valid,
     * or with status 500 (Internal Server Error) if the Parent Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parents")
    @Timed
    public ResponseEntity<ParentModel> updateParent(@Valid @RequestBody ParentModel parentModel) throws URISyntaxException {
        log.debug("REST request to update Parent : {}", parentModel);
        if (parentModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParentModel result = parentService.save(parentModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parentModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parents : get all Parents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parents in body
     */
    @GetMapping("/parents")
    @Timed
    public List<ParentModel> getAllParents() {
        log.debug("REST request to get all Parents");
        return parentService.findAll();
    }

    
    /**
     * GET  /parents/:id : get the Parent for a given "id".
     *
     * @param id the id of an existing parent
     * @return the ResponseEntity with status 200 (OK) and with body the Parent Model, or with status 404 (Not Found)
     */
    @GetMapping("/parents/{id}")
    @Timed
    public ResponseEntity<ParentModel> getParent(@PathVariable Long id) {
        log.debug("REST request to get Parent : {}", id);
        Optional<ParentModel> parentModel = parentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parentModel);
    }

    /**
     * DELETE  /parents/:id : delete the "id" parent.
     *
     * @param id the id of the Parent Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parents/{id}")
    @Timed
    public ResponseEntity<Void> deleteParent(@PathVariable Long id) {
        log.debug("REST request to delete Parent : {}", id);
        parentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
