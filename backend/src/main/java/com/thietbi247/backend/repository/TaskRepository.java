package com.thietbi247.backend.repository;

import com.thietbi247.backend.constant.TaskStatus;
import com.thietbi247.backend.entity.ErrorReport;
import com.thietbi247.backend.entity.Task;
import com.thietbi247.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository  extends JpaRepository<Task, String> {
    Task findByAssignedBy(User assignedBy);

    List<Task> findAllByTechnician(User user);

    Optional<Task> findByTechnician(User user);


    Task findByErrorReport(ErrorReport errorReport);

    List<Task> findAllByTechnicianAndTaskStatus(User technician, TaskStatus taskStatus);

}
