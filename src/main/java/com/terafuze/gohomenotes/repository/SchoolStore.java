package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.School;

/**
 * Handle the content associated with a School document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface SchoolStore extends ContentStore<School, String> {

}