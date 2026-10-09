package com.thietbi247.backend.mapper;

import com.thietbi247.backend.dto.request.CreateTaskRequest;
import com.thietbi247.backend.dto.request.UpdateTaskRequest;
import com.thietbi247.backend.dto.request.UserCreateRequest;
import com.thietbi247.backend.dto.responsitory.TaskResponse;
import com.thietbi247.backend.entity.Task;
import com.thietbi247.backend.entity.User;

public interface TaskMapper {
    Task toTask(CreateTaskRequest request);

    TaskResponse toTaskResponse(Task task);

    void updateTask(Task task, UpdateTaskRequest request);
}
