package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.TransportationChangeRequest;

/**
 * Spring Data JPA repository for the Transportation Change Request entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportationChangeRequestRepository extends JpaRepository<TransportationChangeRequest, Long> {

}
