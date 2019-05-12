package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.Parent;
import com.terafuze.gohomenotes.web.models.ParentModel;

/**
 * Mapper for the Parent domain model object to the Parent Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ParentMapper extends IEntityMapper<ParentModel, Parent> {

    @Mapping(source = "firstName", target = "identifier")
    ParentModel toModel(Parent parent);

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