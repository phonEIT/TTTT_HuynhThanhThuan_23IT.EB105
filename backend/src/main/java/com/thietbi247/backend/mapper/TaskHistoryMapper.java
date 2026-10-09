package com.thietbi247.backend.mapper;

import com.thietbi247.backend.dto.request.CreateTaskRequest;
import com.thietbi247.backend.dto.responsitory.TaskHistoryResponse;
import com.thietbi247.backend.dto.responsitory.TaskResponse;
import com.thietbi247.backend.entity.Task;
import com.thietbi247.backend.entity.TaskHistory;

public interface TaskHistoryMapper {
    TaskHistoryResponse toTaskHistoryResponse(TaskHistory task);
    TaskHistory toTaskHistory(Task task);
}
