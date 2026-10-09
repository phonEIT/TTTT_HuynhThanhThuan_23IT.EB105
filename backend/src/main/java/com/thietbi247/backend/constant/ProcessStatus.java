package com.thietbi247.backend.constant;

public enum ProcessStatus {
    PENDING,       // Mới được giao
    IN_PROGRESS,   // Đang xử lý
    COMPLETED,     // Đã hoàn thành
    REJECTED       // Không thể xử lý / từ chối
}
