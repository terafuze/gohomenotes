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

import com.terafuze.gohomenotes.domain.HostRequest;
import com.terafuze.gohomenotes.repository.HostRequestRepository;
import com.terafuze.gohomenotes.web.models.HostRequestModel;
import com.terafuze.gohomenotes.web.mappers.HostRequestMapper;


/**
 * Service Implementation for managing Host Requests.
 */
@Service
@Transactional
public class HostRequestService {

    private final Logger log = LoggerFactory.getLogger(HostRequestService.class);

    private final HostRequestRepository hostRequestRepository;

    private final HostRequestMapper hostRequestMapper;

    

    public HostRequestService(HostRequestRepository hostRequestRepository, HostRequestMapper hostRequestMapper) {
        this.hostRequestRepository = hostRequestRepository;
        this.hostRequestMapper = hostRequestMapper;
    }

    /**
     * Save a hostRequest.
     *
     * @param hostRequestModel the entity to save
     * @return the persisted entity
     */
    public HostRequestModel save(HostRequestModel hostRequestModel) {
        log.debug("Request to save HostRequest : {}", hostRequestModel);
        HostRequest hostRequest = hostRequestMapper.toEntity(hostRequestModel);
        hostRequest = hostRequestRepository.save(hostRequest);
        return hostRequestMapper.toModel(hostRequest);
    }

    /**
     * Get all hostRequests.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<HostRequestModel> findAll() {
        log.debug("Request to get all HostRequests");
        return hostRequestRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(hostRequestMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one hostRequest by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<HostRequestModel> findOne(Long id) {
        log.debug("Request to get HostRequest : {}", id);
        Optional<HostRequest> hostRequest = this.hostRequestRepository.findById(id);
        Optional<HostRequestModel> model = hostRequest.map(this.hostRequestMapper::toModel);
        

        return model;
    }

    /**
     * Delete the hostRequest by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete HostRequest : {}", id);
        hostRequestRepository.deleteById(id);
    }
}
