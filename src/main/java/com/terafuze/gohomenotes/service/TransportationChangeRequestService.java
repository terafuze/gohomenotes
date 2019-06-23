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

import com.terafuze.gohomenotes.domain.TransportationChangeRequest;
import com.terafuze.gohomenotes.repository.TransportationChangeRequestRepository;
import com.terafuze.gohomenotes.web.models.TransportationChangeRequestModel;
import com.terafuze.gohomenotes.web.mappers.TransportationChangeRequestMapper;


/**
 * Service Implementation for managing Transportation Change Requests.
 */
@Service
@Transactional
public class TransportationChangeRequestService {

    private final Logger log = LoggerFactory.getLogger(TransportationChangeRequestService.class);

    private final TransportationChangeRequestRepository transportationChangeRequestRepository;

    private final TransportationChangeRequestMapper transportationChangeRequestMapper;

    

    public TransportationChangeRequestService(TransportationChangeRequestRepository transportationChangeRequestRepository, TransportationChangeRequestMapper transportationChangeRequestMapper) {
        this.transportationChangeRequestRepository = transportationChangeRequestRepository;
        this.transportationChangeRequestMapper = transportationChangeRequestMapper;
    }

    /**
     * Save a transportationChangeRequest.
     *
     * @param transportationChangeRequestModel the entity to save
     * @return the persisted entity
     */
    public TransportationChangeRequestModel save(TransportationChangeRequestModel transportationChangeRequestModel) {
        log.debug("Request to save TransportationChangeRequest : {}", transportationChangeRequestModel);
        TransportationChangeRequest transportationChangeRequest = transportationChangeRequestMapper.toEntity(transportationChangeRequestModel);
        
        transportationChangeRequest = transportationChangeRequestRepository.save(transportationChangeRequest);
        return transportationChangeRequestMapper.toModel(transportationChangeRequest);
    }

    /**
     * Get all transportationChangeRequests.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TransportationChangeRequestModel> findAll() {
        log.debug("Request to get all TransportationChangeRequests");
        return transportationChangeRequestRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(transportationChangeRequestMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one transportationChangeRequest by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TransportationChangeRequestModel> findOne(Long id) {
        log.debug("Request to get TransportationChangeRequest : {}", id);
        Optional<TransportationChangeRequest> transportationChangeRequest = this.transportationChangeRequestRepository.findById(id);
        Optional<TransportationChangeRequestModel> model = transportationChangeRequest.map(this.transportationChangeRequestMapper::toModel);
        

        return model;
    }

    /**
     * Delete the transportationChangeRequest by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TransportationChangeRequest : {}", id);
        transportationChangeRequestRepository.deleteById(id);
    }
}
