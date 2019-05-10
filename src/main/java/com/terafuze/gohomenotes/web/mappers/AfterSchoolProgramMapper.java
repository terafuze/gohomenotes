package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.AfterSchoolProgram;
import com.terafuze.gohomenotes.web.models.AfterSchoolProgramModel;

/**
 * Mapper for the After School Program domain model object to the After School Program Model.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class})
public interface AfterSchoolProgramMapper extends IEntityMapper<AfterSchoolProgramModel, AfterSchoolProgram> {

    @Mapping(source = "name", target = "identifier")
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "school.name", target = "schoolIdentifier")
    AfterSchoolProgramModel toModel(AfterSchoolProgram afterSchoolProgram);

    @Mapping(source = "schoolId", target = "school")
    AfterSchoolProgram toEntity(AfterSchoolProgramModel afterSchoolProgramModel);

    default AfterSchoolProgram fromId(Long id) {
        if (id == null) {
            return null;
        }
        AfterSchoolProgram afterSchoolProgram = new AfterSchoolProgram();
        afterSchoolProgram.setId(id);
        return afterSchoolProgram;
    }
}