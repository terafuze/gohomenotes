package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.TransportationChange;
import com.terafuze.gohomenotes.web.models.TransportationChangeModel;

/**
 * Mapper for the Transportation Change domain model object to the Transportation Change Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransportationChangeMapper extends IEntityMapper<TransportationChangeModel, TransportationChange> {

    @Mapping(source = "id", target = "identifier")
    TransportationChangeModel toModel(TransportationChange transportationChange);

    TransportationChange toEntity(TransportationChangeModel transportationChangeModel);

    default TransportationChange fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransportationChange transportationChange = new TransportationChange();
        transportationChange.setId(id);
        return transportationChange;
    }
}