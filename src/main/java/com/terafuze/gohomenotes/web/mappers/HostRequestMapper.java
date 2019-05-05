package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.HostRequest;
import com.terafuze.gohomenotes.web.models.HostRequestModel;

/**
 * Mapper for the Host Request domain model object to the Host Request Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HostRequestMapper extends IEntityMapper<HostRequestModel, HostRequest> {

    @Mapping(source = "", target = "identifier")
    HostRequestModel toModel(HostRequest hostRequest);

    HostRequest toEntity(HostRequestModel hostRequestModel);

    default HostRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        HostRequest hostRequest = new HostRequest();
        hostRequest.setId(id);
        return hostRequest;
    }
}