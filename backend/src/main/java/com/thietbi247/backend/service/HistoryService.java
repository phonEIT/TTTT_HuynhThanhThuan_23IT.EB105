package com.thietbi247.backend.service;

import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.responsitory.HistoryResponse;
import com.thietbi247.backend.entity.History;
import com.thietbi247.backend.entity.User;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.HistoryMapper;
import com.thietbi247.backend.repository.HistoryRepository;
import com.thietbi247.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Builder
@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HistoryService {
    HistoryMapper mapper;
    UserRepository userRepository;
    HistoryRepository historyRepository;

    private User getCurrentUser() {
        var info = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUserName(info.getName())
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<HistoryResponse> getAll(){
        List<History> histories = historyRepository.findAll();
        return histories.stream()
                .map(mapper::toHistoryResponse)
                .sorted(Comparator.comparing(HistoryResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<HistoryResponse> getInfo(){
        User  user = getCurrentUser();
        List<History> histories = historyRepository.findAllByUser(user);
        if (histories.isEmpty()) {
            throw new AppException(ErrorCode.HISTORY_NOT_EXISTS);
        }

        return histories.stream()
                .map(mapper::toHistoryResponse)
                .sorted(Comparator.comparing(HistoryResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<HistoryResponse> myReturnHistory(){
        User  user = getCurrentUser();
        List<History> histories = historyRepository.findAllByUserAndReturnDeviceIdIsNotNull(user);
        return histories.stream()
                .map(mapper::toHistoryResponse)
                .sorted(Comparator.comparing(HistoryResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());

    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<HistoryResponse> myRequestBorrowHistory(){
        User  user = getCurrentUser();
        List<History> histories = historyRepository.findAllByUserAndRequestBorrowIdIsNotNull(user);
        return histories.stream()
                .map(mapper::toHistoryResponse)
                .sorted(Comparator.comparing(HistoryResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());

    }

    public List<HistoryResponse> myErrorReportHistory(){
        User  user = getCurrentUser();
        List<History> histories = historyRepository.findAllByUserAndErrorReportIdIsNotNull(user);
        return histories.stream()
                .map(mapper::toHistoryResponse)
                .sorted(Comparator.comparing(HistoryResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());

    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<HistoryResponse> getAllRequestBorrowHistory(){
        List<History> histories = historyRepository.findAllByRequestBorrowIdIsNotNull();
        return histories.stream()
                .map(mapper::toHistoryResponse)
                .sorted(Comparator.comparing(HistoryResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());

    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<HistoryResponse> getAllReturnHistory(){
        List<History> histories = historyRepository.findAllByReturnDeviceIdIsNotNull();
        return histories.stream()
                .map(mapper::toHistoryResponse)
                .sorted(Comparator.comparing(HistoryResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());

    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<HistoryResponse> getAllErrorHistory(){
        List<History> histories = historyRepository.findAllByErrorReportIdIsNotNull();
        return histories.stream()
                .map(mapper::toHistoryResponse)
                .sorted(Comparator.comparing(HistoryResponse::getBorrowDate).reversed())
                .collect(Collectors.toList());

    }
}
