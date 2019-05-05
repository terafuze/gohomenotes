package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.DismissalLocation;

/**
 * Spring Data JPA repository for the Dismissal Location entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DismissalLocationRepository extends JpaRepository<DismissalLocation, Long> {

}
