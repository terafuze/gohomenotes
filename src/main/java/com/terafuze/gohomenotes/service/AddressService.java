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

import com.terafuze.gohomenotes.domain.Address;
import com.terafuze.gohomenotes.repository.AddressRepository;
import com.terafuze.gohomenotes.web.models.AddressModel;
import com.terafuze.gohomenotes.web.mappers.AddressMapper;
import com.terafuze.gohomenotes.web.mappers.UserProfileMapper;

import com.terafuze.gohomenotes.web.models.UserProfileModel;

import com.terafuze.gohomenotes.domain.UserProfile;


/**
 * Service Implementation for managing Addresses.
 */
@Service
@Transactional
public class AddressService {

    private final Logger log = LoggerFactory.getLogger(AddressService.class);

    private final AddressRepository addressRepository;

    private final AddressMapper addressMapper;

    @Autowired
    private final UserProfileMapper userProfileMapper = null;
    

    public AddressService(AddressRepository addressRepository, AddressMapper addressMapper) {
        this.addressRepository = addressRepository;
        this.addressMapper = addressMapper;
    }

    /**
     * Save a address.
     *
     * @param addressModel the entity to save
     * @return the persisted entity
     */
    public AddressModel save(AddressModel addressModel) {
        log.debug("Request to save Address : {}", addressModel);
        Address address = addressMapper.toEntity(addressModel);
        address = addressRepository.save(address);
        return addressMapper.toModel(address);
    }

    /**
     * Get all addresses.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<AddressModel> findAll() {
        log.debug("Request to get all Addresses");
        return addressRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(addressMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all User Profiles for a given Address
     *
     * @param id the id of an Address
     * @return list of User Profiles that are owned by the Address
     */
    @Transactional(readOnly = true)
    public List<UserProfileModel> getUserProfiles(Long id) {
        log.debug("Get User Profiles for Address : {}", id);
        Optional<Address> address = addressRepository.findById(id);
        return address.get().getUserProfiles().stream()
        	.map(userProfileMapper::toModel)
        	.collect(Collectors.toCollection(LinkedList::new));
    }
    

    /**
     * Get one address by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<AddressModel> findOne(Long id) {
        log.debug("Request to get Address : {}", id);
        return addressRepository.findById(id)
        	.map(addressMapper::toModel);
    }

    /**
     * Delete the address by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Address : {}", id);
        addressRepository.deleteById(id);
    }
}
