package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.EarlyPickupRequest;
import com.terafuze.gohomenotes.web.models.EarlyPickupRequestModel;

/**
 * Mapper for the Early Pickup Request domain model object to the Early Pickup Request Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EarlyPickupRequestMapper extends IEntityMapper<EarlyPickupRequestModel, EarlyPickupRequest> {

    @Mapping(source = "id", target = "identifier")
    EarlyPickupRequestModel toModel(EarlyPickupRequest earlyPickupRequest);

    EarlyPickupRequest toEntity(EarlyPickupRequestModel earlyPickupRequestModel);

    default EarlyPickupRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        EarlyPickupRequest earlyPickupRequest = new EarlyPickupRequest();
        earlyPickupRequest.setId(id);
        return earlyPickupRequest;
    }
}