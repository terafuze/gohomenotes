package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.DismissalLocation;
import com.terafuze.gohomenotes.web.models.DismissalLocationModel;

/**
 * Mapper for the Dismissal Location domain model object to the Dismissal Location Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DismissalLocationMapper extends IEntityMapper<DismissalLocationModel, DismissalLocation> {

    @Mapping(source = "", target = "identifier")
    DismissalLocationModel toModel(DismissalLocation dismissalLocation);

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