package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.TransportationChangeRequest;
import com.terafuze.gohomenotes.web.models.TransportationChangeRequestModel;

/**
 * Mapper for the Transportation Change Request domain model object to the Transportation Change Request Model.
 */
@Mapper(componentModel = "spring", uses = {DismissalLocationMapper.class, StudentMapper.class})
public interface TransportationChangeRequestMapper extends IEntityMapper<TransportationChangeRequestModel, TransportationChangeRequest> {

    @Mapping(source = "id", target = "identifier")
    @Mapping(source = "dismissalLocation.id", target = "dismissalLocationId")
    @Mapping(source = "dismissalLocation.name", target = "dismissalLocationIdentifier")
    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.firstName", target = "studentIdentifier")
    TransportationChangeRequestModel toModel(TransportationChangeRequest transportationChangeRequest);

    @Mapping(source = "dismissalLocationId", target = "dismissalLocation")
    @Mapping(source = "studentId", target = "student")
    TransportationChangeRequest toEntity(TransportationChangeRequestModel transportationChangeRequestModel);

    default TransportationChangeRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransportationChangeRequest transportationChangeRequest = new TransportationChangeRequest();
        transportationChangeRequest.setId(id);
        return transportationChangeRequest;
    }
}