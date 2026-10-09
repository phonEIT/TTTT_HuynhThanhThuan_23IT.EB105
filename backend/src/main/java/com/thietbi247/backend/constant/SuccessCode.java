package com.thietbi247.backend.constant;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,  makeFinal = true)
public enum SuccessCode {

    DEVICE_CREATED(1000, "Device created successfully", HttpStatus.CREATED),
    RETURN_DEVICE_CREATED(1000, "Return Device created successfully", HttpStatus.CREATED),
    REQUEST_BORROW_CREATED(1000, "Request borrow created successfully", HttpStatus.CREATED),
    ERROR_REPORT_CREATED(1000, "Error report created successfully", HttpStatus.CREATED),
    CATEGORY_CREATED(1000, "Category created successfully", HttpStatus.CREATED),
    PERMISSION_CREATED(1000, "PermissionPermission created successfully", HttpStatus.CREATED),
    EMPLOYEE_CREATED(1000, "Employee created successfully", HttpStatus.CREATED),
    ROLE_CREATED(1000, "Role created successfully", HttpStatus.CREATED),
    TASK_CREATED(1000, "Task created successfully", HttpStatus.CREATED),

    EMPLOYEES_LISTED(1000, "Employee listed successfully", HttpStatus.OK),
    TASK_LISTED(1000, "Task listed successfully", HttpStatus.OK),
    TASK_HISTORY_LISTED(1000, "Task history listed successfully", HttpStatus.OK),
    APPROVAL_LISTED(1000, "Approval listed successfully", HttpStatus.OK),
    DEVICE_LISTED(1000, "Device listed successfully", HttpStatus.OK),
    RETURN_DEVICE_LISTED(1000, "Return Device listed successfully", HttpStatus.OK),
    REQUEST_BORROW_LISTED(1000, "Request Borrow listed successfully", HttpStatus.OK),
    NOTIFICATION_LISTED(1000, "Notification listed successfully", HttpStatus.OK),
    ERROR_REPORT_LISTED(1000, "Error Report listed successfully", HttpStatus.OK),
    HISTORY_LISTED(1000, "History listed successfully", HttpStatus.OK),
    RETURN_HISTORY_LISTED(1000, "Return History listed successfully", HttpStatus.OK),
    REQUEST_HISTORY_LISTED(1000, "Request Borrow History listed successfully", HttpStatus.OK),
    ERROR_HISTORY_LISTED(1000, "Error Borrow History listed successfully", HttpStatus.OK),
    RETURN_HISTORY_LISTED_ADMIN(1000, "Return History admin listed successfully", HttpStatus.OK),
    REQUEST_HISTORY_LISTED_ADMIN(1000, "Request Borrow admin History listed successfully", HttpStatus.OK),
    ERROR_HISTORY_LISTED_ADMIN(1000, "Error Borrow admin History listed successfully", HttpStatus.OK),

    CATEGORY_LISTED(1000, "Category listed successfully", HttpStatus.OK),
    PERMISSION_LISTED(1000, "Permission listed successfully", HttpStatus.OK),
    ROLE_LISTED(1000, "Role listed successfully", HttpStatus.OK),
    BORROWED_DEVICE_LISTED_BY_USER(1001, "Borrowed devices not returned listed successfully by user", HttpStatus.OK),
    TASK_IN_PROGRESS_LISTED(1000, "Task In Progress listed successfully", HttpStatus.OK),


    EMPLOYEE_DELETED_ALL(1000, "Employee deleted all successfully", HttpStatus.OK),
    CATEGORY_DELETED_ALL(1000, "Category deleted all successfully", HttpStatus.OK),
    PERMISSION_DELETED_All(1000, "Permission deleted all successfully", HttpStatus.OK),
    RETURN_DEVICE_DELETED_ALL(1000, "Return Device deleted all successfully", HttpStatus.OK),
    ERROR_REPORT_DELETED_ALL(1000, "Error report deleted successfully", HttpStatus.OK),
    REQUEST_BORROW_DELETED_ALL(1000, "Request Borrow deleted all successfully", HttpStatus.OK),
    APPROVAL_DELETED_ALL(1000, "Approval deleted all successfully", HttpStatus.OK),
    ROLE_DELETED_ALL(1000, "Role deleted all successfully", HttpStatus.OK),
    NOTIFICATION_DELETED_ALL(1000, "Notification deleted all successfully", HttpStatus.OK),

    CATEGORY_DELETED(1000, "Category deleted successfully", HttpStatus.OK),
    ROLE_DELETED(1000, "Role deleted successfully", HttpStatus.OK),
    EMPLOYEE_DELETED(1000, "Employee deleted successfully", HttpStatus.OK),
    PERMISSION_DELETED(1000, "Permission deleted successfully", HttpStatus.OK),
    DEVICE_DELETED(1000, "Device deleted successfully", HttpStatus.OK),
    REQUEST_BORROW_DELETED(1000, "Request Borrow deleted successfully", HttpStatus.OK),
    NOTIFICATION_DELETED(1000, "Notification deleted successfully", HttpStatus.OK),

    EMPLOYEE_UPDATED(1000, "Employee updated successfully", HttpStatus.OK),
    APPROVAL_UPDATED(1000, "Approval updated successfully", HttpStatus.OK),
    DEVICE_UPDATED(1000, "Device updated successfully", HttpStatus.OK),

    GET_EMPLOYEE(1000, "Get Employee successfully", HttpStatus.OK),
    GET_DEVICE(1000, "Get Device successfully", HttpStatus.OK),
    GET_HISTORY(1000, "Get History successfully", HttpStatus.OK),
    GET_REQUEST_BORROW(1000, "Get request borrow successfully", HttpStatus.OK),
    GET_ERROR_REPORT(1000, "Get error report successfully", HttpStatus.OK),
    GET_RETURN_DEVICE(1000, "Get return device successfully", HttpStatus.OK),
    GET_NOTIFICATION(1000, "Get notification successfully", HttpStatus.OK),
    GET_CATEGORY_BY_ID(1000, "Get Category by id", HttpStatus.OK),

    LOGIN_SUCCESSFUL(1000, "Login successful", HttpStatus.OK),
    LOGOUT_SUCCESSFUL(1000, "Logout successful", HttpStatus.OK),
    LOGIN_FAIL(1001, "Login fail", HttpStatus.BAD_REQUEST),

    AI_CHAT_SUCCESS(1100, "Chat AI successful", HttpStatus.OK),
    AI_CHAT_MESSAGE_SUCCESS(1100, "Chat AI message successful", HttpStatus.OK),
    AUTHENTICATED(1002, "Authenticated", HttpStatus.OK);            // Đăng nhập thành công


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
