package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.DailyVerificationRecord;

/**
 * Handle the content associated with a Daily Verification Record document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface DailyVerificationRecordStore extends ContentStore<DailyVerificationRecord, String> {

}