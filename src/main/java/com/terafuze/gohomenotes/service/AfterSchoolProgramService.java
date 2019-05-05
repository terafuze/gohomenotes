package com.terafuze.gohomenotes.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.terafuze.gohomenotes.domain.AfterSchoolProgram;
import com.terafuze.gohomenotes.repository.AfterSchoolProgramRepository;
import com.terafuze.gohomenotes.web.models.AfterSchoolProgramModel;
import com.terafuze.gohomenotes.web.mappers.AfterSchoolProgramMapper;




/**
 * Service Implementation for managing After School Programs.
 */
@Service
@Transactional
public class AfterSchoolProgramService {

    private final Logger log = LoggerFactory.getLogger(AfterSchoolProgramService.class);

    private final AfterSchoolProgramRepository afterSchoolProgramRepository;

    private final AfterSchoolProgramMapper afterSchoolProgramMapper;

    

    public AfterSchoolProgramService(AfterSchoolProgramRepository afterSchoolProgramRepository, AfterSchoolProgramMapper afterSchoolProgramMapper) {
        this.afterSchoolProgramRepository = afterSchoolProgramRepository;
        this.afterSchoolProgramMapper = afterSchoolProgramMapper;
    }

    /**
     * Save a afterSchoolProgram.
     *
     * @param afterSchoolProgramModel the entity to save
     * @return the persisted entity
     */
    public AfterSchoolProgramModel save(AfterSchoolProgramModel afterSchoolProgramModel) {
        log.debug("Request to save AfterSchoolProgram : {}", afterSchoolProgramModel);
        AfterSchoolProgram afterSchoolProgram = afterSchoolProgramMapper.toEntity(afterSchoolProgramModel);
        afterSchoolProgram = afterSchoolProgramRepository.save(afterSchoolProgram);
        return afterSchoolProgramMapper.toModel(afterSchoolProgram);
    }

    /**
     * Get all afterSchoolPrograms.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<AfterSchoolProgramModel> findAll() {
        log.debug("Request to get all AfterSchoolPrograms");
        return afterSchoolProgramRepository.findAll(new Sort(Sort.Direction.ASC, "name")).stream()
            .map(afterSchoolProgramMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one afterSchoolProgram by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<AfterSchoolProgramModel> findOne(Long id) {
        log.debug("Request to get AfterSchoolProgram : {}", id);
        return afterSchoolProgramRepository.findById(id)
        	.map(afterSchoolProgramMapper::toModel);
    }

    /**
     * Delete the afterSchoolProgram by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete AfterSchoolProgram : {}", id);
        afterSchoolProgramRepository.deleteById(id);
    }
}
