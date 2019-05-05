package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.EarlyPickupRequest;

/**
 * Handle the content associated with a Early Pickup Request document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface EarlyPickupRequestStore extends ContentStore<EarlyPickupRequest, String> {

}