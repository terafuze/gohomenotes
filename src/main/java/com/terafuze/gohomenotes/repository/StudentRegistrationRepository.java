package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.StudentRegistration;

/**
 * Spring Data JPA repository for the Student Registration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRegistrationRepository extends JpaRepository<StudentRegistration, Long> {

}
