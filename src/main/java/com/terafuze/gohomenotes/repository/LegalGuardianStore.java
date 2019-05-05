package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.LegalGuardian;

/**
 * Handle the content associated with a Legal Guardian document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface LegalGuardianStore extends ContentStore<LegalGuardian, String> {

}