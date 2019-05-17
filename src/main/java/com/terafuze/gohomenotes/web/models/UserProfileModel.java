package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the User Profile entity.
 */
public class UserProfileModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    private String emailAddress;
    
    @NotNull
    private String firstName;
    
    
    private Long homeAddressId;

    private String homeAddressIdentifier;
    
    
    @NotNull
    private String lastName;
    
    @NotNull
    private String primaryPhoneNumber;
    
    private String secondaryPhoneNumber;
    
    private Long parentId;

    private String parentIdentifier;
    
    private Long teacherId;

    private String teacherIdentifier;
    
    private Long userId;

    private String userIdentifier;

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
    
    
    public Long getHomeAddressId() {
        return this.homeAddressId;
    }

    public void setHomeAddressId(Long homeAddressId) {
        this.homeAddressId = homeAddressId;
    }

    public String getHomeAddressIdentifier() {
        return this.homeAddressIdentifier;
    }

    public void setHomeAddressIdentifier(String homeAddressIdentifier) {
        this.homeAddressIdentifier = homeAddressIdentifier;
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
    
    
    public Long getTeacherId() {
        return this.teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherIdentifier() {
        return this.teacherIdentifier;
    }

    public void setTeacherIdentifier(String teacherIdentifier) {
        this.teacherIdentifier = teacherIdentifier;
    }
    
    

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserIdentifier() {
		return userIdentifier;
	}

	public void setUserIdentifier(String userIdentifier) {
		this.userIdentifier = userIdentifier;
	}

	public String getParentIdentifier() {
		return parentIdentifier;
	}

	public void setParentIdentifier(String parentIdentifier) {
		this.parentIdentifier = parentIdentifier;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserProfileModel userProfileModel = (UserProfileModel) o;
        if (userProfileModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userProfileModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserProfileModel{" +
            "id=" + getId() +
            ", emailAddress='" + this.getEmailAddress() + "'" +
            ", firstName='" + this.getFirstName() + "'" +
            ", lastName='" + this.getLastName() + "'" +
            ", primaryPhoneNumber='" + this.getPrimaryPhoneNumber() + "'" +
            ", secondaryPhoneNumber='" + this.getSecondaryPhoneNumber() + "'" +
            "}";
    }
}