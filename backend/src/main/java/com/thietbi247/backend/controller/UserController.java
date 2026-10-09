package com.thietbi247.backend.controller;

import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.request.UserCreateRequest;
import com.thietbi247.backend.dto.responsitory.ApiResponse;
import com.thietbi247.backend.dto.responsitory.UserResponse;
import com.thietbi247.backend.service.UserService;
import com.thietbi247.backend.util.ApiResponseUtil;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/admin/employee")
public class UserController {
    UserService userService;


    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserCreateRequest request){
        UserResponse data = userService.createUser(request);
        return ApiResponseUtil.success(data, SuccessCode.EMPLOYEE_CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(@PathVariable String id){
         userService.deleteUser(id);
         return ApiResponseUtil.success(SuccessCode.EMPLOYEE_DELETED);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserResponse> getEmployee(@PathVariable String id){
        UserResponse data = userService.getUser(id);
        return ApiResponseUtil.success(data, SuccessCode.GET_EMPLOYEE);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAllEmployee(){
         userService.deleteAllUser();
        return ApiResponseUtil.success(SuccessCode.EMPLOYEE_DELETED_ALL);
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateEmployee(@Valid @RequestBody UserCreateRequest request){
        UserResponse data = userService.updateUser(request);
        return ApiResponseUtil.success(data, SuccessCode.EMPLOYEE_UPDATED);
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllEmployee() {
        List<UserResponse>  data = userService.getAllUser();
        return ApiResponseUtil.success(data, SuccessCode.EMPLOYEES_LISTED);
    }

    @GetMapping("/myinfo")
    public ResponseEntity<UserResponse> myInfo(){
        UserResponse data = userService.getMyInfo();
        return ApiResponseUtil.success(data, SuccessCode.GET_EMPLOYEE);
    }

    @GetMapping("/technician")
    public ResponseEntity<List<UserResponse>> getTechnician(){
        List<UserResponse> data = userService.getAllTechnician();
        return  ApiResponseUtil.success(data, SuccessCode.EMPLOYEES_LISTED);
    }

}
