package com.thietbi247.backend.repository;

import com.thietbi247.backend.entity.Approval;
import com.thietbi247.backend.entity.RequestBorrow;
import com.thietbi247.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RequestBorrowRepository extends JpaRepository<RequestBorrow, String> {
    Optional<RequestBorrow> findByUser_Id(String name);

    Optional<RequestBorrow> findByUser(User user);

    List<RequestBorrow> findAllByUser(User user);

    List<RequestBorrow> findAllByApprovalIn(List<Approval> approvals);

    @Query("SELECT rb " +
            "FROM RequestBorrow rb " +
            "JOIN rb.approval a " +
            "LEFT JOIN History h ON h.requestBorrow = rb " +
            "WHERE a.status = 'APPROVED' " +
            "AND a.type = 'REQUEST_BORROW' " +
            "AND h IS NULL " +
            "AND rb.user.userName = :username")
    List<RequestBorrow> findBorrowedDevicesNotReturnedByUser(@Param("username") String username);
    List<RequestBorrow> findByDueDateBefore(LocalDateTime dateTime);
    List<RequestBorrow> findByDueDateBetween(LocalDateTime start, LocalDateTime end);


}
