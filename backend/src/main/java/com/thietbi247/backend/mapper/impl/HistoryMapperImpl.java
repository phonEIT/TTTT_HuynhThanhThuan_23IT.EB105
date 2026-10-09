package com.thietbi247.backend.mapper.impl;

import com.thietbi247.backend.dto.request.CategoryCreatResquest;
import com.thietbi247.backend.dto.responsitory.CategoryReponse;
import com.thietbi247.backend.dto.responsitory.HistoryResponse;
import com.thietbi247.backend.entity.Category;
import com.thietbi247.backend.entity.History;
import com.thietbi247.backend.mapper.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HistoryMapperImpl implements HistoryMapper {

    UserMapper  userMapper;
    DeviceMapper deviceMapper;
    ApprovalMapper approvalMapper;

    @Override
    public HistoryResponse toHistoryResponse(History history) {
        if (history == null) {
            return null;
        }
        return HistoryResponse.builder()
                .id(history.getId())
                .borrowDate(history.getBorrowDate())
                .returnDate(history.getReturnDate())
                .errorDate(history.getErrorDate())
                .user(userMapper.toUserSimpleResponse(history.getUser()))
                .device(deviceMapper.toDeviceResponse(history.getDevice()))
                .approval(approvalMapper.toApprovalSimpleResponse(history.getApproval()))
                .build();
    }
}
