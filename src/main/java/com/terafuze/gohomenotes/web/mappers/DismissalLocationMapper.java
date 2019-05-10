package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.DismissalLocation;
import com.terafuze.gohomenotes.web.models.DismissalLocationModel;

/**
 * Mapper for the Dismissal Location domain model object to the Dismissal Location Model.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class})
public interface DismissalLocationMapper extends IEntityMapper<DismissalLocationModel, DismissalLocation> {

    @Mapping(source = "name", target = "identifier")
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "school.name", target = "schoolIdentifier")
    DismissalLocationModel toModel(DismissalLocation dismissalLocation);

    @Mapping(source = "schoolId", target = "school")
    DismissalLocation toEntity(DismissalLocationModel dismissalLocationModel);

    default DismissalLocation fromId(Long id) {
        if (id == null) {
            return null;
        }
        DismissalLocation dismissalLocation = new DismissalLocation();
        dismissalLocation.setId(id);
        return dismissalLocation;
    }
}