package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.GoHomeNotesReport;
import com.terafuze.gohomenotes.web.models.GoHomeNotesReportModel;

/**
 * Mapper for the Go Home Notes Report domain model object to the Go Home Notes Report Model.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class, })
public interface GoHomeNotesReportMapper extends IEntityMapper<GoHomeNotesReportModel, GoHomeNotesReport> {

    @Mapping(source = "id", target = "identifier")
    @Mapping(target = "goHomeNotesReport", ignore = true)
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "school.id", target = "schoolIdentifier")
    GoHomeNotesReportModel toModel(GoHomeNotesReport goHomeNotesReport);

    @Mapping(target = "goHomeNotesReportMimeType", ignore = true)
    @Mapping(target = "goHomeNotesReportContentId", ignore = true)
    @Mapping(source = "schoolId", target = "school")
    GoHomeNotesReport toEntity(GoHomeNotesReportModel goHomeNotesReportModel);

    default GoHomeNotesReport fromId(Long id) {
        if (id == null) {
            return null;
        }
        GoHomeNotesReport goHomeNotesReport = new GoHomeNotesReport();
        goHomeNotesReport.setId(id);
        return goHomeNotesReport;
    }
}