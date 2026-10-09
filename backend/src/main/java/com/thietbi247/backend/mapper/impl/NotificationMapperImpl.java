package com.thietbi247.backend.mapper.impl;

import com.thietbi247.backend.constant.ApprovalType;
import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.responsitory.NotificationResponse;
import com.thietbi247.backend.entity.Approval;
import com.thietbi247.backend.entity.Notification;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.ApprovalMapper;
import com.thietbi247.backend.mapper.NotificationMapper;
import com.thietbi247.backend.mapper.UserMapper;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE,  makeFinal = true)
public class NotificationMapperImpl implements NotificationMapper {
    UserMapper  userMapper;
    ApprovalMapper approvalMapper;

    public NotificationMapperImpl(UserMapper userMapper, ApprovalMapper approvalMapper) {
        this.userMapper = userMapper;
        this.approvalMapper = approvalMapper;
    }

    public Notification fromApproval(Approval approval) {
        ApprovalType type = detectApprovalType(approval);
        return Notification.builder()
                .approval(approval)
                .user(approval.getUser())
                .notificationDate(LocalDateTime.now())
                .content(generateContent(approval, type))
                .build();
    }

    public ApprovalType detectApprovalType(Approval approval) {
        if (approval.getErrorReport() != null) {
            return ApprovalType.ERROR_REPORT;
        } else if (approval.getReturnDevice() != null) {
            return ApprovalType.RETURN_DEVICE;
        } else if (approval.getRequestBorrow() != null) {
            return ApprovalType.REQUEST_BORROW;
        } else {
            throw new AppException(ErrorCode.APPROVAL_TYPE_INVALID);
        }
    }


    public String generateContent(Approval approval, ApprovalType type) {
        return switch (type) {
            case ERROR_REPORT -> "Phê duyệt báo lỗi: " + approval.getStatus();
            case RETURN_DEVICE -> "Phê duyệt trả thiết bị: " + approval.getStatus();
            case REQUEST_BORROW -> "Phê duyệt mượn thiết bị: " + approval.getStatus();
        };
    }

    @Override
    public NotificationResponse toResponseNotificationResponse(Notification notification) {
        if (notification == null) {
            return null;
        }

        return NotificationResponse.builder()
                .id(notification.getId())
                .user(userMapper.toUserSimpleResponse(notification.getUser()))
                .isRead(notification.isRead())
                .content(notification.getContent())
                .notificationDate(notification.getNotificationDate())
                .approval(approvalMapper.toApprovalSimpleResponse(notification.getApproval()))
                .build();
    }
}
