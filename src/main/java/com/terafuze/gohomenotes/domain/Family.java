package com.terafuze.gohomenotes.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.OrderBy;
import javax.validation.constraints.NotNull;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 */
@Entity
@Table(name = "family")
public class Family implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    
    @OneToMany(mappedBy = "family")
    @OrderBy("lastnNme ASC")
    private List<Student> children = new ArrayList<>();
    
    
    @OneToMany(mappedBy = "family")
    @OrderBy("lastName ASC")
    private List<Parent> parent = new ArrayList<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    
    public List<Student> getChildren() {
        return children;
    }

    public Family children(List<Student> children) {
        this.children = children;
        return this;
    }

    public Family addStudent(Student student) {
        this.children.add(student);
        student.setFamily(this);
        return this;
    }

    public Family removeStudent(Student student) {
        this.children.remove(student);
        student.setFamily(null);
        return this;
    }

    public void setChildren(List<Student> children) {
        this.children = children;
    }


    
    
    public List<Parent> getParent() {
        return parent;
    }

    public Family parent(List<Parent> parent) {
        this.parent = parent;
        return this;
    }

    public Family addParent(Parent parent) {
        this.parent.add(parent);
        parent.setFamily(this);
        return this;
    }

    public Family removeParent(Parent parent) {
        this.parent.remove(parent);
        parent.setFamily(null);
        return this;
    }

    public void setParent(List<Parent> parent) {
        this.parent = parent;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Family family = (Family) o;
        if (family.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), family.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Family{" +
            "id=" + getId() +
            ", children='" + getChildren() + "'" +
            ", parent='" + getParent() + "'" +
            "}";
    }
}