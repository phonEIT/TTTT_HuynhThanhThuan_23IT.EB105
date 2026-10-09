package com.thietbi247.backend.controller;

import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.request.CreateTaskRequest;
import com.thietbi247.backend.dto.request.UpdateTaskRequest;
import com.thietbi247.backend.dto.request.UserCreateRequest;
import com.thietbi247.backend.dto.responsitory.TaskHistoryResponse;
import com.thietbi247.backend.dto.responsitory.TaskResponse;
import com.thietbi247.backend.dto.responsitory.UserResponse;
import com.thietbi247.backend.service.TaskService;
import com.thietbi247.backend.util.ApiResponseUtil;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/admin/task")
public class TaskController {
    TaskService service;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody CreateTaskRequest request){
        TaskResponse data = service.createTask(request);
        return ApiResponseUtil.success(data, SuccessCode.TASK_CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks(){
        List<TaskResponse> data = service.getTaskAll();
        return ApiResponseUtil.success(data, SuccessCode.TASK_LISTED);
    }

    @GetMapping("/history")
    public ResponseEntity<List<TaskHistoryResponse>> getAllHistory(){
        List<TaskHistoryResponse> data = service.getAllHistory();
        return ApiResponseUtil.success(data, SuccessCode.TASK_HISTORY_LISTED);
    }

    @GetMapping("/my_task_history")
    public ResponseEntity<List<TaskHistoryResponse>> getMyTaskHistory(){
        List<TaskHistoryResponse> data = service.getMyTaskHistory();
        return ApiResponseUtil.success(data, SuccessCode.TASK_HISTORY_LISTED);
    }

    @GetMapping("/my_task_progress")
    public ResponseEntity<List<TaskResponse>> getMyTaskInProgress(){
        List<TaskResponse> data = service.getMyTaskInProgress();
        return ApiResponseUtil.success(data, SuccessCode.TASK_IN_PROGRESS_LISTED);
    }

    @GetMapping("/my_task")
    public ResponseEntity<List<TaskResponse>> getMyTasksTechnician(){
        List<TaskResponse> data = service.getMyTaskTechnician();
        return ApiResponseUtil.success(data, SuccessCode.TASK_LISTED);
    }


    @PutMapping
    public ResponseEntity<TaskResponse> updateEmployee(@Valid @RequestBody UpdateTaskRequest request){
        TaskResponse data = service.updateTask(request);
        return ApiResponseUtil.success(data, SuccessCode.EMPLOYEE_UPDATED);
    }
}
