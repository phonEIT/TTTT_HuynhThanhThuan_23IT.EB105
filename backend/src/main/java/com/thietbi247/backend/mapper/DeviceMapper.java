package com.thietbi247.backend.mapper;


import com.thietbi247.backend.dto.request.DeviceCreatRequest;
import com.thietbi247.backend.dto.request.DeviceUpdateRequest;
import com.thietbi247.backend.dto.responsitory.DeviceResponse;
import com.thietbi247.backend.entity.Approval;
import com.thietbi247.backend.entity.Device;

public interface DeviceMapper {
    Device toDevice(DeviceCreatRequest request);
    void updateDevice(Device device, DeviceUpdateRequest request);
    DeviceResponse toDeviceResponse(Device device);


}
