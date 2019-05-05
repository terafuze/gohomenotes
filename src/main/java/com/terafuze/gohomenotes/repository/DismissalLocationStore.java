package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.DismissalLocation;

/**
 * Handle the content associated with a Dismissal Location document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface DismissalLocationStore extends ContentStore<DismissalLocation, String> {

}