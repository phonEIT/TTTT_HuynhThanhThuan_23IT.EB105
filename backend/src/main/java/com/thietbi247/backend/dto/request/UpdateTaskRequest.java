package com.thietbi247.backend.dto.request;

import com.thietbi247.backend.constant.TaskStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateTaskRequest {
     String id;          // Task cần update
     TaskStatus status;      // Trạng thái mới
     String note;            // Ghi chú chi tiết
}
