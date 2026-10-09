package com.thietbi247.backend.repository;

import com.thietbi247.backend.entity.Approval;
import com.thietbi247.backend.entity.History;
import com.thietbi247.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface HistoryRepository extends JpaRepository<History, String> {
    List<History> findAllByUser(User user);

    List<History> findAllByApprovalIn(List<Approval> approvals);

    History findByRequestBorrowId(String requestBorrowId);

    List<History> findAllByUserAndRequestBorrowIdIsNotNull(User user);

    List<History> findAllByUserAndReturnDeviceIdIsNotNull(User user);

    List<History> findAllByRequestBorrowIdIsNotNull();

    List<History> findAllByReturnDeviceIdIsNotNull();

    List<History> findAllByUserAndErrorReportIdIsNotNull(User user);

    List<History> findAllByErrorReportIdIsNotNull();
}
