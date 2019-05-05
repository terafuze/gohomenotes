package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.GuestRequest;

/**
 * Handle the content associated with a Guest Request document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface GuestRequestStore extends ContentStore<GuestRequest, String> {

}