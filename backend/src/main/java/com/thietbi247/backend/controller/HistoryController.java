package com.thietbi247.backend.controller;

import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.responsitory.HistoryResponse;
import com.thietbi247.backend.entity.History;
import com.thietbi247.backend.repository.HistoryRepository;
import com.thietbi247.backend.service.HistoryService;
import com.thietbi247.backend.util.ApiResponseUtil;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/history")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HistoryController {
    HistoryService service;

    @GetMapping
    public ResponseEntity<List<HistoryResponse>> getAllHistory() {
        List<HistoryResponse> data = service.getAll();
        return ApiResponseUtil.success(data, SuccessCode.HISTORY_LISTED);
    }

    @GetMapping("/myInfo")
    public ResponseEntity<List<HistoryResponse>> getMyInfo() {
        List<HistoryResponse> data = service.getInfo();
        return ApiResponseUtil.success(data, SuccessCode.GET_HISTORY);
    }

    @GetMapping("/my-return-device")
    public ResponseEntity<List<HistoryResponse>> myReturnHistory() {
        List<HistoryResponse> data = service.myReturnHistory();
        return ApiResponseUtil.success(data, SuccessCode.RETURN_HISTORY_LISTED);
    }

    @GetMapping("/my-request-borrow")
    public ResponseEntity<List<HistoryResponse>> myRequestHistory() {
        List<HistoryResponse> data = service.myRequestBorrowHistory();
        return ApiResponseUtil.success(data, SuccessCode.REQUEST_HISTORY_LISTED);
    }

    @GetMapping("/my-error-report")
    public ResponseEntity<List<HistoryResponse>> myErrorHistory() {
        List<HistoryResponse> data = service.myErrorReportHistory();
        return ApiResponseUtil.success(data, SuccessCode.ERROR_HISTORY_LISTED);
    }

    @GetMapping("/request")
    public ResponseEntity<List<HistoryResponse>> getRequestHistory() {
        List<HistoryResponse> data = service.getAllRequestBorrowHistory();
        return ApiResponseUtil.success(data, SuccessCode.REQUEST_HISTORY_LISTED_ADMIN);
    }

    @GetMapping("/return")
    public ResponseEntity<List<HistoryResponse>> getReturnHistory() {
        List<HistoryResponse> data = service.getAllReturnHistory();
        return ApiResponseUtil.success(data, SuccessCode.RETURN_HISTORY_LISTED_ADMIN);
    }

    @GetMapping("/error")
    public ResponseEntity<List<HistoryResponse>> getErrorHistory() {
        List<HistoryResponse> data = service.getAllErrorHistory();
        return ApiResponseUtil.success(data, SuccessCode.RETURN_HISTORY_LISTED_ADMIN);
    }


}
