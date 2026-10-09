package com.thietbi247.backend.mapper.impl;

import com.thietbi247.backend.dto.request.DeviceCreatRequest;
import com.thietbi247.backend.dto.request.ErrorReportRequest;
import com.thietbi247.backend.dto.request.ReturnDeviceRequest;
import com.thietbi247.backend.dto.responsitory.ErrorReportResponse;
import com.thietbi247.backend.dto.responsitory.ReturnDeviceResponse;
import com.thietbi247.backend.entity.Device;
import com.thietbi247.backend.entity.ErrorReport;
import com.thietbi247.backend.entity.ReturnDevice;
import com.thietbi247.backend.mapper.DeviceMapper;
import com.thietbi247.backend.mapper.ErrorReportMapper;
import com.thietbi247.backend.mapper.ReturnDeviceMapper;
import com.thietbi247.backend.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReturnDeviceMapperImpl implements ReturnDeviceMapper {
    private final DeviceMapper deviceMapper;
    private final UserMapper userMapper;


    @Override
    public ReturnDevice toReturnDevice(ReturnDeviceRequest request) {
        if (request == null) {
            return null;
        }

        return ReturnDevice.builder().build();
    }

    @Override
    public void updateDevice(Device employee, DeviceCreatRequest request) {

    }

    @Override
    public ReturnDeviceResponse toReturnDeviceResponse(ReturnDevice returnDevice) {
        if (returnDevice == null) {
            return null;
        }

        return ReturnDeviceResponse.builder()
                .id(returnDevice.getId())
                .user(userMapper.toUserSimpleResponse(returnDevice.getUser()))
                .device(deviceMapper.toDeviceResponse(returnDevice.getDevice()))
                .returnDate(returnDevice.getReturnDate())
                .build();
    }
}
