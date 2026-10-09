package com.thietbi247.backend.mapper.impl;

import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.request.ErrorReportRequest;
import com.thietbi247.backend.dto.responsitory.AdminErrorReportResponse;
import com.thietbi247.backend.dto.responsitory.DeviceResponse;
import com.thietbi247.backend.dto.responsitory.ErrorReportResponse;
import com.thietbi247.backend.entity.*;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.*;
import com.thietbi247.backend.repository.ApprovalRepository;
import com.thietbi247.backend.repository.DeviceRepository;
import com.thietbi247.backend.repository.TaskRepository;
import com.thietbi247.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ErrorReportMapperImpl implements ErrorReportMapper {
     RequestBorrowMapper borrowMapper;
     DeviceMapper deviceMapper;
     ApprovalMapper approvalMapper;
     TaskRepository taskRepository;
     ApprovalRepository approvalRepository;
     UserMapper userMapper;


    @Override
    public ErrorReport toErrorReport(ErrorReportRequest request) {

        return ErrorReport.builder()
                .description(request.getDescription())
                .errorDate(LocalDateTime.now())
                .build();
    }

    @Override
    public ErrorReportResponse toErrorReportResponse(ErrorReport errorReport) {
        if (errorReport == null) {
            return null;
        }


        Task task = taskRepository.findByErrorReport(errorReport);

        Approval approval = approvalRepository.findByErrorReportId(errorReport.getId()).orElseThrow(() ->
                new AppException(ErrorCode.ERROR_REPORT_NOT_EXISTS));

        return ErrorReportResponse.builder()
                .id(errorReport.getId())
                .description(errorReport.getDescription())
                .errorDate(errorReport.getErrorDate())
                .technician(task != null && task.getTechnician() != null ? task.getTechnician().getUserName() : "")
                .technicianNote(task != null && task.getTechnician() != null ? task.getNote() : "")
                .taskStatus(task != null && task.getTechnician() != null ? task.getTaskStatus().name() : "")
                .status(approvalMapper.toApprovalSimpleResponse(approval).getStatus().name())
                .device(borrowMapper.toRequestBorrowResponse(errorReport.getRequestBorrow()).getDevice().getProductName())
                .image(borrowMapper.toRequestBorrowResponse(errorReport.getRequestBorrow()).getDevice().getImage())
                .build();
    }

    @Override
    public AdminErrorReportResponse toAdminErrorReportResponse(ErrorReport errorReport) {
        if (errorReport == null) {
            return null;
        }

        Task task = taskRepository.findByErrorReport(errorReport);

        Approval approval = approvalRepository.findByErrorReportId(errorReport.getId()).orElseThrow(() ->
                new AppException(ErrorCode.ERROR_REPORT_NOT_EXISTS));

        return AdminErrorReportResponse.builder()
                .id(errorReport.getId())
                .description(errorReport.getDescription())
                .username(errorReport.getUser().getUserName())
                .errorDate(errorReport.getErrorDate())
                .technician(task != null && task.getTechnician() != null ? task.getTechnician().getUserName() : "")
                .technicianNote(task != null && task.getTechnician() != null ? task.getNote() : "")
                .taskStatus(task != null && task.getTechnician() != null ? task.getTaskStatus().name() : "")
                .status(approvalMapper.toApprovalSimpleResponse(approval).getStatus().name())
                .device(borrowMapper.toRequestBorrowResponse(errorReport.getRequestBorrow()).getDevice().getProductName())
                .image(borrowMapper.toRequestBorrowResponse(errorReport.getRequestBorrow()).getDevice().getImage())
                .build();
    }


}
