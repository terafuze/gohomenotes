package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.HostRequest;
import com.terafuze.gohomenotes.web.models.HostRequestModel;

/**
 * Mapper for the Host Request domain model object to the Host Request Model.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class})
public interface HostRequestMapper extends IEntityMapper<HostRequestModel, HostRequest> {

    @Mapping(source = "id", target = "identifier")
    @Mapping(source = "guestStudent.id", target = "guestStudentId")
    @Mapping(source = "guestStudent.firstName", target = "guestStudentIdentifier")
    @Mapping(source = "hostStudent.id", target = "hostStudentId")
    @Mapping(source = "hostStudent.firstName", target = "hostStudentIdentifier")
    HostRequestModel toModel(HostRequest hostRequest);

    @Mapping(source = "guestStudentId", target = "guestStudent")
    @Mapping(source = "hostStudentId", target = "hostStudent")
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