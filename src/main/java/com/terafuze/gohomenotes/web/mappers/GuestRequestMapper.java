package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.GuestRequest;
import com.terafuze.gohomenotes.web.models.GuestRequestModel;

/**
 * Mapper for the Guest Request domain model object to the Guest Request Model.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class})
public interface GuestRequestMapper extends IEntityMapper<GuestRequestModel, GuestRequest> {

    @Mapping(source = "id", target = "identifier")
    @Mapping(source = "guestStudent.id", target = "guestStudentId")
    @Mapping(source = "guestStudent.firstName", target = "guestStudentIdentifier")
    @Mapping(source = "hostStudent.id", target = "hostStudentId")
    @Mapping(source = "hostStudent.firstName", target = "hostStudentIdentifier")
    GuestRequestModel toModel(GuestRequest guestRequest);

    @Mapping(source = "guestStudentId", target = "guestStudent")
    @Mapping(source = "hostStudentId", target = "hostStudent")
    GuestRequest toEntity(GuestRequestModel guestRequestModel);

    default GuestRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        GuestRequest guestRequest = new GuestRequest();
        guestRequest.setId(id);
        return guestRequest;
    }
}