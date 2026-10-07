package com.nepal.tourismguide.controller;

import com.nepal.tourismguide.dto.NotificationActiveRequest;
import com.nepal.tourismguide.dto.NotificationRequest;
import com.nepal.tourismguide.entity.Notification;
import com.nepal.tourismguide.entity.NotificationType;
import com.nepal.tourismguide.service.NotificationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(
            @RequestParam(defaultValue = "true") Boolean active,
            @RequestParam(required = false) NotificationType type,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) @Positive Integer limit) {
        return ResponseEntity.ok(notificationService.search(active, type, destination, limit));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotification(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Notification> create(@Valid @RequestBody NotificationRequest request) {
        return ResponseEntity.status(201).body(notificationService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Notification> update(@PathVariable Long id, @Valid @RequestBody NotificationRequest request) {
        return ResponseEntity.ok(notificationService.update(id, request));
    }

    @PatchMapping("/{id}/active")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Notification> updateActive(
            @PathVariable Long id, @Valid @RequestBody NotificationActiveRequest request) {
        return ResponseEntity.ok(notificationService.updateActive(id, request.active()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
