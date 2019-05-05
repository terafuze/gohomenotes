package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.AfterSchoolProgram;

/**
 * Spring Data JPA repository for the After School Program entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AfterSchoolProgramRepository extends JpaRepository<AfterSchoolProgram, Long> {

}
