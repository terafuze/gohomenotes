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

import com.terafuze.gohomenotes.domain.Parent;
import com.terafuze.gohomenotes.repository.ParentRepository;
import com.terafuze.gohomenotes.web.models.ParentModel;
import com.terafuze.gohomenotes.web.mappers.ParentMapper;




/**
 * Service Implementation for managing Parents.
 */
@Service
@Transactional
public class ParentService {

    private final Logger log = LoggerFactory.getLogger(ParentService.class);

    private final ParentRepository parentRepository;

    private final ParentMapper parentMapper;

    

    public ParentService(ParentRepository parentRepository, ParentMapper parentMapper) {
        this.parentRepository = parentRepository;
        this.parentMapper = parentMapper;
    }

    /**
     * Save a parent.
     *
     * @param parentModel the entity to save
     * @return the persisted entity
     */
    public ParentModel save(ParentModel parentModel) {
        log.debug("Request to save Parent : {}", parentModel);
        Parent parent = parentMapper.toEntity(parentModel);
        parent = parentRepository.save(parent);
        return parentMapper.toModel(parent);
    }

    /**
     * Get all parents.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ParentModel> findAll() {
        log.debug("Request to get all Parents");
        return parentRepository.findAll(new Sort(Sort.Direction.ASC, "firstName")).stream()
            .map(parentMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Get one parent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ParentModel> findOne(Long id) {
        log.debug("Request to get Parent : {}", id);
        return parentRepository.findById(id)
        	.map(parentMapper::toModel);
    }

    /**
     * Delete the parent by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Parent : {}", id);
        parentRepository.deleteById(id);
    }
}
