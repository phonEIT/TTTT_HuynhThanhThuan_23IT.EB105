package com.thietbi247.backend.service;

import com.thietbi247.backend.constant.ApprovalStatus;
import com.thietbi247.backend.constant.ApprovalType;
import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.request.ErrorReportRequest;
import com.thietbi247.backend.dto.responsitory.AdminErrorReportResponse;
import com.thietbi247.backend.dto.responsitory.ErrorReportResponse;
import com.thietbi247.backend.entity.*;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.ErrorReportMapper;
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
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ErrorReportService {
    ErrorReportMapper mapper;
    ErrorReportRepository repository;
    UserRepository userRepository;
    ApprovalRepository approvalRepository;
    HistoryRepository historyRepository;
    DeviceRepository deviceRepository;
    RequestBorrowRepository  requestBorrowRepository;

    @PreAuthorize("hasRole('EMPLOYEE')")
    public ErrorReportResponse createErrorReport(ErrorReportRequest request) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(auth.getName())
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        RequestBorrow requestBorrow = requestBorrowRepository.findById(request.getRequestBorrow_id()).orElseThrow(() ->
                new AppException(ErrorCode.REQUEST_BORROW_NOT_EXISTS));
        requestBorrow.setErrorDate(LocalDateTime.now());
        requestBorrowRepository.save(requestBorrow);

        Approval approvalRequest = approvalRepository.findByRequestBorrowId(requestBorrow.getId()).orElseThrow(() ->
                new AppException(ErrorCode.APPROVAL_NOT_EXISTS));

        if (approvalRequest.getStatus() != ApprovalStatus.APPROVED) {
            throw new AppException(ErrorCode.APPROVAL_NOT_EXISTS);
        }

        History historyRequest = historyRepository.findByRequestBorrowId(request.getRequestBorrow_id());
        historyRequest.setErrorDate(LocalDateTime.now());
        historyRepository.save(historyRequest);

        Device device = deviceRepository.findById(requestBorrow.getDevice().getId()).orElseThrow(() ->
                new AppException(ErrorCode.DEVICE_NOT_EXISTS));

        ErrorReport errorReport = mapper.toErrorReport(request);
        errorReport.setRequestBorrow(requestBorrow);
        errorReport.setUser(user);
        errorReport.setErrorDate(LocalDateTime.now());
        errorReport = repository.save(errorReport);


        Approval approval = Approval.builder()
                .status(ApprovalStatus.PENDING)
                .requestDate(LocalDateTime.now())
                .user(user)
                .type(ApprovalType.ERROR_REPORT)
                .errorReport(errorReport)
                .device(device)
                .build();
        approval = approvalRepository.save(approval);


        History history = History.builder()
                .borrowDate(LocalDateTime.now())
                .errorDate(LocalDateTime.now())
                .user(user)
                .device(device)
                .errorReport(errorReport)
                .approval(approval)
                .build();
        history = historyRepository.save(history);


        return mapper.toErrorReportResponse(errorReport);
    }


    @PreAuthorize("hasRole('ADMIN')")
    public List<ErrorReportResponse> getAllErrorReport() {
        List<ErrorReport>  errorReports = repository.findAll();
        return errorReports.stream()
                .map(mapper::toErrorReportResponse)
                .sorted(Comparator.comparing(ErrorReportResponse::getErrorDate).reversed())
                .collect(Collectors.toList());
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAll() {
        List<Approval> approvals = approvalRepository.findAllByType(ApprovalType.ERROR_REPORT);

        boolean hasNonPending = approvals.stream()
                .anyMatch(a -> a.getStatus() != ApprovalStatus.PENDING);
        if (hasNonPending) {
            throw new AppException(ErrorCode.CANNOT_DELETE_APPROVED_OR_REJECTED);
        }

        List<ErrorReport> reports = repository.findAll();

        List<History> histories = historyRepository.findAllByApprovalIn(approvals);
        historyRepository.deleteAll(histories);

        repository.saveAll(reports);
        approvalRepository.deleteAll(approvals);
        repository.deleteAll(reports);
    }


    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<ErrorReportResponse> getInfo(){
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        List<ErrorReport> errorReports = repository.findAllByUser(user);
        if (errorReports.isEmpty()) {
            throw new AppException(ErrorCode.ERROR_REPORT_NOT_EXISTS);
        }
        return errorReports.stream().map(mapper::toErrorReportResponse)
                .sorted(Comparator.comparing(ErrorReportResponse::getErrorDate).reversed())
                .collect(Collectors.toList());
    }


    @PreAuthorize("hasRole('ADMIN')")
    public List<AdminErrorReportResponse> getErrorReportApproved(){
        List<ErrorReport> report = repository.findAllApprovedErrorReports();
        return report.stream().map(mapper::toAdminErrorReportResponse)
                .sorted(Comparator.comparing(AdminErrorReportResponse::getErrorDate).reversed())
                .collect(Collectors.toList());
    }

}
