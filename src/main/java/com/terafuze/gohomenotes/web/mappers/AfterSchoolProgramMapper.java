package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.AfterSchoolProgram;
import com.terafuze.gohomenotes.web.models.AfterSchoolProgramModel;

/**
 * Mapper for the After School Program domain model object to the After School Program Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AfterSchoolProgramMapper extends IEntityMapper<AfterSchoolProgramModel, AfterSchoolProgram> {

    @Mapping(source = "", target = "identifier")
    AfterSchoolProgramModel toModel(AfterSchoolProgram afterSchoolProgram);

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