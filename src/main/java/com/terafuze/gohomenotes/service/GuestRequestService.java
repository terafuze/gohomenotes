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

import com.terafuze.gohomenotes.domain.GuestRequest;
import com.terafuze.gohomenotes.repository.GuestRequestRepository;
import com.terafuze.gohomenotes.web.models.GuestRequestModel;
import com.terafuze.gohomenotes.web.mappers.GuestRequestMapper;




/**
 * Service Implementation for managing Guest Requests.
 */
@Service
@Transactional
public class GuestRequestService {

    private final Logger log = LoggerFactory.getLogger(GuestRequestService.class);

    private final GuestRequestRepository guestRequestRepository;

    private final GuestRequestMapper guestRequestMapper;

    

    public GuestRequestService(GuestRequestRepository guestRequestRepository, GuestRequestMapper guestRequestMapper) {
        this.guestRequestRepository = guestRequestRepository;
        this.guestRequestMapper = guestRequestMapper;
    }

    /**
     * Save a guestRequest.
     *
     * @param guestRequestModel the entity to save
     * @return the persisted entity
     */
    public GuestRequestModel save(GuestRequestModel guestRequestModel) {
        log.debug("Request to save GuestRequest : {}", guestRequestModel);
        GuestRequest guestRequest = guestRequestMapper.toEntity(guestRequestModel);
        guestRequest = guestRequestRepository.save(guestRequest);
        return guestRequestMapper.toModel(guestRequest);
    }

    /**
     * Get all guestRequests.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<GuestRequestModel> findAll() {
        log.debug("Request to get all GuestRequests");
        return guestRequestRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(guestRequestMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one guestRequest by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<GuestRequestModel> findOne(Long id) {
        log.debug("Request to get GuestRequest : {}", id);
        return guestRequestRepository.findById(id)
        	.map(guestRequestMapper::toModel);
    }

    /**
     * Delete the guestRequest by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete GuestRequest : {}", id);
        guestRequestRepository.deleteById(id);
    }
}
