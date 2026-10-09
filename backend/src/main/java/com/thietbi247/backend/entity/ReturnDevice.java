package com.thietbi247.backend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
public class ReturnDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    LocalDateTime returnDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "device_id")
     Device device;

    @OneToOne(mappedBy = "returnDevice", cascade = CascadeType.ALL)
    Approval approval;

    @OneToOne
    @JoinColumn(name = "request_borrow_id")
    RequestBorrow requestBorrow;

    @OneToOne(mappedBy = "returnDevice")
    History history;

}

