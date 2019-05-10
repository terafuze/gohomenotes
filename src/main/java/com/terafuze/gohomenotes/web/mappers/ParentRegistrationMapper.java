package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.ParentRegistration;
import com.terafuze.gohomenotes.web.models.ParentRegistrationModel;

/**
 * Mapper for the Parent Registration domain model object to the Parent Registration Model.
 */
@Mapper(componentModel = "spring", uses = {FamilyRegistrationMapper.class})
public interface ParentRegistrationMapper extends IEntityMapper<ParentRegistrationModel, ParentRegistration> {

    @Mapping(source = "lastName", target = "identifier")
    @Mapping(source = "familyRegistration.id", target = "familyRegistrationId")
    @Mapping(source = "familyRegistration.id", target = "familyRegistrationIdentifier")
    ParentRegistrationModel toModel(ParentRegistration parentRegistration);

    @Mapping(source = "familyRegistrationId", target = "familyRegistration")
    ParentRegistration toEntity(ParentRegistrationModel parentRegistrationModel);

    default ParentRegistration fromId(Long id) {
        if (id == null) {
            return null;
        }
        ParentRegistration parentRegistration = new ParentRegistration();
        parentRegistration.setId(id);
        return parentRegistration;
    }
}