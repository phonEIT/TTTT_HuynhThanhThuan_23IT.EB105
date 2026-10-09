package com.thietbi247.backend.repository;

import com.thietbi247.backend.entity.Device;
import org.hibernate.annotations.processing.SQL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, String> {
    List<Device> findByProductNameContainingIgnoreCase(String productName);

    Optional<Device> findByProductName(String productName);


    List<Device> findByProductNameContaining(String device);

    @Query(value = "SELECT * FROM device WHERE product_name LIKE %:name%", nativeQuery = true)
    List<Device> findDeviceByName(@Param("name") String name);

}
