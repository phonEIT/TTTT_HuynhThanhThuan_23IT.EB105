package com.thietbi247.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
public class RequestBorrow {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    LocalDateTime  borrowDate;
    LocalDateTime errorDate;
    LocalDateTime dueDate;
    String borrowReason;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

    @OneToOne(mappedBy = "requestBorrow")
    private Approval approval;

    @OneToOne(mappedBy = "requestBorrow")
    ReturnDevice returnDevice;

    @OneToOne(mappedBy = "requestBorrow")
    History history;

    @OneToOne(mappedBy = "requestBorrow")
    ErrorReport errorReport;


}
