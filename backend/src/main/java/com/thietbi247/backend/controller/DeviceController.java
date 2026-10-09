package com.thietbi247.backend.controller;

import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.request.DeviceCreatRequest;
import com.thietbi247.backend.dto.request.DeviceUpdateRequest;
import com.thietbi247.backend.dto.responsitory.ApiResponse;
import com.thietbi247.backend.dto.responsitory.DeviceResponse;
import com.thietbi247.backend.service.DeviceService;
import com.thietbi247.backend.util.ApiResponseUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/admin/device")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeviceController {
    DeviceService deviceService;

    @PostMapping
    public ResponseEntity<DeviceResponse> createDevice(@RequestBody DeviceCreatRequest request) {
        DeviceResponse data = deviceService.createDevice(request);
        return  ApiResponseUtil.success(data, SuccessCode.DEVICE_CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DeviceResponse>> getAllDevices() {
        List<DeviceResponse> data = deviceService.getAllDevices();
        return ApiResponseUtil.success(data, SuccessCode.DEVICE_LISTED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDevice(@PathVariable String id) {
        deviceService.deleteDevice(id);
        return ApiResponseUtil.success(SuccessCode.DEVICE_DELETED);
    }

    @GetMapping("{name}")
    public ResponseEntity<List<DeviceResponse>> getDevice(@PathVariable String name) {
        List<DeviceResponse> data = deviceService.getDeviceByName(name);
        return ApiResponseUtil.success(data, SuccessCode.GET_DEVICE);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAllDevice() {
        deviceService.deleteAllDevice();
        return ApiResponseUtil.success(SuccessCode.DEVICE_DELETED);
    }



    @PutMapping
    public ResponseEntity<ApiResponse<Void>> updateDevice(@RequestBody DeviceUpdateRequest request) {
        deviceService.updateDevice(request);
        return  ApiResponseUtil.success(SuccessCode.DEVICE_UPDATED);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestBody Map<String, String> body) {
        String imageUrl = body.get("imageUrl");
        System.out.println("Nhận URL ảnh: " + imageUrl);
        // Lưu vào database hoặc xử lý tiếp
        return ResponseEntity.ok("Đã nhận ảnh");
    }
}