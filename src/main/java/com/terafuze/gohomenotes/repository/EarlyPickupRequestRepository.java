package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.EarlyPickupRequest;

/**
 * Spring Data JPA repository for the Early Pickup Request entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EarlyPickupRequestRepository extends JpaRepository<EarlyPickupRequest, Long> {

}
