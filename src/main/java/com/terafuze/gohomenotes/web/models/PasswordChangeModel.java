package com.terafuze.gohomenotes.web.models;

/**
 * A Model representing a password change required data - current and new password.
 */
public class PasswordChangeModel {
    private String currentPassword;
    private String newPassword;

    public PasswordChangeModel() {
        // Empty constructor needed for Jackson.
    }

    public PasswordChangeModel(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    public String getCurrentPassword() {

        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
