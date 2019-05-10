package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.DailyVerificationRecord;

/**
 * Handle the content associated with a Go Home Notes Report document.
 *
 * ContentStore provides several methods for handling content: setContent, getContent, and unsetContent.
 */
public interface GoHomeNotesReportStore extends ContentStore<DailyVerificationRecord, String> {

}