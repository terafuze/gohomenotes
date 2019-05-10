package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.ParentRegistration;

/**
 * Spring Data JPA repository for the Parent Registration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParentRegistrationRepository extends JpaRepository<ParentRegistration, Long> {

}
