package com.terafuze.gohomenotes.web.models;

import com.terafuze.gohomenotes.web.models.UserModel;
import javax.validation.constraints.Size;

/**
 * API Model extending the UserModel, which is meant to be used in the user management UI.
 */
public class ManagedUserModel extends UserModel {

    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    public ManagedUserModel() {
        // Empty constructor needed for Jackson.
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "ManagedUserModel{" +
            "} " + super.toString();
    }
}
