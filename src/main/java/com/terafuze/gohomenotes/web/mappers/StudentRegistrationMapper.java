package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.StudentRegistration;
import com.terafuze.gohomenotes.web.models.StudentRegistrationModel;

/**
 * Mapper for the Student Registration domain model object to the Student Registration Model.
 */
@Mapper(componentModel = "spring", uses = {FamilyRegistrationMapper.class, SchoolGradeMapper.class})
public interface StudentRegistrationMapper extends IEntityMapper<StudentRegistrationModel, StudentRegistration> {

    @Mapping(source = "lastName", target = "identifier")
    @Mapping(source = "familyRegistration.id", target = "familyRegistrationId")
    @Mapping(source = "familyRegistration.id", target = "familyRegistrationIdentifier")
    @Mapping(source = "schoolGrade.id", target = "schoolGradeId")
    @Mapping(source = "schoolGrade.name", target = "schoolGradeIdentifier")
    StudentRegistrationModel toModel(StudentRegistration studentRegistration);

    @Mapping(source = "familyRegistrationId", target = "familyRegistration")
    @Mapping(source = "schoolGradeId", target = "schoolGrade")
    StudentRegistration toEntity(StudentRegistrationModel studentRegistrationModel);

    default StudentRegistration fromId(Long id) {
        if (id == null) {
            return null;
        }
        StudentRegistration studentRegistration = new StudentRegistration();
        studentRegistration.setId(id);
        return studentRegistration;
    }
}