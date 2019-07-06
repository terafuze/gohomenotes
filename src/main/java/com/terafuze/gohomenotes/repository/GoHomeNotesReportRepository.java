package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.GoHomeNotesReport;

/**
 * Spring Data JPA repository for the Go Home Notes Report entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GoHomeNotesReportRepository extends JpaRepository<GoHomeNotesReport, Long> {

}
