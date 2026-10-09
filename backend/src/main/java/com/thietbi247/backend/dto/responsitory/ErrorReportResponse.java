package com.thietbi247.backend.dto.responsitory;

import com.thietbi247.backend.entity.Device;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ErrorReportResponse {
    String id;
    String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss dd/MM/yyyy")
    LocalDateTime errorDate;
    String device;
    String image;
    String status;
    String technician;
    String taskStatus;
    String technicianNote;
}
