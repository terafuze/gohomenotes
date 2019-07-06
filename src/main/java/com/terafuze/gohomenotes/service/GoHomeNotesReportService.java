package com.terafuze.gohomenotes.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.io.IOUtils;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import com.terafuze.gohomenotes.domain.GoHomeNotesReport;
import com.terafuze.gohomenotes.repository.GoHomeNotesReportRepository;
import com.terafuze.gohomenotes.web.models.GoHomeNotesReportModel;
import com.terafuze.gohomenotes.web.mappers.GoHomeNotesReportMapper;
import com.terafuze.gohomenotes.repository.GoHomeNotesReportContentStore;


/**
 * Service Implementation for managing Go Home Notes Reports.
 */
@Service
@Transactional
public class GoHomeNotesReportService {

    private final Logger log = LoggerFactory.getLogger(GoHomeNotesReportService.class);

    private final GoHomeNotesReportRepository goHomeNotesReportRepository;

    private final GoHomeNotesReportMapper goHomeNotesReportMapper;

    
    @Autowired
    private final GoHomeNotesReportContentStore goHomeNotesReportContentStore = null;
    

    public GoHomeNotesReportService(GoHomeNotesReportRepository goHomeNotesReportRepository, GoHomeNotesReportMapper goHomeNotesReportMapper) {
        this.goHomeNotesReportRepository = goHomeNotesReportRepository;
        this.goHomeNotesReportMapper = goHomeNotesReportMapper;
    }

    /**
     * Save a goHomeNotesReport.
     *
     * @param goHomeNotesReportModel the entity to save
     * @return the persisted entity
     */
    public GoHomeNotesReportModel save(GoHomeNotesReportModel goHomeNotesReportModel) {
        log.debug("Request to save GoHomeNotesReport : {}", goHomeNotesReportModel);
        GoHomeNotesReport goHomeNotesReport = goHomeNotesReportMapper.toEntity(goHomeNotesReportModel);
        if (goHomeNotesReportModel.getGoHomeNotesReport() != null) {
            this.goHomeNotesReportContentStore.unsetContent(goHomeNotesReport);
            ByteArrayInputStream inputStream = new ByteArrayInputStream(goHomeNotesReportModel.getGoHomeNotesReport());
            this.goHomeNotesReportContentStore.setContent(goHomeNotesReport, inputStream);
        }
        
        goHomeNotesReport = goHomeNotesReportRepository.save(goHomeNotesReport);
        return goHomeNotesReportMapper.toModel(goHomeNotesReport);
    }

    /**
     * Get all goHomeNotesReports.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<GoHomeNotesReportModel> findAll() {
        log.debug("Request to get all GoHomeNotesReports");
        return goHomeNotesReportRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(goHomeNotesReportMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one goHomeNotesReport by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<GoHomeNotesReportModel> findOne(Long id) {
        log.debug("Request to get GoHomeNotesReport : {}", id);
        Optional<GoHomeNotesReport> goHomeNotesReport = this.goHomeNotesReportRepository.findById(id);
        Optional<GoHomeNotesReportModel> model = goHomeNotesReport.map(this.goHomeNotesReportMapper::toModel);
        InputStream inputStream = this.goHomeNotesReportContentStore.getContent(goHomeNotesReport.get());
        if (inputStream != null) {
            byte[] content = null;
            try {
                content = IOUtils.toByteArray(inputStream);
            } catch (IOException e) {
                log.error("I/O Error while retrieving Go Home Notes Report for Go Home Notes Report attribute of the Go Home Notes Report Entity.");
            }
            model.get().setGoHomeNotesReport(content);
        }
        
        return model;
    }

    /**
     * Delete the goHomeNotesReport by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete GoHomeNotesReport : {}", id);
        goHomeNotesReportRepository.deleteById(id);
    }
}
