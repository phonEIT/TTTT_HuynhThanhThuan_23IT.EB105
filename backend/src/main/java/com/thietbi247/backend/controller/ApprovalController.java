package com.thietbi247.backend.controller;

import com.thietbi247.backend.constant.ApprovalType;
import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.request.ApprovalUpdateRequest;
import com.thietbi247.backend.dto.responsitory.ApiResponse;
import com.thietbi247.backend.dto.responsitory.ApprovalResponse;
import com.thietbi247.backend.mapper.ApprovalMapper;
import com.thietbi247.backend.service.ApprovalService;
import com.thietbi247.backend.util.ApiResponseUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/approval")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApprovalController {
    ApprovalService service;

    @GetMapping
    public ResponseEntity<List<ApprovalResponse>> getAll(){
        List<ApprovalResponse> data = service.getAll();
        return ApiResponseUtil.success(data, SuccessCode.APPROVAL_LISTED);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<ApprovalResponse>> getAllError(@PathVariable ApprovalType type){
        List<ApprovalResponse> data = service.getApprovalType(type);
        return ApiResponseUtil.success(data, SuccessCode.APPROVAL_LISTED);
    }


//    @DeleteMapping
//    public  ResponseEntity<ApiResponse<Void>> deleteAll(){
//        service.deleteAll();
//        return ApiResponseUtil.success(SuccessCode.APPROVAL_DELETED_ALL);
//    }

    @PutMapping
    public  ResponseEntity<ApprovalResponse> updateApproval(@RequestBody ApprovalUpdateRequest request){
        ApprovalResponse data = service.updateApproval(request);
        return ApiResponseUtil.success(data, SuccessCode.APPROVAL_UPDATED);
    }
}
