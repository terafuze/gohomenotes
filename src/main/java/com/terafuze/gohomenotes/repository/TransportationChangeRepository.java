package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.TransportationChange;

/**
 * Spring Data JPA repository for the Transportation Change entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportationChangeRepository extends JpaRepository<TransportationChange, Long> {

}
