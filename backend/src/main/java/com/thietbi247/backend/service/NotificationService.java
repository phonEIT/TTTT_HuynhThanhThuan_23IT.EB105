package com.thietbi247.backend.service;

import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.responsitory.NotificationCountResponse;
import com.thietbi247.backend.dto.responsitory.NotificationResponse;
import com.thietbi247.backend.entity.Notification;
import com.thietbi247.backend.entity.User;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.NotificationMapper;
import com.thietbi247.backend.repository.NotificationRepository;
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

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationService {
    NotificationRepository repository;
    UserRepository userRepository;
    NotificationMapper  mapper;

    @PreAuthorize("hasRole('ADMIN')")
    public List<NotificationResponse> getAll(){
        List<Notification>  notifications = repository.findAll();

        return notifications.stream().map(mapper::toResponseNotificationResponse)
                .sorted(Comparator.comparing(NotificationResponse::getNotificationDate).reversed())
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public void deleteNotification(String id) {
        Notification notification = repository.findById(id).orElseThrow(() ->
                new AppException(ErrorCode.NOTIFICATION_NOT_EXISTS));
        repository.delete(notification);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAll() {
        repository.deleteAll();
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<NotificationResponse> myInfo() {
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));
        List<Notification> notifications = repository.findAllByUser(user);
        if (notifications.isEmpty()) {
            new AppException(ErrorCode.NOTIFICATION_NOT_EXISTS);
        }

        boolean hadUnRead = false;
        for (Notification notification : notifications) {
            if (!notification.isRead()) {
                notification.setRead(true);
                hadUnRead = true;
            }
        }

        if (!hadUnRead) {
            repository.saveAll(notifications);
        }


        return notifications.stream().map(mapper::toResponseNotificationResponse)
                .sorted(Comparator.comparing(NotificationResponse::getNotificationDate).reversed())
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    public NotificationCountResponse countUnreadNotifications() {
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(info.getName())
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));
        int data = repository.countByUserAndIsReadFalse(user);
        return NotificationCountResponse.builder()
                .count(data)
                .build();
    }

}
