package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.terafuze.gohomenotes.domain.UserProfile;
import com.terafuze.gohomenotes.web.models.ParentModel;
import com.terafuze.gohomenotes.web.models.TeacherModel;
import com.terafuze.gohomenotes.web.models.UserProfileModel;

/**
 * Mapper for the User Profile domain model object to the User Profile Model.
 */
@Mapper(componentModel = "spring", uses = {AddressMapper.class, ParentMapper.class, TeacherMapper.class})
public interface UserProfileMapper extends IEntityMapper<UserProfileModel, UserProfile> {

    @Mapping(source = "lastName", target = "identifier")
    @Mapping(source = "homeAddress.id", target = "homeAddressId")
    @Mapping(source = "homeAddress.id", target = "homeAddressIdentifier")
    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "teacher.id", target = "teacherIdentifier")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userIdentifier")
    UserProfileModel toModel(UserProfile userProfile);

    @Mapping(source = "homeAddressId", target = "homeAddress")
    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(target = "user", ignore = true)
    @Mapping(source = "parentId", target = "parent")
    UserProfile toEntity(UserProfileModel userProfileModel);

    @Mapping(target = "homeAddress", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "parent", ignore = true)
    UserProfile userProfileFromParentModel(ParentModel parentModel);
    
    @Mapping(target = "homeAddress", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "parent", ignore = true)
    @Mapping(target = "id", ignore = true)
    UserProfile updateUserProfileFromParentModel(ParentModel parentModel, @MappingTarget UserProfile userProfile);

    
    @Mapping(target = "homeAddress", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "primaryPhoneNumber", ignore = true)
    @Mapping(target = "secondaryPhoneNumber", ignore = true)
    @Mapping(target = "parent", ignore = true)
    UserProfile userProfileFromTeacherModel(TeacherModel teacherModel);
    
    @Mapping(target = "homeAddress", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "primaryPhoneNumber", ignore = true)
    @Mapping(target = "secondaryPhoneNumber", ignore = true)
    @Mapping(target = "parent", ignore = true)
    @Mapping(target = "id", ignore = true)
    UserProfile updateUserProfileFromTeacherModel(TeacherModel teacherModel, @MappingTarget UserProfile userProfile);
    
    default UserProfile fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserProfile userProfile = new UserProfile();
        userProfile.setId(id);
        return userProfile;
    }
}