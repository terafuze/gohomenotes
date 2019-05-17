package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.Teacher;
import com.terafuze.gohomenotes.domain.UserProfile;
import com.terafuze.gohomenotes.web.models.TeacherModel;
import com.terafuze.gohomenotes.web.models.UserProfileModel;

/**
 * Mapper for the Teacher domain model object to the Teacher Model.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class, SchoolGradeMapper.class, UserProfileMapper.class})
public interface TeacherMapper extends IEntityMapper<TeacherModel, Teacher> {

    @Mapping(source = "id", target = "identifier")
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "school.name", target = "schoolIdentifier")
    @Mapping(source = "schoolGrade.id", target = "schoolGradeId")
    @Mapping(source = "schoolGrade.name", target = "schoolGradeIdentifier")
    @Mapping(source = "userProfile.id", target = "userProfileId")
    @Mapping(source = "userProfile.lastName", target = "userProfileIdentifier")
    @Mapping(source = "userProfile.lastName", target = "lastName")
    @Mapping(source = "userProfile.firstName", target = "firstName")
    @Mapping(source = "userProfile.emailAddress", target = "emailAddress")
    TeacherModel toModel(Teacher teacher);

    @Mapping(source = "schoolId", target = "school")
    @Mapping(source = "schoolGradeId", target = "schoolGrade")
    @Mapping(target = "students", ignore = true)
    @Mapping(source = "userProfileId", target = "userProfile")
    Teacher toEntity(TeacherModel teacherModel);
    
    default Teacher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(id);
        return teacher;
    }
}