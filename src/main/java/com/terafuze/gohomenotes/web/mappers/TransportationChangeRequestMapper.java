package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.TransportationChangeRequest;
import com.terafuze.gohomenotes.web.models.TransportationChangeRequestModel;

/**
 * Mapper for the Transportation Change Request domain model object to the Transportation Change Request Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransportationChangeRequestMapper extends IEntityMapper<TransportationChangeRequestModel, TransportationChangeRequest> {

    @Mapping(source = "id", target = "identifier")
    TransportationChangeRequestModel toModel(TransportationChangeRequest transportationChangeRequest);

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