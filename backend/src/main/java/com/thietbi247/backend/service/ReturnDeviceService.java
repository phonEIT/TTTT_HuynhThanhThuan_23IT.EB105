package com.thietbi247.backend.service;


import com.thietbi247.backend.constant.ApprovalStatus;
import com.thietbi247.backend.constant.ApprovalType;
import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.request.RequestBorowRequest;
import com.thietbi247.backend.dto.request.ReturnDeviceRequest;
import com.thietbi247.backend.dto.responsitory.RequestBorrowResponse;
import com.thietbi247.backend.dto.responsitory.ReturnDeviceResponse;
import com.thietbi247.backend.entity.*;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.RequestBorrowMapper;
import com.thietbi247.backend.mapper.ReturnDeviceMapper;
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
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReturnDeviceService {

    ReturnDeviceRepository returnDeviceRepository;
    RequestBorrowRepository requestBorrowRepository;
    ApprovalRepository approvalRepository;
    HistoryRepository historyRepository;
    DeviceRepository deviceRepository;
    UserRepository userRepository;
    ReturnDeviceMapper mapper;

    public ReturnDeviceResponse createReturnDevice(ReturnDeviceRequest request) {
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName())
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        Approval approvalBorrow = approvalRepository.findByRequestBorrowId(request.getRequestBorrow_id()).orElseThrow(() ->
                new AppException(ErrorCode.APPROVAL_NOT_EXISTS));

        if (!approvalBorrow.getStatus().equals(ApprovalStatus.APPROVED)) {
            throw new AppException(ErrorCode.REQUEST_BORROW_NOT_APPROVED);
        }

        RequestBorrow borrow = requestBorrowRepository.findById(request.getRequestBorrow_id()).orElseThrow(() ->
                new AppException(ErrorCode.REQUEST_BORROW_NOT_EXISTS));

        Device device = deviceRepository.findById(borrow.getDevice().getId()).orElseThrow(() ->
                new  AppException(ErrorCode.DEVICE_NOT_EXISTS));

        ReturnDevice returnDevice = mapper.toReturnDevice(request);
        returnDevice.setUser(user);
        returnDevice.setDevice(device);
        returnDevice.setRequestBorrow(borrow);
        returnDevice.setReturnDate(LocalDateTime.now());
        returnDevice = returnDeviceRepository.save(returnDevice);

        Approval approval = Approval.builder()
                .status(ApprovalStatus.PENDING)
                .requestDate(LocalDateTime.now())
                .returnDevice(returnDevice)
                .type(ApprovalType.RETURN_DEVICE)
                .user(user)
                .device(device)
                .build();
        approvalRepository.save(approval);

        History historyBorrow = historyRepository.findByRequestBorrowId(request.getRequestBorrow_id());
        historyBorrow.setReturnDate(LocalDateTime.now());
        historyRepository.save(historyBorrow);

        History history = History.builder()
                .returnDate(LocalDateTime.now())
                .borrowDate(borrow.getBorrowDate())
                .user(user)
                .returnDevice(returnDevice)
                .approval(approval)
                .device(device)
                .build();
        historyRepository.save(history);

        return mapper.toReturnDeviceResponse(returnDevice);
    }

    public List<ReturnDeviceResponse> getAllReturnDevice() {
        List<ReturnDevice> returnDevices = returnDeviceRepository.findAll();
        return returnDevices.stream()
                .map(mapper::toReturnDeviceResponse)
                .sorted(Comparator.comparing(ReturnDeviceResponse::getReturnDate).reversed())
                .collect(Collectors.toList());
    }
//
//    public void deleteRequestBorrow(String requestBorrowId) {
//        RequestBorrow requestBorrow = repository.findById(requestBorrowId)
//                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_BORROW_NOT_EXISTS));
//        repository.delete(requestBorrow);
//    }

    @Transactional
    public void deleteAll() {
        List<Approval> approvals = approvalRepository.findAllByType(ApprovalType.RETURN_DEVICE);
        List<History> histories = historyRepository.findAllByApprovalIn(approvals);

        historyRepository.deleteAll(histories);
        approvalRepository.deleteAll(approvals);

//        List<Device> devices = deviceRepository.findAll();
//        for (Device device : devices) {
//            device.setReturnDevice(null);
//        }
//        deviceRepository.saveAll(devices);

        returnDeviceRepository.deleteAll();
    }


    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<ReturnDeviceResponse> getInfo(){
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));

        List<ReturnDevice> returnDevices = returnDeviceRepository.findAllByUser(user);
        if (returnDevices.isEmpty()) {
            throw new AppException(ErrorCode.RETURN_DEVICE_NOT_EXISTS);
        }

        return returnDevices.stream()
                .map(mapper::toReturnDeviceResponse)
                .sorted(Comparator.comparing(ReturnDeviceResponse::getReturnDate).reversed())
                .collect(Collectors.toList());
    }


}
