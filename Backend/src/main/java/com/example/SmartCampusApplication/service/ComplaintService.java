package com.example.SmartCampusApplication.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.SmartCampusApplication.model.Complaint;
import com.example.SmartCampusApplication.model.User;
import com.example.SmartCampusApplication.repository.ComplaintRepository;
import com.example.SmartCampusApplication.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository repo;
    private final UserRepository userRepo;

    public Complaint createComplaint(Complaint complaint, Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        complaint.setUser(user);
        complaint.setStatus("Pending");
        return repo.save(complaint);
    }

    public List<Complaint> getAll() {
        return repo.findAll();
    }

    public List<Complaint> getByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public Complaint updateStatus(Long id, String status) {
        Complaint c = repo.findById(id).orElseThrow();
        c.setStatus(status);
        return repo.save(c);
    }
}
