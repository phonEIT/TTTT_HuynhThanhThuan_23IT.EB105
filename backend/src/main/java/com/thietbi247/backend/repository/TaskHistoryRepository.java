package com.thietbi247.backend.repository;

import com.thietbi247.backend.entity.Task;
import com.thietbi247.backend.entity.TaskHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskHistoryRepository extends JpaRepository<TaskHistory, String> {
    List<TaskHistory> findByTask(Task task);

    List<TaskHistory> findByTaskIn(List<Task> tasks);
}
