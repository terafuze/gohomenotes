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

import com.terafuze.gohomenotes.domain.Family;
import com.terafuze.gohomenotes.repository.FamilyRepository;
import com.terafuze.gohomenotes.web.models.FamilyModel;
import com.terafuze.gohomenotes.web.mappers.FamilyMapper;
import com.terafuze.gohomenotes.web.mappers.StudentMapper;
import com.terafuze.gohomenotes.web.mappers.ParentMapper;

import com.terafuze.gohomenotes.web.models.StudentModel;
import com.terafuze.gohomenotes.web.models.ParentModel;

import com.terafuze.gohomenotes.domain.Student;
import com.terafuze.gohomenotes.domain.Parent;


/**
 * Service Implementation for managing Families.
 */
@Service
@Transactional
public class FamilyService {

    private final Logger log = LoggerFactory.getLogger(FamilyService.class);

    private final FamilyRepository familyRepository;

    private final FamilyMapper familyMapper;

    @Autowired
    private final StudentMapper studentMapper = null;
    @Autowired
    private final ParentMapper parentMapper = null;
    

    public FamilyService(FamilyRepository familyRepository, FamilyMapper familyMapper) {
        this.familyRepository = familyRepository;
        this.familyMapper = familyMapper;
    }

    /**
     * Save a family.
     *
     * @param familyModel the entity to save
     * @return the persisted entity
     */
    public FamilyModel save(FamilyModel familyModel) {
        log.debug("Request to save Family : {}", familyModel);
        Family family = familyMapper.toEntity(familyModel);
        family = familyRepository.save(family);
        return familyMapper.toModel(family);
    }

    /**
     * Get all families.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FamilyModel> findAll() {
        log.debug("Request to get all Families");
        return familyRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(familyMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all Students for a given Family
     *
     * @param id the id of an Family
     * @return list of Students that are owned by the Family
     */
    @Transactional(readOnly = true)
    public List<StudentModel> getStudents(Long id) {
        log.debug("Get Students for Family : {}", id);
        Optional<Family> family = familyRepository.findById(id);
        return family.get().getChildren().stream()
        	.map(studentMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    /**
     * Get all Parents for a given Family
     *
     * @param id the id of an Family
     * @return list of Parents that are owned by the Family
     */
    @Transactional(readOnly = true)
    public List<ParentModel> getParents(Long id) {
        log.debug("Get Parents for Family : {}", id);
        Optional<Family> family = familyRepository.findById(id);
        return family.get().getParent().stream()
        	.map(parentMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    

    /**
     * Get one family by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<FamilyModel> findOne(Long id) {
        log.debug("Request to get Family : {}", id);
        return familyRepository.findById(id)
        	.map(familyMapper::toModel);
    }

    /**
     * Delete the family by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Family : {}", id);
        familyRepository.deleteById(id);
    }
}
