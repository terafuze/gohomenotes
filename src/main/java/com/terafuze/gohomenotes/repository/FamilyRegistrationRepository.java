package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.FamilyRegistration;

/**
 * Spring Data JPA repository for the Family Registration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FamilyRegistrationRepository extends JpaRepository<FamilyRegistration, Long> {

}
