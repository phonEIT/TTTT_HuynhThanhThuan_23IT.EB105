package com.thietbi247.backend.controller;

import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.request.ErrorReportRequest;
import com.thietbi247.backend.dto.request.RequestBorowRequest;
import com.thietbi247.backend.dto.responsitory.AdminErrorReportResponse;
import com.thietbi247.backend.dto.responsitory.ApiResponse;
import com.thietbi247.backend.dto.responsitory.ErrorReportResponse;
import com.thietbi247.backend.dto.responsitory.RequestBorrowResponse;
import com.thietbi247.backend.service.ErrorReportService;
import com.thietbi247.backend.service.RequestBorrowService;
import com.thietbi247.backend.util.ApiResponseUtil;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/error_report")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ErrorReportController {
    ErrorReportService service;

    @PostMapping
    public ResponseEntity<ErrorReportResponse> createErrorReport(@Valid @RequestBody ErrorReportRequest request) {
        ErrorReportResponse data = service.createErrorReport(request);
        return ApiResponseUtil.success(data, SuccessCode.ERROR_REPORT_CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ErrorReportResponse>> getAllErrorReport() {
        List<ErrorReportResponse> data = service.getAllErrorReport();
        return ApiResponseUtil.success(data, SuccessCode.ERROR_REPORT_LISTED);
    }
//
//    @DeleteMapping("{id}")
//    public ResponseEntity<ApiResponse<Void>> deleteRequestBorrow(@PathVariable String id) {
//        service.deleteRequestBorrow(id);
//        return ApiResponseUtil.success(SuccessCode.REQUEST_BORROW_DELETED);
//    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAll(){
        service.deleteAll();
        return ApiResponseUtil.success(SuccessCode.ERROR_REPORT_DELETED_ALL);
    }

    @GetMapping("/myInfo")
    public ResponseEntity<List<ErrorReportResponse>> getMyRequestBorrow() {
        List<ErrorReportResponse> data = service.getInfo();
        return ApiResponseUtil.success(data, SuccessCode.GET_ERROR_REPORT);
    }

    @GetMapping("/hanlde")
    public ResponseEntity<List<AdminErrorReportResponse>> getAllErrorReportAdmin() {
        List<AdminErrorReportResponse> data = service.getErrorReportApproved();
        return ApiResponseUtil.success(data, SuccessCode.GET_ERROR_REPORT);
    }
}