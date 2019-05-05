package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.SchoolGrade;

/**
 * Spring Data JPA repository for the School Grade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchoolGradeRepository extends JpaRepository<SchoolGrade, Long> {

}
