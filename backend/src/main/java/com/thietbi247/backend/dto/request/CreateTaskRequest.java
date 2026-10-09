package com.thietbi247.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.thietbi247.backend.validator.DueDateConstraint;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CreateTaskRequest {
     String errorReportId;   // ID báo lỗi đã được duyệt
     String technician;      // ID kỹ thuật viên nhận task
     String note;          // Ghi chú ban đầu khi tạo task

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @DueDateConstraint(max = 14, message = "INVALID_DUE_DATE")
    LocalDateTime dueDate;
}
