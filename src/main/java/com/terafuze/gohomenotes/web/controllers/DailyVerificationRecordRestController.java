package com.terafuze.gohomenotes.web.controllers;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.codahale.metrics.annotation.Timed;
import com.terafuze.gohomenotes.service.DailyVerificationRecordService;
import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.web.models.DailyVerificationRecordModel;
import com.terafuze.gohomenotes.web.utils.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.Api;


/**
 * REST controller for managing Daily Verification Records.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"daily-verification-record-resource"})
public class DailyVerificationRecordRestController {

    private final Logger log = LoggerFactory.getLogger(DailyVerificationRecordRestController.class);

    private static final String ENTITY_NAME = "dailyVerificationRecord";

    private final DailyVerificationRecordService dailyVerificationRecordService;

    public DailyVerificationRecordRestController(DailyVerificationRecordService dailyVerificationRecordService) {
        this.dailyVerificationRecordService = dailyVerificationRecordService;
    }

    /**
     * POST  /daily-verification-records : Create a Daily Verification Record.
     *
     * @param Daily Verification Record Model the Daily Verification Record Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dailyVerificationRecordModel, or with status 400 (Bad Request) if the dailyVerificationRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/daily-verification-records")
    @Timed
    public ResponseEntity<DailyVerificationRecordModel> createDailyVerificationRecord(@Valid @RequestBody DailyVerificationRecordModel dailyVerificationRecordModel) throws URISyntaxException {
        log.debug("REST request to save DailyVerificationRecord : {}", dailyVerificationRecordModel);
        if (dailyVerificationRecordModel.getId() != null) {
            throw new BadRequestAlertException("A new dailyVerificationRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DailyVerificationRecordModel result = dailyVerificationRecordService.save(dailyVerificationRecordModel);
        return ResponseEntity.created(new URI("/api/daily-verification-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /daily-verification-records : Updates an existing dailyVerificationRecord.
     *
     * @param Daily Verification Record Model the Daily Verification Record Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dailyVerificationRecordModel,
     * or with status 400 (Bad Request) if the Daily Verification Record Model is not valid,
     * or with status 500 (Internal Server Error) if the Daily Verification Record Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/daily-verification-records")
    @Timed
    public ResponseEntity<DailyVerificationRecordModel> updateDailyVerificationRecord(@Valid @RequestBody DailyVerificationRecordModel dailyVerificationRecordModel) throws URISyntaxException {
        log.debug("REST request to update DailyVerificationRecord : {}", dailyVerificationRecordModel);
        if (dailyVerificationRecordModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DailyVerificationRecordModel result = dailyVerificationRecordService.save(dailyVerificationRecordModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dailyVerificationRecordModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /daily-verification-records : get all Daily Verification Records.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dailyVerificationRecords in body
     */
    @GetMapping("/daily-verification-records")
    @Timed
    public List<DailyVerificationRecordModel> getAllDailyVerificationRecords() {
        log.debug("REST request to get all DailyVerificationRecords");
        return dailyVerificationRecordService.findAll();
    }

    /**
     * Get the Go Home Notes Report file for a given Daily Verification Record.
     *
     * @param id the id of an existing Daily Verification Record
     * @return a ResponseEntity with status 200 (OK) and with body containing the file content or with status 404 if not found
     */
    @GetMapping("/daily-verification-records/{id}/go-home-notes-reports")
    @Timed
    public ResponseEntity<?> getGoHomeNotesReport(@PathVariable Long id) {
        log.debug("REST request to the Go Home Notes Reports file content for DailyVerificationRecord : {}", id);
        Optional<DailyVerificationRecordModel> dailyVerificationRecordModel = dailyVerificationRecordService.findOne(id);
        if (dailyVerificationRecordModel.isPresent()) {
            InputStreamResource inputStreamResource = new InputStreamResource(new ByteArrayInputStream(dailyVerificationRecordModel.get().getGoHomeNotesReport()));
            HttpHeaders headers = new HttpHeaders();
            headers.setContentLength(dailyVerificationRecordModel.get().getGoHomeNotesReportContentLength());
            headers.set("Content-Type", dailyVerificationRecordModel.get().getGoHomeNotesReportContentType());
            return new ResponseEntity<Object>(inputStreamResource, headers, HttpStatus.OK);
        }
        return ResponseUtil.wrapOrNotFound(dailyVerificationRecordModel);
    }
    
    /**
     * GET  /daily-verification-records/:id : get the Daily Verification Record for a given "id".
     *
     * @param id the id of an existing dailyVerificationRecord
     * @return the ResponseEntity with status 200 (OK) and with body the Daily Verification Record Model, or with status 404 (Not Found)
     */
    @GetMapping("/daily-verification-records/{id}")
    @Timed
    public ResponseEntity<DailyVerificationRecordModel> getDailyVerificationRecord(@PathVariable Long id) {
        log.debug("REST request to get DailyVerificationRecord : {}", id);
        Optional<DailyVerificationRecordModel> dailyVerificationRecordModel = dailyVerificationRecordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dailyVerificationRecordModel);
    }

    /**
     * DELETE  /daily-verification-records/:id : delete the "id" dailyVerificationRecord.
     *
     * @param id the id of the Daily Verification Record Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/daily-verification-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteDailyVerificationRecord(@PathVariable Long id) {
        log.debug("REST request to delete DailyVerificationRecord : {}", id);
        dailyVerificationRecordService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
