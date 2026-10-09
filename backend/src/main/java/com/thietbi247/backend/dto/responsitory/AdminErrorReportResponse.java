package com.thietbi247.backend.dto.responsitory;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
@Data
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,  makeFinal = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdminErrorReportResponse {
    String id;
    String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss dd/MM/yyyy")
    LocalDateTime errorDate;
    String device;
    String image;
    String username;
    String status;
    String technician;
    String taskStatus;
    String technicianNote;
}
