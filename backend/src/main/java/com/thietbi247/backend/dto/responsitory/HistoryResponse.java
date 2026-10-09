package com.thietbi247.backend.dto.responsitory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thietbi247.backend.entity.Approval;
import com.thietbi247.backend.entity.Device;
import com.thietbi247.backend.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HistoryResponse {
    String id;
    LocalDateTime borrowDate;
    LocalDateTime returnDate;
    LocalDateTime errorDate;
    UserResponse user;
    DeviceResponse device;
    ApprovalResponse approval;
}