package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.HostRequest;

/**
 * Spring Data JPA repository for the Host Request entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HostRequestRepository extends JpaRepository<HostRequest, Long> {

}
