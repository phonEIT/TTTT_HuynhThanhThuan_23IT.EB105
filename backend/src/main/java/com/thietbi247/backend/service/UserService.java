package com.thietbi247.backend.service;

import com.thietbi247.backend.constant.ErrorCode;
import com.thietbi247.backend.constant.RoleType;
import com.thietbi247.backend.dto.request.UserCreateRequest;
import com.thietbi247.backend.dto.responsitory.UserResponse;
import com.thietbi247.backend.entity.Role;
import com.thietbi247.backend.entity.User;
import com.thietbi247.backend.exception.AppException;
import com.thietbi247.backend.mapper.UserMapper;
import com.thietbi247.backend.repository.RoleRepository;
import com.thietbi247.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class UserService {
    UserMapper mapper;
    UserRepository repository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;

    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse createUser(UserCreateRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTS);
        }

        if (!repository.findByUserName(request.getUserName()).isEmpty()) {
            throw new AppException(ErrorCode.EMPLOYEE_EXISTS);
        }

        User user = mapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            Set<Role> roles = new HashSet<>(roleRepository.findAllById(request.getRoles()));
            if (roles.size() != request.getRoles().size()) {
                throw new AppException(ErrorCode.ROLE_NOT_EXISTS);
            }
            user.setRoles(roles);
        } else {
            throw new AppException(ErrorCode.ROLE_NOT_EXISTS);
        }

        repository.save(user);
        return mapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(String id) {
        User user = repository.findById(id).orElseThrow(()
                -> new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));
        repository.delete(user);
    }

    @PostAuthorize("hasRole('ADMIN')")
    public UserResponse getUser(String id) {
        log.info("In method getUser");
        User user = repository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));
        return mapper.toUserResponse(user);
    }


    public UserResponse getMyInfo() {
        var info = SecurityContextHolder.getContext().getAuthentication();
        User user = repository.findByUserName(info.getName()).orElseThrow(() ->
                new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS));
        return mapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAllUser() {
        repository.deleteAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse updateUser(UserCreateRequest request) {
        if (!repository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS);
        }
        User user = mapper.toUser(request);
        repository.save(user);
        return mapper.toUserResponse(user);
    }


    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        log.info("Username: " + auth.getName());
        auth.getAuthorities().forEach(role -> {
            log.info(role.getAuthority());
        });
        List<User> users = repository.findAll();

        return users.stream().map(mapper::toUserResponse).collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllTechnician(){
        Set<User> technicians = repository.findAllByRoles_Name(RoleType.TECHNICIAN.name());
        if (technicians.isEmpty()) {
            new AppException(ErrorCode.EMPLOYEE_NOT_EXISTS);
        }
        return technicians.stream().map(mapper::toUserResponse).collect(Collectors.toList());
    }
}

