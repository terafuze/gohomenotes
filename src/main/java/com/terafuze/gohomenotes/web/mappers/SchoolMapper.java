package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.School;
import com.terafuze.gohomenotes.web.models.SchoolModel;

/**
 * Mapper for the School domain model object to the School Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SchoolMapper extends IEntityMapper<SchoolModel, School> {

    @Mapping(source = "name", target = "identifier")
    SchoolModel toModel(School school);

    @Mapping(target = "students", ignore = true)
    School toEntity(SchoolModel schoolModel);

    default School fromId(Long id) {
        if (id == null) {
            return null;
        }
        School school = new School();
        school.setId(id);
        return school;
    }
}