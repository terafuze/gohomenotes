package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.Teacher;
import com.terafuze.gohomenotes.web.models.TeacherModel;

/**
 * Mapper for the Teacher domain model object to the Teacher Model.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class})
public interface TeacherMapper extends IEntityMapper<TeacherModel, Teacher> {

    @Mapping(source = "id", target = "identifier")
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "school.name", target = "schoolIdentifier")
    TeacherModel toModel(Teacher teacher);

    @Mapping(source = "schoolId", target = "school")
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