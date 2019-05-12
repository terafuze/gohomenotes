package com.terafuze.gohomenotes.web.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.Api;
import io.github.jhipster.web.util.ResponseUtil;

import com.terafuze.gohomenotes.web.errors.BadRequestAlertException;
import com.terafuze.gohomenotes.web.utils.HeaderUtil;

import com.terafuze.gohomenotes.service.AddressService;
import com.terafuze.gohomenotes.web.models.AddressModel;
import com.terafuze.gohomenotes.web.models.UserProfileModel;


/**
 * REST controller for managing Addresses.
 */
@RestController
@RequestMapping("/api")
@Api(tags = {"address-resource"})
public class AddressRestController {

    private final Logger log = LoggerFactory.getLogger(AddressRestController.class);

    private static final String ENTITY_NAME = "address";

    private final AddressService addressService;

    public AddressRestController(AddressService addressService) {
        this.addressService = addressService;
    }

    /**
     * POST  /addresses : Create a Address.
     *
     * @param Address Model the Address Model to create
     * @return the ResponseEntity with status 201 (Created) and with body the new addressModel, or with status 400 (Bad Request) if the address has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/addresses")
    @Timed
    public ResponseEntity<AddressModel> createAddress(@Valid @RequestBody AddressModel addressModel) throws URISyntaxException {
        log.debug("REST request to save Address : {}", addressModel);
        if (addressModel.getId() != null) {
            throw new BadRequestAlertException("A new address cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AddressModel result = addressService.save(addressModel);
        return ResponseEntity.created(new URI("/api/addresses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /addresses : Updates an existing address.
     *
     * @param Address Model the Address Model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated addressModel,
     * or with status 400 (Bad Request) if the Address Model is not valid,
     * or with status 500 (Internal Server Error) if the Address Model couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/addresses")
    @Timed
    public ResponseEntity<AddressModel> updateAddress(@Valid @RequestBody AddressModel addressModel) throws URISyntaxException {
        log.debug("REST request to update Address : {}", addressModel);
        if (addressModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AddressModel result = addressService.save(addressModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, addressModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /addresses : get all Addresss.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of addresss in body
     */
    @GetMapping("/addresses")
    @Timed
    public List<AddressModel> getAllAddresss() {
        log.debug("REST request to get all Addresss");
        return addressService.findAll();
    }

    /**
     * GET  /addresses/:id/user-profiles : get all User Profile for a given Address.
     *
     * @param id the id of an existing Address
     * @return a ResponseEntity with status 200 (OK) and with body of User Profiles for the Address or with status 404 if the Address does not exist for the given ID.
     */
    @GetMapping("/addresses/{id}/user-profiles")
    @Timed
    public List<UserProfileModel> getUserProfiles(@PathVariable Long id) {
        log.debug("REST request to get all User Profileses for Address : {}", id);
        return addressService.getUserProfiles(id);
    }
    /**
     * GET  /addresses/:id : get the Address for a given "id".
     *
     * @param id the id of an existing address
     * @return the ResponseEntity with status 200 (OK) and with body the Address Model, or with status 404 (Not Found)
     */
    @GetMapping("/addresses/{id}")
    @Timed
    public ResponseEntity<AddressModel> getAddress(@PathVariable Long id) {
        log.debug("REST request to get Address : {}", id);
        Optional<AddressModel> addressModel = addressService.findOne(id);
        return ResponseUtil.wrapOrNotFound(addressModel);
    }

    /**
     * DELETE  /addresses/:id : delete the "id" address.
     *
     * @param id the id of the Address Model to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/addresses/{id}")
    @Timed
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        log.debug("REST request to delete Address : {}", id);
        addressService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
