package com.thietbi247.backend.service;

import com.thietbi247.backend.constant.ApprovalStatus;
import com.thietbi247.backend.constant.ApprovalType;
import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.request.ApprovalUpdateRequest;
import com.thietbi247.backend.dto.responsitory.ApprovalResponse;
import com.thietbi247.backend.dto.responsitory.HistoryResponse;
import com.thietbi247.backend.dto.responsitory.RequestBorrowResponse;
import com.thietbi247.backend.entity.*;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.ApprovalMapper;
import com.thietbi247.backend.mapper.NotificationMapper;
import com.thietbi247.backend.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApprovalService {
    NotificationRepository notificationRepository;
    ErrorReportRepository errorReportRepository;
    ErrorReportService errorReportService;
    ReturnDeviceRepository returnDeviceRepository;
    RequestBorrowRepository requestBorrowRepository;
    NotificationMapper notificationMapper;
    HistoryRepository historyRepository;
    UserRepository userRepository;

    ApprovalRepository repository;
    ApprovalMapper mapper;

    @PreAuthorize("hasRole('ADMIN')")
    public List<ApprovalResponse> getAll() {
        List<Approval> approvals = repository.findAll();
        return approvals.stream()
                .map(mapper::toApprovalResponse)
                .sorted(Comparator.comparing(
                        ApprovalResponse::getRequestDate
                ).reversed())
                .collect(Collectors.toList());

    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<ApprovalResponse> getApprovalType(ApprovalType request) {
        List<Approval> approvals = repository.findAllByType(request);
        return  approvals.stream()
                .map(mapper::toApprovalResponse)
                .sorted(Comparator.comparing(
                        ApprovalResponse::getRequestDate
                ).reversed())
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ADMIN')")
    public ApprovalResponse updateApproval(ApprovalUpdateRequest request) {
        Approval approval = repository.findById(request.getId()).orElseThrow(() ->
                new AppException(ErrorCode.APPROVAL_NOT_EXISTS));

        mapper.updateApproval(approval, request);
        Notification notification = notificationMapper.fromApproval(approval);
        String content = notificationMapper.generateContent(approval, approval.getType());
        notification.setContent(content);
        notification.setRead(false);
        notification.setNotificationDate(LocalDateTime.now());
        notificationRepository.save(notification);

        return mapper.toApprovalResponse(approval);
    }



}
