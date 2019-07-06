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
import com.terafuze.gohomenotes.service.GoHomeNotesReportService;
import com.terafuze.gohomenotes.web.models.GoHomeNotesReportModel;


/**
 * REST controller for managing Go Home Notes Reports.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"go-home-notes-report-resource"})
public class GoHomeNotesReportRestController {

    private final Logger log = LoggerFactory.getLogger(GoHomeNotesReportRestController.class);

    private static final String ENTITY_NAME = "goHomeNotesReport";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GoHomeNotesReportService goHomeNotesReportService;

    public GoHomeNotesReportRestController(GoHomeNotesReportService goHomeNotesReportService) {
        this.goHomeNotesReportService = goHomeNotesReportService;
    }

    /**
     * POST  /go-home-notes-reports : Create a Go Home Notes Report.
     *
     * @param Go Home Notes Report Model the Go Home Notes Report Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new goHomeNotesReportModel, or with status 400 (Bad Request) if the goHomeNotesReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/go-home-notes-reports")
    public ResponseEntity<GoHomeNotesReportModel> createGoHomeNotesReport(@Valid @RequestBody GoHomeNotesReportModel goHomeNotesReportModel) throws URISyntaxException {
        log.debug("REST request to save GoHomeNotesReport : {}", goHomeNotesReportModel);
        if (goHomeNotesReportModel.getId() != null) {
            throw new BadRequestAlertException("A new goHomeNotesReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GoHomeNotesReportModel result = goHomeNotesReportService.save(goHomeNotesReportModel);
        return ResponseEntity.created(new URI("/api/go-home-notes-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /go-home-notes-reports : Updates an existing goHomeNotesReport.
     *
     * @param Go Home Notes Report Model the Go Home Notes Report Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated goHomeNotesReportModel,
     * or with status 400 (Bad Request) if the Go Home Notes Report Model is not valid,
     * or with status 500 (Internal Server Error) if the Go Home Notes Report Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/go-home-notes-reports")
    public ResponseEntity<GoHomeNotesReportModel> updateGoHomeNotesReport(@Valid @RequestBody GoHomeNotesReportModel goHomeNotesReportModel) throws URISyntaxException {
        log.debug("REST request to update GoHomeNotesReport : {}", goHomeNotesReportModel);
        if (goHomeNotesReportModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GoHomeNotesReportModel result = goHomeNotesReportService.save(goHomeNotesReportModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, goHomeNotesReportModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /go-home-notes-reports : get all Go Home Notes Reports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of goHomeNotesReports in body
     */
    @GetMapping("/go-home-notes-reports")
    public List<GoHomeNotesReportModel> getAllGoHomeNotesReports() {
        log.debug("REST request to get all GoHomeNotesReports");
        return goHomeNotesReportService.findAll();
    }

    /**
     * Get the Go Home Notes Report file for a given Go Home Notes Report.
     *
     * @param id the id of an existing Go Home Notes Report
     * @return a ResponseEntity with status 200 (OK) and with body containing the file content or with status 404 if not found
     */
    @GetMapping("/go-home-notes-reports/{id}/content")
    public ResponseEntity<?> getGoHomeNotesReportContent(@PathVariable Long id) {
        log.debug("REST request to the Go Home Notes Reports file content for GoHomeNotesReport : {}", id);
        Optional<GoHomeNotesReportModel> goHomeNotesReportModel = goHomeNotesReportService.findOne(id);
        if (goHomeNotesReportModel.isPresent()) {
            InputStreamResource inputStreamResource = new InputStreamResource(new ByteArrayInputStream(goHomeNotesReportModel.get().getGoHomeNotesReport()));
            HttpHeaders headers = new HttpHeaders();
            headers.setContentLength(goHomeNotesReportModel.get().getGoHomeNotesReportContentLength());
            headers.set("Content-Type", goHomeNotesReportModel.get().getGoHomeNotesReportMimeType());
            return new ResponseEntity<Object>(inputStreamResource, headers, HttpStatus.OK);
        }
        return ResponseUtil.wrapOrNotFound(goHomeNotesReportModel);
    }
    
    /**
     * GET  /go-home-notes-reports/:id : get the Go Home Notes Report for a given "id".
     *
     * @param id the id of an existing goHomeNotesReport
     * @return the ResponseEntity with status 200 (OK) and with body the Go Home Notes Report Model, or with status 404 (Not Found)
     */
    @GetMapping("/go-home-notes-reports/{id}")
    public ResponseEntity<GoHomeNotesReportModel> getGoHomeNotesReport(@PathVariable Long id) {
        log.debug("REST request to get GoHomeNotesReport : {}", id);
        Optional<GoHomeNotesReportModel> goHomeNotesReportModel = goHomeNotesReportService.findOne(id);
        return ResponseUtil.wrapOrNotFound(goHomeNotesReportModel);
    }

    /**
     * DELETE  /go-home-notes-reports/:id : delete the "id" goHomeNotesReport.
     *
     * @param id the id of the Go Home Notes Report Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/go-home-notes-reports/{id}")
    public ResponseEntity<Void> deleteGoHomeNotesReport(@PathVariable Long id) {
        log.debug("REST request to delete GoHomeNotesReport : {}", id);
        goHomeNotesReportService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
