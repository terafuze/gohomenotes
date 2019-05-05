package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.LegalGuardian;

/**
 * Spring Data JPA repository for the Legal Guardian entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LegalGuardianRepository extends JpaRepository<LegalGuardian, Long> {

}
