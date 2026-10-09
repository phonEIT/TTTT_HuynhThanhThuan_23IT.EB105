package com.thietbi247.backend.mapper.impl;

import com.thietbi247.backend.dto.request.RoleRequest;
import com.thietbi247.backend.dto.request.UserCreateRequest;
import com.thietbi247.backend.dto.responsitory.RoleResponse;
import com.thietbi247.backend.dto.responsitory.UserResponse;
import com.thietbi247.backend.entity.Role;
import com.thietbi247.backend.entity.User;
import com.thietbi247.backend.mapper.RoleMapper;
import com.thietbi247.backend.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapperImpl implements UserMapper {
    private final RoleMapper roleMapper;

    @Override
    public User toUser(UserCreateRequest request) {
        if (request == null) {
            return null;
        }


        return User.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(request.getPassword())
                .phone(request.getPhone())
                .address(request.getAddress())
                .room(request.getRoom())
//
                .build();
    }


    @Override
    public void updateUser(User user, UserCreateRequest request) {
        if (user == null || request == null) {
            return;
        }


        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPassword());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setRoom(request.getRoom());


    }

    @Override
    public UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        return UserResponse.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .roles(
                        user.getRoles() != null
                                ? user.getRoles().stream()
                                .map(roleMapper::toRoleResponse)
                                .collect(Collectors.toSet())
                                : Collections.emptySet()
                )
                .address(user.getAddress())
                .room(user.getRoom())
                .build();
    }

    @Override
    public UserResponse toUserSimpleResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .room(user.getRoom())
                .build();
    }
}
