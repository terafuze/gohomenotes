package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.SchoolGrade;
import com.terafuze.gohomenotes.web.models.SchoolGradeModel;

/**
 * Mapper for the School Grade domain model object to the School Grade Model.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class})
public interface SchoolGradeMapper extends IEntityMapper<SchoolGradeModel, SchoolGrade> {

    @Mapping(source = "name", target = "identifier")
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "school.name", target = "schoolIdentifier")
    SchoolGradeModel toModel(SchoolGrade schoolGrade);

    @Mapping(source = "schoolId", target = "school")
    SchoolGrade toEntity(SchoolGradeModel schoolGradeModel);

    default SchoolGrade fromId(Long id) {
        if (id == null) {
            return null;
        }
        SchoolGrade schoolGrade = new SchoolGrade();
        schoolGrade.setId(id);
        return schoolGrade;
    }
}