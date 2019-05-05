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

import com.terafuze.gohomenotes.domain.DismissalLocation;
import com.terafuze.gohomenotes.repository.DismissalLocationRepository;
import com.terafuze.gohomenotes.web.models.DismissalLocationModel;
import com.terafuze.gohomenotes.web.mappers.DismissalLocationMapper;




/**
 * Service Implementation for managing Dismissal Locations.
 */
@Service
@Transactional
public class DismissalLocationService {

    private final Logger log = LoggerFactory.getLogger(DismissalLocationService.class);

    private final DismissalLocationRepository dismissalLocationRepository;

    private final DismissalLocationMapper dismissalLocationMapper;

    

    public DismissalLocationService(DismissalLocationRepository dismissalLocationRepository, DismissalLocationMapper dismissalLocationMapper) {
        this.dismissalLocationRepository = dismissalLocationRepository;
        this.dismissalLocationMapper = dismissalLocationMapper;
    }

    /**
     * Save a dismissalLocation.
     *
     * @param dismissalLocationModel the entity to save
     * @return the persisted entity
     */
    public DismissalLocationModel save(DismissalLocationModel dismissalLocationModel) {
        log.debug("Request to save DismissalLocation : {}", dismissalLocationModel);
        DismissalLocation dismissalLocation = dismissalLocationMapper.toEntity(dismissalLocationModel);
        dismissalLocation = dismissalLocationRepository.save(dismissalLocation);
        return dismissalLocationMapper.toModel(dismissalLocation);
    }

    /**
     * Get all dismissalLocations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DismissalLocationModel> findAll() {
        log.debug("Request to get all DismissalLocations");
        return dismissalLocationRepository.findAll(new Sort(Sort.Direction.ASC, "name")).stream()
            .map(dismissalLocationMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one dismissalLocation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<DismissalLocationModel> findOne(Long id) {
        log.debug("Request to get DismissalLocation : {}", id);
        return dismissalLocationRepository.findById(id)
        	.map(dismissalLocationMapper::toModel);
    }

    /**
     * Delete the dismissalLocation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DismissalLocation : {}", id);
        dismissalLocationRepository.deleteById(id);
    }
}
