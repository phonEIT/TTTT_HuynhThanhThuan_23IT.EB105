package com.thietbi247.backend.entity;

import com.thietbi247.backend.constant.TaskStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
     String taskId;

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
     ErrorReport errorReport; // tham chiếu đến ErrorReport

    @ManyToOne
    @JoinColumn(name = "technician", nullable = false)
     User technician; // kỹ thuật viên

    @ManyToOne
    @JoinColumn(name = "assigned_by", nullable = false)
     User assignedBy; // admin/staff giao việc

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
     TaskStatus taskStatus; // ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELED

    @Column(columnDefinition = "TEXT")
     String note; // mô tả kết quả cuối cùng

     LocalDateTime assignedDate;
     LocalDateTime dueDate;
     LocalDateTime completedDate;

    // Quan hệ 1 Task - N TaskHistory
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
     List<TaskHistory> histories;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;
}
