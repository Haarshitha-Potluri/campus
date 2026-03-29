package com.example.SmartCampusApplication.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SmartCampusApplication.model.Complaint;
import com.example.SmartCampusApplication.service.ComplaintService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/complaints")
@RequiredArgsConstructor
@CrossOrigin
public class ComplaintController {

    private final ComplaintService service;

    @PostMapping
    public Complaint create(@RequestBody Complaint complaint,
                            @RequestParam Long userId) {
        return service.createComplaint(complaint, userId);
    }

    @GetMapping
    public List<Complaint> getAll() {
        return service.getAll();
    }

    @GetMapping("/user/{userId}")
    public List<Complaint> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    @PutMapping("/{id}")
    public Complaint update(@PathVariable Long id,
                            @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}
