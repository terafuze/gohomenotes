package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.AfterSchoolProgram;

/**
 * Handle the content associated with a After School Program document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface AfterSchoolProgramStore extends ContentStore<AfterSchoolProgram, String> {

}