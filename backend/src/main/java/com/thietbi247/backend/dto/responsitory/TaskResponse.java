package com.thietbi247.backend.dto.responsitory;
import com.thietbi247.backend.constant.TaskStatus;
import com.thietbi247.backend.entity.ErrorReport;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TaskResponse {
     String id;
     String productName;
     String image;
     TaskStatus status;
     LocalDateTime assignedDate;
     LocalDateTime dueDate;
     LocalDateTime completedDate;
     String  reportedBy;
     String assignedToName;
     String assignedByName;
     String note;
}

