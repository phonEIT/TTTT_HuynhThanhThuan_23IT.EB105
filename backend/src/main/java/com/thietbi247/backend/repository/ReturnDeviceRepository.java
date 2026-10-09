package com.thietbi247.backend.repository;

import com.thietbi247.backend.entity.Device;
import com.thietbi247.backend.entity.RequestBorrow;
import com.thietbi247.backend.entity.ReturnDevice;
import com.thietbi247.backend.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ReturnDeviceRepository extends JpaRepository<ReturnDevice, String> {


    Optional<ReturnDevice> findByUser_Id(String name);

    Optional<ReturnDevice> findByUser(User user);

    List<ReturnDevice> findAllByUser(User user);
}
