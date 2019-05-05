package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.SchoolGrade;
import com.terafuze.gohomenotes.web.models.SchoolGradeModel;

/**
 * Mapper for the School Grade domain model object to the School Grade Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SchoolGradeMapper extends IEntityMapper<SchoolGradeModel, SchoolGrade> {

    @Mapping(source = "", target = "identifier")
    SchoolGradeModel toModel(SchoolGrade schoolGrade);

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