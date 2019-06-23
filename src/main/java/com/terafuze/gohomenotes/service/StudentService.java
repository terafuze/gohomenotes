package com.terafuze.gohomenotes.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.terafuze.gohomenotes.domain.Parent;
import com.terafuze.gohomenotes.domain.Student;
import com.terafuze.gohomenotes.repository.ParentRepository;
import com.terafuze.gohomenotes.repository.StudentRepository;
import com.terafuze.gohomenotes.web.mappers.ParentMapper;
import com.terafuze.gohomenotes.web.mappers.StudentMapper;
import com.terafuze.gohomenotes.web.models.ParentModel;
import com.terafuze.gohomenotes.web.models.StudentModel;


/**
 * Service Implementation for managing Students.
 */
@Service
@Transactional
public class StudentService {

    private final Logger log = LoggerFactory.getLogger(StudentService.class);

    private final ParentRepository parentRepository;
    
    private final StudentRepository studentRepository;

    private final StudentMapper studentMapper;

    @Autowired
    private final ParentMapper parentMapper = null;
	
    public StudentService(
    		ParentRepository parentRepository,
    		StudentRepository studentRepository, 
    		StudentMapper studentMapper) {
    	this.parentRepository = parentRepository;
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }

    /**
     * Save a student.
     *
     * @param studentModel the entity to save
     * @return the persisted entity
     */
    public StudentModel save(StudentModel studentModel) {
        log.debug("Request to save Student : {}", studentModel);
        Student student = studentMapper.toEntity(studentModel);
        student = studentRepository.save(student);
        Optional<Parent> optional = parentRepository.findById(studentModel.getParentId());
        Parent parent = optional.get();
        parent.addStudent(student);
        return studentMapper.toModel(student);
    }

    /**
     * Get all students.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<StudentModel> findAll() {
        log.debug("Request to get all Students");
        return studentRepository.findAll(new Sort(Sort.Direction.ASC, "firstName")).stream()
            .map(studentMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all Parents for a given Student
     *
     * @param id the id of an Student
     * @return list of Parents that are owned by the Student
     */
    @Transactional(readOnly = true)
    public List<ParentModel> getParents(Long id) {
        log.debug("Get Parents for Student : {}", id);
        Optional<Student> student = studentRepository.findById(id);
        return student.get().getParents().stream()
            .map(parentMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }
    

    /**
     * Get one student by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<StudentModel> findOne(Long id) {
        log.debug("Request to get Student : {}", id);
        return studentRepository.findById(id)
            .map(studentMapper::toModel);
    }

    /**
     * Delete the student by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Student : {}", id);
        studentRepository.deleteById(id);
    }
}
