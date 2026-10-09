package com.thietbi247.backend.entity;
import com.thietbi247.backend.constant.TaskStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@Table(name = "task_history")
public class TaskHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
     String historyId;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
     Task task;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    TaskStatus action; // ASSIGNED, STARTED, COMPLETED, FAILED, CANCELED

    @Column(columnDefinition = "TEXT")
     String note;

     LocalDateTime createdAt;


}
