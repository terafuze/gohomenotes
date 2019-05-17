package com.terafuze.gohomenotes.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 */
@Entity
@Table(name = "parent")
public class Parent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;
    
    @ManyToMany(mappedBy = "parents")
    private List<Student> students = new ArrayList<>();
    
    @OneToOne(mappedBy = "parent", fetch = FetchType.EAGER)
    @JoinColumn(unique = true)
    private UserProfile userProfile;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAddress() {
        return this.address;
    }

    public Parent address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }    
    
    public List<Student> getStudents() {
        return students;
    }

    public Parent students(List<Student> students) {
        this.students = students;
        return this;
    }

    public Parent addStudent(Student student) {
        this.students.add(student);
        student.addParent(this);
        return this;
    }

    public Parent removeStudent(Student student) {
        this.students.remove(student);
        student.removeParent(this);
        return this;
    }

    public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Parent parent = (Parent) o;
        if (parent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parent{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            "}";
    }
}