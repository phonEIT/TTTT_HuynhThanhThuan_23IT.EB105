package com.thietbi247.backend.dto.responsitory;
import com.thietbi247.backend.entity.Approval;
import com.thietbi247.backend.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponse {
    String id;
    String content;
    LocalDateTime notificationDate;
    UserResponse user;
    ApprovalResponse approval;
    boolean isRead;
}
