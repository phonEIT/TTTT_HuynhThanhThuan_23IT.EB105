package com.thietbi247.backend.config;

import com.thietbi247.backend.constant.RoleType;
import com.thietbi247.backend.entity.Role;
import com.thietbi247.backend.entity.User;
import com.thietbi247.backend.repository.RoleRepository;
import com.thietbi247.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository,
                                        RoleRepository roleRepository,
                                        PasswordEncoder passwordEncoder) {
        return args -> {
            // Tìm hoặc tạo role ADMIN chỉ 1 lần duy nhất
            boolean exitstAdmin = roleRepository.existsByName(RoleType.ADMIN.name());
            if (!exitstAdmin) {
                Role admin = new Role(RoleType.ADMIN.name(), "Quyền quản trị hệ thống", new HashSet<>());
                Role employee = new Role(RoleType.EMPLOYEE.name(), "Quyền nhân viên hệ thống", new HashSet<>());
                roleRepository.saveAll(List.of(admin, employee));

                if (userRepository.findByUserName("admin").isEmpty()) {
                    Set<Role> roles = new HashSet<>();
                    roles.add(admin);
                    roles.add(employee);

                    User roleAdmin = User.builder()
                            .email("admin@gmail.com")
                            .userName("admin")
                            .password(passwordEncoder.encode("admin"))
                            .phone("028349234")
                            .address("Đà Nẵng")
                            .room(101)
                            .roles(roles)
                            .build();

                    userRepository.save(roleAdmin);
                    log.info("Admin has been saved");
                }
            }

            // Tạo admin user nếu chưa có

        };
    }
}
