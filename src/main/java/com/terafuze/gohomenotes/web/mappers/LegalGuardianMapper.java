package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.LegalGuardian;
import com.terafuze.gohomenotes.web.models.LegalGuardianModel;

/**
 * Mapper for the Legal Guardian domain model object to the Legal Guardian Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LegalGuardianMapper extends IEntityMapper<LegalGuardianModel, LegalGuardian> {

    @Mapping(source = "id", target = "identifier")
    LegalGuardianModel toModel(LegalGuardian legalGuardian);

    LegalGuardian toEntity(LegalGuardianModel legalGuardianModel);

    default LegalGuardian fromId(Long id) {
        if (id == null) {
            return null;
        }
        LegalGuardian legalGuardian = new LegalGuardian();
        legalGuardian.setId(id);
        return legalGuardian;
    }
}