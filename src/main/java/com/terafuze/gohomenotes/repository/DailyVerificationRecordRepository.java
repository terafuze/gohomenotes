package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.DailyVerificationRecord;

/**
 * Spring Data JPA repository for the Daily Verification Record entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DailyVerificationRecordRepository extends JpaRepository<DailyVerificationRecord, Long> {

}
