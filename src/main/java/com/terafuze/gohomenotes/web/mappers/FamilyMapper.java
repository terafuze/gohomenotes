package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.Family;
import com.terafuze.gohomenotes.web.models.FamilyModel;

/**
 * Mapper for the Family domain model object to the Family Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FamilyMapper extends IEntityMapper<FamilyModel, Family> {

    @Mapping(source = "id", target = "identifier")
    FamilyModel toModel(Family family);

    @Mapping(target = "children", ignore = true)
    @Mapping(target = "parent", ignore = true)
    Family toEntity(FamilyModel familyModel);

    default Family fromId(Long id) {
        if (id == null) {
            return null;
        }
        Family family = new Family();
        family.setId(id);
        return family;
    }
}