package com.thietbi247.backend.dto.responsitory;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskHistoryResponse {
     String id;
     String productName;
     String image;
     String action;          // ASSIGNED, STARTED, UPDATED, COMPLETED, FAILED, CANCELED
     String note;            
     LocalDateTime actionDate;
     String assignedBy;     
     String assignedTo;
     String  reportedBy;
}
