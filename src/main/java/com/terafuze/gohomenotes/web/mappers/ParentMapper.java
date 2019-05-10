package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.Parent;
import com.terafuze.gohomenotes.web.models.ParentModel;

/**
 * Mapper for the Parent domain model object to the Parent Model.
 */
@Mapper(componentModel = "spring", uses = {FamilyMapper.class})
public interface ParentMapper extends IEntityMapper<ParentModel, Parent> {

    @Mapping(source = "firstName", target = "identifier")
    @Mapping(source = "family.id", target = "familyId")
    @Mapping(source = "family.id", target = "familyIdentifier")
    ParentModel toModel(Parent parent);

    @Mapping(source = "familyId", target = "family")
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