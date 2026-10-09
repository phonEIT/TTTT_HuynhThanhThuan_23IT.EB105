package com.thietbi247.backend.mapper.impl;

import com.thietbi247.backend.dto.request.CreateTaskRequest;
import com.thietbi247.backend.dto.request.UpdateTaskRequest;
import com.thietbi247.backend.dto.responsitory.TaskHistoryResponse;
import com.thietbi247.backend.dto.responsitory.TaskResponse;
import com.thietbi247.backend.entity.Task;
import com.thietbi247.backend.entity.TaskHistory;
import com.thietbi247.backend.mapper.ErrorReportMapper;
import com.thietbi247.backend.mapper.TaskMapper;
import com.thietbi247.backend.constant.TaskStatus;
import com.thietbi247.backend.mapper.UserMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class TaskMapperImpl implements TaskMapper {
    UserMapper  userMapper;
    ErrorReportMapper  errorReportMapper;

    @Override
    public Task toTask(CreateTaskRequest request) {
        if (request == null) {
            return null;
        }

        return Task.builder()
                .note(request.getNote())
                .taskStatus(TaskStatus.ASSIGNED)
                .dueDate(request.getDueDate())
                .assignedDate(java.time.LocalDateTime.now())
                .build();
        // ⚠ Lưu ý: errorReport và assignedTo sẽ được set ở Service
        // sau khi load từ DB, vì request chỉ chứa ID chứ không chứa entity
    }

    @Override
    public TaskResponse toTaskResponse(Task task){
        if (task == null) {
            return null;
        }

        return TaskResponse.builder()
                .id(task.getTaskId())
                .status(task.getTaskStatus())
                .note(task.getNote())
                .assignedDate(task.getAssignedDate())
                .image(task.getDevice().getImage())
                .productName(task.getDevice().getProductName())
                .dueDate(task.getDueDate())
                .completedDate(task.getCompletedDate())
                .reportedBy(task.getErrorReport().getUser().getUserName())
                .reportedBy(task.getErrorReport().getUser().getUserName())
                .assignedToName(task.getTechnician() != null ? task.getTechnician().getUserName() : null)
                .assignedByName(task.getAssignedBy() != null ? task.getAssignedBy().getUserName() : null)
                .build();
    }

    @Override
    public void updateTask(Task task, UpdateTaskRequest request) {
        task.setNote(request.getNote());
        task.setTaskStatus(request.getStatus());
    }
}
