package com.thietbi247.backend.mapper.impl;


import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.responsitory.TaskHistoryResponse;
import com.thietbi247.backend.dto.responsitory.TaskResponse;
import com.thietbi247.backend.entity.Task;
import com.thietbi247.backend.entity.TaskHistory;
import com.thietbi247.backend.entity.User;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.ErrorReportMapper;
import com.thietbi247.backend.mapper.TaskHistoryMapper;
import com.thietbi247.backend.mapper.UserMapper;
import com.thietbi247.backend.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class TaskHistoryMapperImpl implements TaskHistoryMapper {
    UserMapper  userMapper;
    ErrorReportMapper  errorReportMapper;
    UserRepository userRepository;

    @Override
    public TaskHistoryResponse toTaskHistoryResponse(TaskHistory task){
        if (task == null) {
            return null;
        }

        return TaskHistoryResponse.builder()
                .id(task.getHistoryId())
                .image(task.getTask().getDevice().getImage())
                .productName(task.getTask().getDevice().getProductName())
                .note(task.getNote())
                .action(task.getAction().name())
                .reportedBy(task.getTask().getErrorReport().getUser().getUserName())
                .assignedTo(task.getTask().getTechnician().getUserName())
                .actionDate(task.getCreatedAt())
              .build();
    }

    @Override
    public TaskHistory toTaskHistory(Task task) {
        if (task == null) {
            return null;
        }


        return TaskHistory.builder()
                .task(task)
                .action(task.getTaskStatus())
                .note(task.getNote())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
