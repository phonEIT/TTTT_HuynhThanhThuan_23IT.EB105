package com.thietbi247.backend.service;

import com.thietbi247.backend.constant.ApprovalStatus;
import com.thietbi247.backend.constant.ApprovalType;
import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.request.RequestBorowRequest;
import com.thietbi247.backend.dto.responsitory.ApprovalResponse;
import com.thietbi247.backend.dto.responsitory.RequestBorrowResponse;
import com.thietbi247.backend.entity.*;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.RequestBorrowMapper;
import com.thietbi247.backend.repository.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
public class RequestBorrowService {

    RequestBorrowMapper mapper;
    RequestBorrowRepository repository;
    ApprovalRepository approvalRepository;
    UserRepository userRepository;
    HistoryRepository historyRepository;
    DeviceRepository deviceRepository;

    @PreAuthorize("hasRole('EMPLOYEE')")
    @Transactional
    public RequestBorrowResponse createRequestBorrow(RequestBorowRequest request) {
        // Lấy user hiện tại
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName())
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        // Kiểm tra device_id
        if (request.getDevice_id() == null || request.getDevice_id().isEmpty()) {
            throw new AppException(ErrorCode.DEVICE_NOT_EXISTS);
        }

        // Lấy device
        Device device = deviceRepository.findById(request.getDevice_id())
                .orElseThrow(() -> new AppException(ErrorCode.DEVICE_NOT_EXISTS));

        // Tạo RequestBorrow
        RequestBorrow borrow = RequestBorrow.builder()
                .user(user)
                .borrowDate(LocalDateTime.now())
                .borrowReason(request.getBorrowReason())
                .dueDate(request.getDueDate())
                .device(device) // mỗi request chỉ 1 device
                .build();

        borrow = repository.save(borrow);

        // Tạo Approval
        Approval approval = Approval.builder()
                .status(ApprovalStatus.PENDING)
                .requestDate(LocalDateTime.now())
                .user(user)
                .type(ApprovalType.REQUEST_BORROW)
                .requestBorrow(borrow)
                .device(device)
                .build();
        approval = approvalRepository.save(approval);

        // Tạo History
        History history = History.builder()
                .borrowDate(LocalDateTime.now())
                .requestBorrow(borrow)
                .user(user)
                .device(device)
                .approval(approval)
                .build();
        historyRepository.save(history);

        return mapper.toRequestBorrowResponse(borrow);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<RequestBorrowResponse> getAllRequestBorrow() {
        List<RequestBorrow> requestBorrows = repository.findAll();
        return requestBorrows.stream()
                .map(mapper::toRequestBorrowResponse)
                .sorted(Comparator.comparing(RequestBorrowResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public void deleteRequestBorrow(String requestBorrowId) {
        RequestBorrow requestBorrow = repository.findById(requestBorrowId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_BORROW_NOT_EXISTS));
        repository.delete(requestBorrow);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteAll() {
        // 1. Lấy tất cả Approval loại REQUEST_BORROW
        List<Approval> approvals = approvalRepository.findAllByType(ApprovalType.REQUEST_BORROW)
                .stream()
                .filter(approval -> approval.getStatus() == ApprovalStatus.PENDING)
                .collect(Collectors.toList());

        if (approvals.isEmpty()) {
            throw new AppException(ErrorCode.CANNOT_DELETE_APPROVED_OR_REJECTED);
        }

        List<History> histories = historyRepository.findAllByApprovalIn(approvals);
        historyRepository.deleteAll(histories);

        // 4. Clear quan hệ devices trong RequestBorrow
        List<RequestBorrow> borrows = repository.findAllByApprovalIn(approvals);
        for (RequestBorrow borrow : borrows) {
            borrow.setDevice(null); // xóa liên kết với device
            repository.save(borrow);
        }

        repository.saveAll(borrows);

        // 5. Xóa approvals
        approvalRepository.deleteAll(approvals);

        // 6. Xóa RequestBorrow
        repository.deleteAll();
    }


    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<RequestBorrowResponse> getInfo(){
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        List<RequestBorrow> requestBorrows = repository.findAllByUser(user);
        if (requestBorrows.isEmpty()) {
            throw new AppException(ErrorCode.REQUEST_BORROW_NOT_EXISTS);
        }

        return requestBorrows.stream()
                .map(mapper::toRequestBorrowResponse)
                .sorted(Comparator.comparing(RequestBorrowResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());
    }


    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<RequestBorrowResponse> getApprovedRequestBorrows(){
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS)
        );

        List<RequestBorrow> borrows = repository.findBorrowedDevicesNotReturnedByUser(user.getUserName());

        if (borrows.isEmpty()) {
            throw new AppException(ErrorCode.REQUEST_BORROW_NOT_EXISTS);
        }

        return borrows.stream()
                .map(mapper::toRequestBorrowResponse)
                .collect(Collectors.toList());

    }
}
