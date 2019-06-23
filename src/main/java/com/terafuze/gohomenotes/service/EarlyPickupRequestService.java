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

import com.terafuze.gohomenotes.domain.EarlyPickupRequest;
import com.terafuze.gohomenotes.repository.EarlyPickupRequestRepository;
import com.terafuze.gohomenotes.web.models.EarlyPickupRequestModel;
import com.terafuze.gohomenotes.web.mappers.EarlyPickupRequestMapper;


/**
 * Service Implementation for managing Early Pickup Requests.
 */
@Service
@Transactional
public class EarlyPickupRequestService {

    private final Logger log = LoggerFactory.getLogger(EarlyPickupRequestService.class);

    private final EarlyPickupRequestRepository earlyPickupRequestRepository;

    private final EarlyPickupRequestMapper earlyPickupRequestMapper;

    

    public EarlyPickupRequestService(EarlyPickupRequestRepository earlyPickupRequestRepository, EarlyPickupRequestMapper earlyPickupRequestMapper) {
        this.earlyPickupRequestRepository = earlyPickupRequestRepository;
        this.earlyPickupRequestMapper = earlyPickupRequestMapper;
    }

    /**
     * Save a earlyPickupRequest.
     *
     * @param earlyPickupRequestModel the entity to save
     * @return the persisted entity
     */
    public EarlyPickupRequestModel save(EarlyPickupRequestModel earlyPickupRequestModel) {
        log.debug("Request to save EarlyPickupRequest : {}", earlyPickupRequestModel);
        EarlyPickupRequest earlyPickupRequest = earlyPickupRequestMapper.toEntity(earlyPickupRequestModel);
        earlyPickupRequest = earlyPickupRequestRepository.save(earlyPickupRequest);
        return earlyPickupRequestMapper.toModel(earlyPickupRequest);
    }

    /**
     * Get all earlyPickupRequests.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<EarlyPickupRequestModel> findAll() {
        log.debug("Request to get all EarlyPickupRequests");
        return earlyPickupRequestRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(earlyPickupRequestMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one earlyPickupRequest by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<EarlyPickupRequestModel> findOne(Long id) {
        log.debug("Request to get EarlyPickupRequest : {}", id);
        Optional<EarlyPickupRequest> earlyPickupRequest = this.earlyPickupRequestRepository.findById(id);
        Optional<EarlyPickupRequestModel> model = earlyPickupRequest.map(this.earlyPickupRequestMapper::toModel);
        return model;
    }

    /**
     * Delete the earlyPickupRequest by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete EarlyPickupRequest : {}", id);
        earlyPickupRequestRepository.deleteById(id);
    }
}
