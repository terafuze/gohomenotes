package com.terafuze.gohomenotes.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;

/**
 */
@Entity
@Table(name = "go_home_notes_report")
public class GoHomeNotesReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @NotNull
    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;
    
    @Column(name = "finalized")
    private Boolean finalized;
    
    @Column(name = "generated_by_username")
    private String generatedByUsername;
    
    /**
     * Used by Spring Content to associate a stream of binary data with the this entity.
     *
     * Automatically managed by Spring Content.
     */
    
    @ContentId
    private String goHomeNotesReportContentId;

    /**
     * Used by Spring Content to record the length of a data stream for file content.
     *
     * Automatically managed by Spring Content.
     */
    @ContentLength
    private long goHomeNotesReportContentLength;

    /**
     * Mime Type necessary to serving file content over the web
     */
    private String goHomeNotesReportMimeType = "application/pdf";

    
    @ManyToOne
    private School school;
    
    @Column(name = "timestamp")
    private LocalDateTime timestamp;
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public LocalDate getEventDate() {
        return this.eventDate;
    }

    public GoHomeNotesReport eventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    

    
    public Boolean getFinalized() {
        return this.finalized;
    }

    public GoHomeNotesReport finalized(Boolean finalized) {
        this.finalized = finalized;
        return this;
    }

    public void setFinalized(Boolean finalized) {
        this.finalized = finalized;
    }
    

    
    public String getGeneratedByUsername() {
        return this.generatedByUsername;
    }

    public GoHomeNotesReport generatedByUsername(String generatedByUsername) {
        this.generatedByUsername = generatedByUsername;
        return this;
    }

    public void setGeneratedByUsername(String generatedByUsername) {
        this.generatedByUsername = generatedByUsername;
    }
    

    public String getGoHomeNotesReportContentId() {
        return this.goHomeNotesReportContentId;
    }

    public GoHomeNotesReport goHomeNotesReportContentId(String contentId) {
        this.goHomeNotesReportContentId = contentId;
        return this;
    }

    public void setGoHomeNotesReportContentId(String contentId) {
        this.goHomeNotesReportContentId = contentId;
    }

    public long getGoHomeNotesReportContentLength() {
        return this.goHomeNotesReportContentLength;
    }

    public GoHomeNotesReport goHomeNotesReportContentLength(long contentLength) {
        this.goHomeNotesReportContentLength = contentLength;
        return this;
    }

    public void setGoHomeNotesReportContentLength(long contentLength) {
        this.goHomeNotesReportContentLength = contentLength;
    }

    public String getGoHomeNotesReportMimeType() {
        return this.goHomeNotesReportMimeType;
    }

    public GoHomeNotesReport goHomeNotesReportMimeType(String mimeType) {
        this.goHomeNotesReportMimeType = mimeType;
        return this;
    }

    public void setGoHomeNotesReportMimeType(String mimeType) {
        this.goHomeNotesReportMimeType = mimeType;
    }
    
    public School getSchool() {
        return this.school;
    }

    public GoHomeNotesReport school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    
    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public GoHomeNotesReport timestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GoHomeNotesReport goHomeNotesReport = (GoHomeNotesReport) o;
        if (goHomeNotesReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), goHomeNotesReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GoHomeNotesReport{" +
            "id=" + getId() +
            ", eventDate='" + getEventDate() + "'" +
            ", finalized='" + getFinalized() + "'" +
            ", generatedByUsername='" + getGeneratedByUsername() + "'" +
            ", timestamp='" + getTimestamp() + "'" +
        "}";
    }
}