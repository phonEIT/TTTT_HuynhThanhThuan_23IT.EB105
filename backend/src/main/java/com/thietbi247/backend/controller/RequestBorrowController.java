package com.thietbi247.backend.controller;

import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.request.RequestBorowRequest;
import com.thietbi247.backend.dto.responsitory.ApiResponse;
import com.thietbi247.backend.dto.responsitory.RequestBorrowResponse;
import com.thietbi247.backend.entity.RequestBorrow;
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
@RequestMapping("/api/admin/request_borrow")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RequestBorrowController {
    RequestBorrowService service;

    @PostMapping
    public ResponseEntity<RequestBorrowResponse> createRequestBorrow(@Valid @RequestBody RequestBorowRequest request) {
        log.info(request.toString());
        RequestBorrowResponse data = service.createRequestBorrow(request);
        log.info(data.toString());
        return ApiResponseUtil.success(data, SuccessCode.REQUEST_BORROW_CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RequestBorrowResponse>> getAllRequestBorrow() {
        List<RequestBorrowResponse> data = service.getAllRequestBorrow();
        return ApiResponseUtil.success(data, SuccessCode.REQUEST_BORROW_LISTED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRequestBorrow(@PathVariable String id) {
        service.deleteRequestBorrow(id);
        return ApiResponseUtil.success(SuccessCode.REQUEST_BORROW_DELETED);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAllRequestBorrow() {
        service.deleteAll();
        return ApiResponseUtil.success(SuccessCode.REQUEST_BORROW_DELETED_ALL);
    }

    @GetMapping("/myInfo")
    public ResponseEntity<List<RequestBorrowResponse>> getMyRequestBorrow() {
        List<RequestBorrowResponse> data = service.getInfo();
        return ApiResponseUtil.success(data, SuccessCode.GET_REQUEST_BORROW);
    }

    @GetMapping("/not-returned")
    public  ResponseEntity<List<RequestBorrowResponse>> getBorrowedDevicesNotReturned() {
        List<RequestBorrowResponse> data = service.getApprovedRequestBorrows();
        return ApiResponseUtil.success(data, SuccessCode.BORROWED_DEVICE_LISTED_BY_USER);
    }

}