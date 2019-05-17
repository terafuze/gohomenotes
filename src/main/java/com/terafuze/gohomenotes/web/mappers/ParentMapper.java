package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.Parent;
import com.terafuze.gohomenotes.web.models.ParentModel;

/**
 * Mapper for the Parent domain model object to the Parent Model.
 */
@Mapper(componentModel = "spring", uses = {UserProfileMapper.class})
public interface ParentMapper extends IEntityMapper<ParentModel, Parent> {

    @Mapping(source = "id", target = "identifier")
    @Mapping(source = "userProfile.id", target = "userProfileId")
    @Mapping(source = "userProfile.lastName", target = "lastName")
    @Mapping(source = "userProfile.firstName", target = "firstName")
    @Mapping(source = "userProfile.emailAddress", target = "emailAddress")
    @Mapping(source = "userProfile.primaryPhoneNumber", target = "primaryPhoneNumber")
    @Mapping(source = "userProfile.secondaryPhoneNumber", target = "secondaryPhoneNumber")
    ParentModel toModel(Parent parent);

    @Mapping(target = "students", ignore = true)
    @Mapping(target = "userProfile", ignore = true)
    Parent toEntity(ParentModel parentModel);

    default Parent fromId(Long id) {
        if (id == null) {
            return null;
        }
        Parent parent = new Parent();
        parent.setId(id);
        return parent;
    }
}