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

import com.terafuze.gohomenotes.domain.Teacher;
import com.terafuze.gohomenotes.domain.UserProfile;
import com.terafuze.gohomenotes.repository.TeacherRepository;
import com.terafuze.gohomenotes.repository.UserProfileRepository;
import com.terafuze.gohomenotes.web.mappers.StudentMapper;
import com.terafuze.gohomenotes.web.mappers.TeacherMapper;
import com.terafuze.gohomenotes.web.mappers.UserProfileMapper;
import com.terafuze.gohomenotes.web.models.StudentModel;
import com.terafuze.gohomenotes.web.models.TeacherModel;

/**
 * Service Implementation for managing Teachers.
 */
@Service
@Transactional
public class TeacherService {

    private final Logger log = LoggerFactory.getLogger(TeacherService.class);

    private final TeacherRepository teacherRepository;

    private final TeacherMapper teacherMapper;

    @Autowired
    private final UserProfileMapper userProfileMapper = null;
    
    @Autowired
    private final StudentMapper studentMapper = null;
    
    @Autowired
    private final UserProfileRepository userProfileRepository = null;

    public TeacherService(TeacherRepository teacherRepository, TeacherMapper teacherMapper) {
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
    }

    /**
     * Save a teacher.
     *
     * @param teacherModel the entity to save
     * @return the persisted entity
     */
    public TeacherModel save(TeacherModel teacherModel) {
        log.debug("Request to save Teacher : {}", teacherModel);
        Teacher teacher = teacherMapper.toEntity(teacherModel);
        UserProfile userProfile = userProfileMapper.userProfileFromTeacherModel(teacherModel);
        userProfile = userProfileRepository.save(userProfile);
        userProfile.setTeacher(teacher);
        teacher = teacherRepository.save(teacher);
        return teacherMapper.toModel(teacher);
    }

    /**
     * Update a teacher.
     *
     * @param teacherModel the entity to save
     * @return the persisted entity
     */
    public TeacherModel updateTeacher(TeacherModel teacherModel) {
        log.debug("Request to save Teacher : {}", teacherModel);
        Teacher teacher = teacherMapper.toEntity(teacherModel);
        Optional<UserProfile> optional = userProfileRepository.findById(teacherModel.getUserProfileId());
        UserProfile userProfile = optional.get();
        userProfile = userProfileMapper.updateUserProfileFromTeacherModel(teacherModel, userProfile);
        teacher.setUserProfile(userProfile);
        teacher = teacherRepository.save(teacher);
        return teacherMapper.toModel(teacher);
    }
    
    /**
     * Get all teachers.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TeacherModel> findAll() {
        log.debug("Request to get all Teachers");
        return teacherRepository.findAll(new Sort(Sort.Direction.ASC, "id")).stream()
            .map(teacherMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all Students for a given Teacher
     *
     * @param id the id of an Teacher
     * @return list of Students that are owned by the Teacher
     */
    @Transactional(readOnly = true)
    public List<StudentModel> getStudents(Long id) {
        log.debug("Get Students for Teacher : {}", id);
        Optional<Teacher> teacher = teacherRepository.findById(id);
        return teacher.get().getStudents().stream()
            .map(studentMapper::toModel)
            .collect(Collectors.toCollection(LinkedList::new));
    }
    

    /**
     * Get one teacher by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TeacherModel> findOne(Long id) {
        log.debug("Request to get Teacher : {}", id);
        return teacherRepository.findById(id)
        	.map(teacherMapper::toModel);
    }

    /**
     * Delete the teacher by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Teacher : {}", id);
        teacherRepository.deleteById(id);
    }
}
