package com.terafuze.gohomenotes.domain;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;

/**
 * Record that the Go Home Notes have been finalized for a specific day
 */
@Entity
@Table(name = "daily_verification_record")
public class DailyVerificationRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
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

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getGoHomeNotesReportContentId() {
        return this.goHomeNotesReportContentId;
    }

    public DailyVerificationRecord goHomeNotesReportContentId(String contentId) {
        this.goHomeNotesReportContentId = contentId;
        return this;
    }

    public void setGoHomeNotesReportContentId(String contentId) {
        this.goHomeNotesReportContentId = contentId;
    }

    public long getGoHomeNotesReportContentLength() {
        return this.goHomeNotesReportContentLength;
    }

    public DailyVerificationRecord goHomeNotesReportContentLength(long contentLength) {
        this.goHomeNotesReportContentLength = contentLength;
        return this;
    }

    public void setGoHomeNotesReportContentLength(long contentLength) {
        this.goHomeNotesReportContentLength = contentLength;
    }

    public String getGoHomeNotesReportMimeType() {
        return this.goHomeNotesReportMimeType;
    }

    public DailyVerificationRecord goHomeNotesReportMimeType(String mimeType) {
        this.goHomeNotesReportMimeType = mimeType;
        return this;
    }

    public void setGoHomeNotesReportMimeType(String mimeType) {
        this.goHomeNotesReportMimeType = mimeType;
    }
    

    
    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public DailyVerificationRecord timestamp(LocalDateTime timestamp) {
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
        DailyVerificationRecord dailyVerificationRecord = (DailyVerificationRecord) o;
        if (dailyVerificationRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dailyVerificationRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DailyVerificationRecord{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
        "}";
    }
}