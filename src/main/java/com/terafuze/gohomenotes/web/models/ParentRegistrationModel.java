package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Parent Registration entity.
 */
public class ParentRegistrationModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    @NotNull
    private String address;
    
    private String emailAddress;
    
    
    private Long familyRegistrationId;

    private String familyRegistrationIdentifier;
    
    
    @NotNull
    private String firstName;
    
    @NotNull
    private String lastName;
    
    private String primaryPhoneNumber;
    
    private String secondaryPhoneNumber;
    

    public String getIdentifier() {
        return this.identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    
    
    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
    
    
    public Long getFamilyRegistrationId() {
        return this.familyRegistrationId;
    }

    public void setFamilyRegistrationId(Long familyRegistrationId) {
        this.familyRegistrationId = familyRegistrationId;
    }

    public String getFamilyRegistrationIdentifier() {
        return this.familyRegistrationIdentifier;
    }

    public void setFamilyRegistrationIdentifier(String familyRegistrationIdentifier) {
        this.familyRegistrationIdentifier = familyRegistrationIdentifier;
    }
    
    
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    
    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    
    public String getPrimaryPhoneNumber() {
        return this.primaryPhoneNumber;
    }

    public void setPrimaryPhoneNumber(String primaryPhoneNumber) {
        this.primaryPhoneNumber = primaryPhoneNumber;
    }
    
    
    public String getSecondaryPhoneNumber() {
        return this.secondaryPhoneNumber;
    }

    public void setSecondaryPhoneNumber(String secondaryPhoneNumber) {
        this.secondaryPhoneNumber = secondaryPhoneNumber;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ParentRegistrationModel parentRegistrationModel = (ParentRegistrationModel) o;
        if (parentRegistrationModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parentRegistrationModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParentRegistrationModel{" +
            "id=" + getId() +
            ", address='" + this.getAddress() + "'" +
            ", emailAddress='" + this.getEmailAddress() + "'" +
            ", firstName='" + this.getFirstName() + "'" +
            ", lastName='" + this.getLastName() + "'" +
            ", primaryPhoneNumber='" + this.getPrimaryPhoneNumber() + "'" +
            ", secondaryPhoneNumber='" + this.getSecondaryPhoneNumber() + "'" +
            "}";
    }
}