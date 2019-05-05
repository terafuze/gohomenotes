package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.SchoolGrade;

/**
 * Handle the content associated with a School Grade document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface SchoolGradeStore extends ContentStore<SchoolGrade, String> {

}