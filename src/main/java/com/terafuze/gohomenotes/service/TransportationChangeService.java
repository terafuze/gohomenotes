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

import com.terafuze.gohomenotes.domain.TransportationChange;
import com.terafuze.gohomenotes.repository.TransportationChangeRepository;
import com.terafuze.gohomenotes.web.models.TransportationChangeModel;
import com.terafuze.gohomenotes.web.mappers.TransportationChangeMapper;




/**
 * Service Implementation for managing Transportation Changes.
 */
@Service
@Transactional
public class TransportationChangeService {

    private final Logger log = LoggerFactory.getLogger(TransportationChangeService.class);

    private final TransportationChangeRepository transportationChangeRepository;

    private final TransportationChangeMapper transportationChangeMapper;

    

    public TransportationChangeService(TransportationChangeRepository transportationChangeRepository, TransportationChangeMapper transportationChangeMapper) {
        this.transportationChangeRepository = transportationChangeRepository;
        this.transportationChangeMapper = transportationChangeMapper;
    }

    /**
     * Save a transportationChange.
     *
     * @param transportationChangeModel the entity to save
     * @return the persisted entity
     */
    public TransportationChangeModel save(TransportationChangeModel transportationChangeModel) {
        log.debug("Request to save TransportationChange : {}", transportationChangeModel);
        TransportationChange transportationChange = transportationChangeMapper.toEntity(transportationChangeModel);
        transportationChange = transportationChangeRepository.save(transportationChange);
        return transportationChangeMapper.toModel(transportationChange);
    }

    /**
     * Get all transportationChanges.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TransportationChangeModel> findAll() {
        log.debug("Request to get all TransportationChanges");
        return transportationChangeRepository.findAll(new Sort(Sort.Direction.ASC, "name")).stream()
            .map(transportationChangeMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one transportationChange by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TransportationChangeModel> findOne(Long id) {
        log.debug("Request to get TransportationChange : {}", id);
        return transportationChangeRepository.findById(id)
        	.map(transportationChangeMapper::toModel);
    }

    /**
     * Delete the transportationChange by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TransportationChange : {}", id);
        transportationChangeRepository.deleteById(id);
    }
}
