package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Parent entity.
 */
public class ParentModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    @NotNull
    private String address;
    
    @NotNull
    private String emailAddress;
    
    @NotNull
    private String firstName;
    
    @NotNull
    private String lastName;
    
    @NotNull
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

        ParentModel parentModel = (ParentModel) o;
        if (parentModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parentModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParentModel{" +
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