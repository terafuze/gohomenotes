package com.terafuze.gohomenotes.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.terafuze.gohomenotes.domain.DailyVerificationRecord;
import com.terafuze.gohomenotes.repository.DailyVerificationRecordRepository;
import com.terafuze.gohomenotes.web.models.DailyVerificationRecordModel;
import com.terafuze.gohomenotes.web.mappers.DailyVerificationRecordMapper;
import com.terafuze.gohomenotes.repository.GoHomeNotesReportContentStore;


/**
 * Service Implementation for managing Daily Verification Records.
 */
@Service
@Transactional
public class DailyVerificationRecordService {

    private final Logger log = LoggerFactory.getLogger(DailyVerificationRecordService.class);

    private final DailyVerificationRecordRepository dailyVerificationRecordRepository;

    private final DailyVerificationRecordMapper dailyVerificationRecordMapper;

    
    @Autowired
    private final GoHomeNotesReportContentStore goHomeNotesReportContentStore = null;
    

    public DailyVerificationRecordService(DailyVerificationRecordRepository dailyVerificationRecordRepository, DailyVerificationRecordMapper dailyVerificationRecordMapper) {
        this.dailyVerificationRecordRepository = dailyVerificationRecordRepository;
        this.dailyVerificationRecordMapper = dailyVerificationRecordMapper;
    }

    /**
     * Save a dailyVerificationRecord.
     *
     * @param dailyVerificationRecordModel the entity to save
     * @return the persisted entity
     */
    public DailyVerificationRecordModel save(DailyVerificationRecordModel dailyVerificationRecordModel) {
        log.debug("Request to save DailyVerificationRecord : {}", dailyVerificationRecordModel);
        DailyVerificationRecord dailyVerificationRecord = dailyVerificationRecordMapper.toEntity(dailyVerificationRecordModel);
        if (dailyVerificationRecordModel.getGoHomeNotesReport() != null) {
            this.goHomeNotesReportContentStore.unsetContent(dailyVerificationRecord);
            ByteArrayInputStream inputStream = new ByteArrayInputStream(dailyVerificationRecordModel.getGoHomeNotesReport());
            this.goHomeNotesReportContentStore.setContent(dailyVerificationRecord, inputStream);
        }
        
        dailyVerificationRecord = dailyVerificationRecordRepository.save(dailyVerificationRecord);
        return dailyVerificationRecordMapper.toModel(dailyVerificationRecord);
    }

    /**
     * Get all dailyVerificationRecords.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DailyVerificationRecordModel> findAll() {
        log.debug("Request to get all DailyVerificationRecords");
        return dailyVerificationRecordRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(dailyVerificationRecordMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one dailyVerificationRecord by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<DailyVerificationRecordModel> findOne(Long id) {
        log.debug("Request to get DailyVerificationRecord : {}", id);
        Optional<DailyVerificationRecord> dailyVerificationRecord = this.dailyVerificationRecordRepository.findById(id);
        Optional<DailyVerificationRecordModel> model = dailyVerificationRecord.map(this.dailyVerificationRecordMapper::toModel);
        InputStream inputStream = this.goHomeNotesReportContentStore.getContent(dailyVerificationRecord.get());
        if (inputStream != null) {
            byte[] content = null;
            try {
                content = IOUtils.toByteArray(inputStream);
            } catch (IOException e) {
                log.error("I/O Error while retrieving Go Home Notes Report for Go Home Notes Report attribute of the Daily Verification Record Entity.");
            }
            model.get().setGoHomeNotesReport(content);
        }
        
        return model;
    }

    /**
     * Delete the dailyVerificationRecord by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DailyVerificationRecord : {}", id);
        dailyVerificationRecordRepository.deleteById(id);
    }
}
