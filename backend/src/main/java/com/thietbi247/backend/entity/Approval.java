package com.thietbi247.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thietbi247.backend.constant.ApprovalStatus;
import com.thietbi247.backend.constant.ApprovalType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
public class Approval {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Enumerated(EnumType.STRING)
    ApprovalStatus status;

    LocalDateTime requestDate;
    LocalDateTime approvalDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "error_report_id")
    ErrorReport errorReport;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "request_borrow_id")
    RequestBorrow requestBorrow;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "return_device_id")
    ReturnDevice returnDevice;


    @OneToMany(mappedBy = "approval", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Notification> notificationList;

    @Enumerated(EnumType.STRING)
    ApprovalType type;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

}
