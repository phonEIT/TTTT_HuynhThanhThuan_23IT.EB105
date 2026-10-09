package com.thietbi247.backend.controller;

import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.responsitory.ApiResponse;
import com.thietbi247.backend.dto.responsitory.NotificationCountResponse;
import com.thietbi247.backend.dto.responsitory.NotificationResponse;
import com.thietbi247.backend.service.NotificationService;
import com.thietbi247.backend.util.ApiResponseUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/notification")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationController {
    NotificationService service;

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getAllNotifications() {
        List<NotificationResponse> data = service.getAll();
        return ApiResponseUtil.success(data, SuccessCode.NOTIFICATION_LISTED);
    }

    @DeleteMapping("id")
    public ResponseEntity<ApiResponse<Void>> deleteNotificationById(@PathVariable String id) {
        service.deleteNotification(id);
        return ApiResponseUtil.success(SuccessCode.NOTIFICATION_DELETED);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAllNotifications() {
        service.deleteAll();
        return ApiResponseUtil.success(SuccessCode.NOTIFICATION_DELETED_ALL);
    }

    @GetMapping("/myinfo")
    public ResponseEntity<List<NotificationResponse>> getNotificationByInfo() {
        List<NotificationResponse> data = service.myInfo();
        return ApiResponseUtil.success(data, SuccessCode.GET_NOTIFICATION);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<NotificationCountResponse> getUnreadCount() {
        NotificationCountResponse data = service.countUnreadNotifications();
        return ApiResponseUtil.success(data, SuccessCode.GET_NOTIFICATION);
    }
}
