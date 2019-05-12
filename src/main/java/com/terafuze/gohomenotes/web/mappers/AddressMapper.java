package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.Address;
import com.terafuze.gohomenotes.web.models.AddressModel;

/**
 * Mapper for the Address domain model object to the Address Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AddressMapper extends IEntityMapper<AddressModel, Address> {

    @Mapping(source = "id", target = "identifier")
    AddressModel toModel(Address address);

    @Mapping(target = "userProfiles", ignore = true)
    Address toEntity(AddressModel addressModel);

    default Address fromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }
}