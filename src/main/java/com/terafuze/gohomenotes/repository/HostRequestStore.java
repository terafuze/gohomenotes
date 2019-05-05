package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.HostRequest;

/**
 * Handle the content associated with a Host Request document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface HostRequestStore extends ContentStore<HostRequest, String> {

}