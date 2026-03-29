package com.example.SmartCampusApplication.service;

import org.springframework.stereotype.Service;

import com.example.SmartCampusApplication.model.Role;
import com.example.SmartCampusApplication.model.User;
import com.example.SmartCampusApplication.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;

    public User register(User user) {

    // If role not selected → default STUDENT
    if (user.getRole() == null) {
        user.setRole(Role.STUDENT);
    }

    return repo.save(user);
}

    public User login(String email, String password) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }
    
}
