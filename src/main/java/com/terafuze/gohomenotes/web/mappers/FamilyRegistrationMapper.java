package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.FamilyRegistration;
import com.terafuze.gohomenotes.web.models.FamilyRegistrationModel;

/**
 * Mapper for the Family Registration domain model object to the Family Registration Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FamilyRegistrationMapper extends IEntityMapper<FamilyRegistrationModel, FamilyRegistration> {

    @Mapping(source = "id", target = "identifier")
    FamilyRegistrationModel toModel(FamilyRegistration familyRegistration);

    @Mapping(target = "parentRegistrations", ignore = true)
    @Mapping(target = "studentRegistrations", ignore = true)
    FamilyRegistration toEntity(FamilyRegistrationModel familyRegistrationModel);

    default FamilyRegistration fromId(Long id) {
        if (id == null) {
            return null;
        }
        FamilyRegistration familyRegistration = new FamilyRegistration();
        familyRegistration.setId(id);
        return familyRegistration;
    }
}