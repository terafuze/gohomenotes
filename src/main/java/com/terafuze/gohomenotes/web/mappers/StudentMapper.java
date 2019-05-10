package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.Student;
import com.terafuze.gohomenotes.web.models.StudentModel;

/**
 * Mapper for the Student domain model object to the Student Model.
 */
@Mapper(componentModel = "spring", uses = {FamilyMapper.class, SchoolMapper.class, SchoolGradeMapper.class})
public interface StudentMapper extends IEntityMapper<StudentModel, Student> {

    @Mapping(source = "firstName", target = "identifier")
    @Mapping(source = "family.id", target = "familyId")
    @Mapping(source = "family.id", target = "familyIdentifier")
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "school.name", target = "schoolIdentifier")
    @Mapping(source = "schoolGrade.id", target = "schoolGradeId")
    @Mapping(source = "schoolGrade.name", target = "schoolGradeIdentifier")
    StudentModel toModel(Student student);

    @Mapping(source = "familyId", target = "family")
    @Mapping(source = "schoolId", target = "school")
    @Mapping(source = "schoolGradeId", target = "schoolGrade")
    Student toEntity(StudentModel studentModel);

    default Student fromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}