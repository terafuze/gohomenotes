package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.TransportationChange;

/**
 * Handle the content associated with a Transportation Change document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface TransportationChangeStore extends ContentStore<TransportationChange, String> {

}