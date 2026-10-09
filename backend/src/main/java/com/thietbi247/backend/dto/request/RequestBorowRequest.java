package com.thietbi247.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.thietbi247.backend.validator.DueDateConstraint;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestBorowRequest {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss dd/MM/yyyy")
    String borrowReason;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @DueDateConstraint(max = 14, message = "INVALID_DUE_DATE")
    LocalDateTime dueDate;
    String device_id;
}