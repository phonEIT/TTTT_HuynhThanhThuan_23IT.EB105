package com.thietbi247.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ErrorReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String description;
    LocalDateTime errorDate;

    @OneToOne
    @JoinColumn(name = "request_borrow_id")
    RequestBorrow requestBorrow;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @OneToOne(mappedBy = "errorReport", cascade = CascadeType.ALL)
    Approval approval;

    @OneToOne(mappedBy = "errorReport")
    History history;

}
