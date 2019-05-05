package com.terafuze.gohomenotes.web.mappers;

import com.terafuze.gohomenotes.domain.Authority;
import com.terafuze.gohomenotes.domain.User;
import com.terafuze.gohomenotes.web.models.UserModel;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Mapper for the entity User and its Model called UserModel.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class UserMapper {

    public UserModel userToUserModel(User user) {
        return new UserModel(user);
    }

    public List<UserModel> usersToUserModels(List<User> users) {
        return users.stream()
            .filter(Objects::nonNull)
            .map(this::userToUserModel)
            .collect(Collectors.toList());
    }

    public User userModelToUser(UserModel userModel) {
        if (userModel == null) {
            return null;
        } else {
            User user = new User();
            user.setId(userModel.getId());
            user.setLogin(userModel.getLogin());
            user.setFirstName(userModel.getFirstName());
            user.setLastName(userModel.getLastName());
            user.setEmail(userModel.getEmail());
            user.setImageUrl(userModel.getImageUrl());
            user.setActivated(userModel.isActivated());
            user.setLangKey(userModel.getLangKey());
            Set<Authority> authorities = this.authoritiesFromStrings(userModel.getAuthorities());
            if (authorities != null) {
                user.setAuthorities(authorities);
            }
            return user;
        }
    }

    public List<User> userModelsToUsers(List<UserModel> userModels) {
        return userModels.stream()
            .filter(Objects::nonNull)
            .map(this::userModelToUser)
            .collect(Collectors.toList());
    }

    public User userFromId(Long id) {
        if (id == null) {
            return null;
        }
        User user = new User();
        user.setId(id);
        return user;
    }

    public Set<Authority> authoritiesFromStrings(Set<String> strings) {
        return strings.stream().map(string -> {
            Authority auth = new Authority();
            auth.setName(string);
            return auth;
        }).collect(Collectors.toSet());
    }
}
