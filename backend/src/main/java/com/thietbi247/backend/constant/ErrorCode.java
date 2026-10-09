package com.thietbi247.backend.constant;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,  makeFinal = true)
public enum ErrorCode {

    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    EMPLOYEE_EXISTS(1001, "Employee already exists", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTS(1001, "Email already exists", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_EXISTS(1001, "Category not exists", HttpStatus.BAD_REQUEST),
    HISTORY_NOT_EXISTS(1001, "History not exists", HttpStatus.BAD_REQUEST),
    NOTIFICATION_NOT_EXISTS(1001, "Notification not exists", HttpStatus.BAD_REQUEST),
    DEVICE_NOT_EXISTS(1001, "Device not exists", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTS(1001, "Role not exists", HttpStatus.BAD_REQUEST),
    APPROVAL_NOT_EXISTS(1005, "Approval not exists", HttpStatus.NOT_FOUND),
    REQUEST_BORROW_NOT_EXISTS(1001, "Request borrow not exists", HttpStatus.BAD_REQUEST),
    RETURN_DEVICE_NOT_EXISTS(1001, "Return device not exists", HttpStatus.BAD_REQUEST),
    ERROR_REPORT_NOT_EXISTS(1001, "Error report not exists", HttpStatus.BAD_REQUEST),
    EMPLOYEE_NOT_EXISTS(1005, "Employee not exists", HttpStatus.NOT_FOUND),
    TASK_NOT_EXISTS(1005, "Task not exists", HttpStatus.NOT_FOUND),

    EMPLOYEE_VALIDATE_EXCEPTION(1002, "Username must be at least 3 characters", HttpStatus.BAD_REQUEST),
    PASSWORD_TOO_SHORT(1003, "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    EMPLOYEE_MUST_BE_ADULT(1004, "Employee must be at least 18 years old", HttpStatus.BAD_REQUEST),
    INVALID_KEY(1006, "Invalid message key", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Invalid password", HttpStatus.UNAUTHORIZED),   // Sai mật khẩu
    INVALID_REQUEST(1006, "Invalid message request", HttpStatus.BAD_REQUEST),
    INVALID_DUE_DATE(1006, "Invalid Due date request", HttpStatus.BAD_REQUEST),

    CANNOT_DELETE_APPROVED_OR_REJECTED(1010, "Cannot delete Error Report because it has been approved or rejected", HttpStatus.BAD_REQUEST),
    REQUEST_BORROW_NOT_APPROVED(1006, "Request borrow has not been approved", HttpStatus.BAD_REQUEST),
    ERROR_REPORT_NOT_APPROVED(1002, "Error report has not been approved", HttpStatus.BAD_REQUEST),
    EMPLOYEE_NOT_TECHNICAL(1002, "Employee has not been technical", HttpStatus.BAD_REQUEST),


    LOGIN_FAIL(1001, "Login fail", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1001, "Unauthenticated", HttpStatus.UNAUTHORIZED), // Chưa đăng nhập
    UNAUTHORIZED(1003, "You don't have permission", HttpStatus.FORBIDDEN),// Không đủ quyền
    APPROVAL_TYPE_INVALID(1004, "Approval type is invalid", HttpStatus.BAD_REQUEST);


    int code;
    String message;
    HttpStatus status;

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public int getCode() {
        return code;
    }
}
