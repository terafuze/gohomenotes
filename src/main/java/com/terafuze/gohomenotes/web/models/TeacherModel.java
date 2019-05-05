package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Teacher entity.
 */
public class TeacherModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    

    public String getIdentifier() {
        return this.identifier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeacherModel teacherModel = (TeacherModel) o;
        if (teacherModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacherModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeacherModel{" +
            "id=" + getId() +
            "}";
    }
}