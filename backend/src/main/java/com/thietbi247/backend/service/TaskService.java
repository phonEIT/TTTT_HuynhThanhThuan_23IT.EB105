package com.thietbi247.backend.service;

import com.thietbi247.backend.constant.ApprovalStatus;
import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.constant.RoleType;
import com.thietbi247.backend.constant.TaskStatus;
import com.thietbi247.backend.dto.request.CreateTaskRequest;
import com.thietbi247.backend.dto.request.UpdateTaskRequest;
import com.thietbi247.backend.dto.responsitory.HistoryResponse;
import com.thietbi247.backend.dto.responsitory.TaskHistoryResponse;
import com.thietbi247.backend.dto.responsitory.TaskResponse;
import com.thietbi247.backend.entity.*;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.TaskHistoryMapper;
import com.thietbi247.backend.mapper.TaskMapper;
import com.thietbi247.backend.repository.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TaskService {
    TaskMapper mapper;
    TaskHistoryMapper  historyMapper;
    TaskRepository repository;
    UserRepository userRepository;
    ApprovalRepository  approvalRepository;
    ErrorReportRepository errorReportRepository;
    TaskHistoryRepository taskHistoryRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public TaskResponse  createTask(CreateTaskRequest request) {
        Approval approval = approvalRepository.findByErrorReportId(request.getErrorReportId()).orElseThrow(()->
                new AppException(ErrorCode.APPROVAL_NOT_EXISTS));

        if (!approval.getStatus().equals(ApprovalStatus.APPROVED)) {
            throw new AppException(ErrorCode.ERROR_REPORT_NOT_APPROVED);
        }

        var info = SecurityContextHolder.getContext().getAuthentication();
        User assignedBy = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));


        User assignedTo = userRepository.findById(request.getTechnician()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        boolean isTechnician = assignedTo.getRoles().stream()
                .anyMatch(role -> role.getName().equals(RoleType.TECHNICIAN.toString()));

        if (!isTechnician) {
            throw new AppException(ErrorCode.EMPLOYEE_NOT_TECHNICAL);
        }

        ErrorReport report = errorReportRepository.findById(request.getErrorReportId()).orElseThrow(() ->
                new  AppException(ErrorCode.ERROR_REPORT_NOT_EXISTS));

        Task task = mapper.toTask(request);
        task.setAssignedBy(assignedBy);
        task.setTechnician(assignedTo);
        task.setErrorReport(report);
        task.setDevice(approval.getDevice());
        repository.save(task);


        TaskHistory taskHistory = historyMapper.toTaskHistory(task);
        taskHistoryRepository.save(taskHistory);
        return  mapper.toTaskResponse(task);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<TaskResponse> getTaskAll(){
        List<Task> tasks = repository.findAll();
        return  tasks.stream().map(mapper::toTaskResponse)
                .sorted(Comparator.comparing(TaskResponse::getAssignedDate).reversed())
                .collect(Collectors.toList());
    }

    public List<TaskHistoryResponse> getAllHistory() {
        List<TaskHistory> taskHistories = taskHistoryRepository.findAll();
        return  taskHistories.stream().map(historyMapper::toTaskHistoryResponse).collect(Collectors.toList());
    }


    @PreAuthorize("hasRole('TECHNICIAN')")
    public List<TaskResponse> getMyTaskTechnician(){
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        List<Task> tasks = repository.findAllByTechnician(user);
        if (tasks.isEmpty()) {
            throw  new AppException(ErrorCode.TASK_NOT_EXISTS);
        }

        return  tasks.stream().map(mapper::toTaskResponse)
                .sorted(Comparator.comparing(TaskResponse::getAssignedDate).reversed())
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('TECHNICIAN')")
    public List<TaskHistoryResponse> getMyTaskHistory() {
        var info = SecurityContextHolder.getContext().getAuthentication();
        User technician = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        List<Task> tasks = repository.findAllByTechnician(technician);
        List<TaskHistory> histories = taskHistoryRepository.findByTaskIn(tasks);

        return  histories.stream().map(historyMapper::toTaskHistoryResponse)
                .sorted(Comparator.comparing(TaskHistoryResponse::getActionDate).reversed())
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('TECHNICIAN')")
    public TaskResponse updateTask(UpdateTaskRequest request) {
        Task task = repository.findById(request.getId()).orElseThrow(() ->
                new  AppException(ErrorCode.TASK_NOT_EXISTS));

        mapper.updateTask(task,request);
        repository.save(task);

        TaskHistory taskHistory = historyMapper.toTaskHistory(task);
        taskHistoryRepository.save(taskHistory);

        return mapper.toTaskResponse(task);
    }

    @PreAuthorize("hasRole('TECHNICIAN')")
    public List<TaskResponse> getMyTaskInProgress() {
        var info = SecurityContextHolder.getContext().getAuthentication();
        User technician = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        List<Task> tasks = repository.findAllByTechnicianAndTaskStatus(technician, TaskStatus.IN_PROGRESS);
        List<TaskHistory> histories = taskHistoryRepository.findByTaskIn(tasks);

        return  tasks.stream().map(mapper::toTaskResponse)
                .sorted(Comparator.comparing(TaskResponse::getAssignedDate).reversed())
                .collect(Collectors.toList());
    }
}
