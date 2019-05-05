package com.terafuze.gohomenotes.repository;

import org.springframework.content.commons.repository.ContentStore;

import com.terafuze.gohomenotes.domain.Teacher;

/**
 * Handle the content associated with a Teacher document.
 *
 * ContentStore provides several methos for handling content: setContent, getContent, and unsetContent.
 */
public interface TeacherStore extends ContentStore<Teacher, String> {

}