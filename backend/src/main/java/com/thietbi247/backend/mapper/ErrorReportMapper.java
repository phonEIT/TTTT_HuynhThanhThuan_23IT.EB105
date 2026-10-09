package com.thietbi247.backend.mapper;
import com.thietbi247.backend.dto.request.DeviceCreatRequest;
import com.thietbi247.backend.dto.request.ErrorReportRequest;
import com.thietbi247.backend.dto.request.RequestBorowRequest;
import com.thietbi247.backend.dto.responsitory.AdminErrorReportResponse;
import com.thietbi247.backend.dto.responsitory.ErrorReportResponse;
import com.thietbi247.backend.entity.Device;
import com.thietbi247.backend.entity.ErrorReport;

public interface ErrorReportMapper {
    ErrorReport toErrorReport(ErrorReportRequest request);

    ErrorReportResponse toErrorReportResponse(ErrorReport errorReport);

    AdminErrorReportResponse  toAdminErrorReportResponse(ErrorReport errorReport);
}
