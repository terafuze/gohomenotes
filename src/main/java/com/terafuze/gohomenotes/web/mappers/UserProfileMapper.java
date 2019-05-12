package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.UserProfile;
import com.terafuze.gohomenotes.web.models.UserProfileModel;

/**
 * Mapper for the User Profile domain model object to the User Profile Model.
 */
@Mapper(componentModel = "spring", uses = {AddressMapper.class, TeacherMapper.class})
public interface UserProfileMapper extends IEntityMapper<UserProfileModel, UserProfile> {

    @Mapping(source = "lastName", target = "identifier")
    @Mapping(source = "homeAddress.id", target = "homeAddressId")
    @Mapping(source = "homeAddress.id", target = "homeAddressIdentifier")
    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "teacher.id", target = "teacherIdentifier")
    UserProfileModel toModel(UserProfile userProfile);

    @Mapping(source = "homeAddressId", target = "homeAddress")
    @Mapping(source = "teacherId", target = "teacher")
    UserProfile toEntity(UserProfileModel userProfileModel);

    default UserProfile fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserProfile userProfile = new UserProfile();
        userProfile.setId(id);
        return userProfile;
    }
}