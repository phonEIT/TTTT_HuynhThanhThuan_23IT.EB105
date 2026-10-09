package com.thietbi247.backend.repository;

import com.thietbi247.backend.constant.ApprovalStatus;
import com.thietbi247.backend.constant.ApprovalType;
import com.thietbi247.backend.entity.Approval;
import com.thietbi247.backend.entity.RequestBorrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApprovalRepository extends JpaRepository<Approval, String> {
    List<Approval> findAllByType(ApprovalType approvalType);

    Optional<Approval> findByRequestBorrowId(String requestBorrowId);


    Optional<Approval> findByErrorReportId(String id);


}
