package com.thietbi247.backend.mapper.impl;

import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.dto.request.DeviceCreatRequest;
import com.thietbi247.backend.dto.request.RequestBorowRequest;
import com.thietbi247.backend.dto.responsitory.RequestBorrowResponse;
import com.thietbi247.backend.entity.Device;
import com.thietbi247.backend.entity.RequestBorrow;
import com.thietbi247.backend.entity.User;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.DeviceMapper;
import com.thietbi247.backend.mapper.RequestBorrowMapper;
import com.thietbi247.backend.mapper.UserMapper;
import com.thietbi247.backend.repository.DeviceRepository;
import com.thietbi247.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RequestBorrowMapperImpl implements RequestBorrowMapper {
    UserMapper userMapper;
    DeviceMapper deviceMapper;

    @Override
    public RequestBorrow toRequestBorrow(RequestBorowRequest request) {

        return RequestBorrow.builder()
                .borrowReason(request.getBorrowReason())
                .dueDate(request.getDueDate())
                .build();
    }

    @Override
    public void updateDevice(Device device, DeviceCreatRequest request) {
        device.setProductName(request.getProductName());
        device.setQuantity(request.getQuantity());
        device.setStatus(request.getStatus());
        device.setImage(request.getImage());
        device.setDescription(request.getDescription());
    }

    @Override
    public RequestBorrowResponse toRequestBorrowResponse(RequestBorrow requestBorrow) {
        return RequestBorrowResponse.builder()
                .id(requestBorrow.getId())
                .borrowDate(requestBorrow.getBorrowDate())
                .borrowReason(requestBorrow.getBorrowReason())
                .dueDate(requestBorrow.getDueDate())
                .user(userMapper.toUserSimpleResponse(requestBorrow.getUser()))
                .device(deviceMapper.toDeviceResponse(requestBorrow.getDevice()))
                .build();
    }
}
