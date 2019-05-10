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
import org.springframework.beans.factory.annotation.Autowired;

import com.terafuze.gohomenotes.domain.LegalGuardian;
import com.terafuze.gohomenotes.repository.LegalGuardianRepository;
import com.terafuze.gohomenotes.web.models.LegalGuardianModel;
import com.terafuze.gohomenotes.web.mappers.LegalGuardianMapper;




/**
 * Service Implementation for managing Legal Guardians.
 */
@Service
@Transactional
public class LegalGuardianService {

    private final Logger log = LoggerFactory.getLogger(LegalGuardianService.class);

    private final LegalGuardianRepository legalGuardianRepository;

    private final LegalGuardianMapper legalGuardianMapper;

    

    public LegalGuardianService(LegalGuardianRepository legalGuardianRepository, LegalGuardianMapper legalGuardianMapper) {
        this.legalGuardianRepository = legalGuardianRepository;
        this.legalGuardianMapper = legalGuardianMapper;
    }

    /**
     * Save a legalGuardian.
     *
     * @param legalGuardianModel the entity to save
     * @return the persisted entity
     */
    public LegalGuardianModel save(LegalGuardianModel legalGuardianModel) {
        log.debug("Request to save LegalGuardian : {}", legalGuardianModel);
        LegalGuardian legalGuardian = legalGuardianMapper.toEntity(legalGuardianModel);
        legalGuardian = legalGuardianRepository.save(legalGuardian);
        return legalGuardianMapper.toModel(legalGuardian);
    }

    /**
     * Get all legalGuardians.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<LegalGuardianModel> findAll() {
        log.debug("Request to get all LegalGuardians");
        return legalGuardianRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(legalGuardianMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one legalGuardian by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<LegalGuardianModel> findOne(Long id) {
        log.debug("Request to get LegalGuardian : {}", id);
        return legalGuardianRepository.findById(id)
        	.map(legalGuardianMapper::toModel);
    }

    /**
     * Delete the legalGuardian by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete LegalGuardian : {}", id);
        legalGuardianRepository.deleteById(id);
    }
}
