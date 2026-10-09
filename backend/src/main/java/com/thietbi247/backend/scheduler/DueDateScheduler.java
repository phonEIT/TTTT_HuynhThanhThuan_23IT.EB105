package com.thietbi247.backend.scheduler;

import com.thietbi247.backend.constant.ApprovalStatus;
import com.thietbi247.backend.entity.Notification;
import com.thietbi247.backend.entity.RequestBorrow;
import com.thietbi247.backend.entity.Approval;
import com.thietbi247.backend.repository.NotificationRepository;
import com.thietbi247.backend.repository.RequestBorrowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
@Slf4j
@Component
@RequiredArgsConstructor
public class DueDateScheduler {

    private final RequestBorrowRepository requestBorrowRepository;
    private final NotificationRepository notificationRepository;

    @Transactional
    @Scheduled(fixedRate = 60000) // chạy mỗi phút
    public void checkOverdueRequests() {
        LocalDateTime now = LocalDateTime.now();
        log.info("🕐 Scheduler đang chạy để kiểm tra yêu cầu mượn quá hạn...");

        List<RequestBorrow> allRequests = requestBorrowRepository.findAll();

        for (RequestBorrow request : allRequests) {
            Approval approval = request.getApproval();

            if (approval == null || approval.getStatus() == null ||
                    !approval.getStatus().name().equals(ApprovalStatus.APPROVED.name())) {
                continue;
            }

            if (request.getReturnDevice() != null) {

                continue;
            }

            LocalDateTime dueDate = request.getDueDate();
            if (dueDate == null) continue;

            if (dueDate.isBefore(now)) {
                boolean alreadyNotified = notificationRepository.existsByApprovalAndContentContaining(
                        approval, "quá hạn");

                if (!alreadyNotified) {
                    Notification notification = Notification.builder()
                            .content("⚠️ Thiết bị '" + request.getDevice().getProductName() +
                                    "' bạn mượn đã quá hạn trả từ ngày " +
                                    dueDate.toLocalDate() + ". Vui lòng liên hệ để trả thiết bị.")
                            .notificationDate(LocalDateTime.now())
                            .user(request.getUser())
                            .approval(approval)
                            .build();

                    notificationRepository.save(notification);

                } else {
                    log.info("🔁 Request {} đã có thông báo quá hạn rồi", request.getId());
                }
            }
        }
    }
}
