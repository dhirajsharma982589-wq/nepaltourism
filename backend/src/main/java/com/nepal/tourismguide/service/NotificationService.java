package com.nepal.tourismguide.service;

import com.nepal.tourismguide.dto.NotificationRequest;
import com.nepal.tourismguide.entity.Notification;
import com.nepal.tourismguide.entity.NotificationType;
import com.nepal.tourismguide.exception.ApiException;
import com.nepal.tourismguide.repository.NotificationRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    private static final int DEFAULT_LIMIT = 50;

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public List<Notification> search(Boolean active, NotificationType type, String destination, Integer limit) {
        return repository.search(active, type, destination, LocalDateTime.now(),
                PageRequest.of(0, limit == null ? DEFAULT_LIMIT : limit));
    }

    public Notification getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Notification not found"));
    }

    public Notification create(NotificationRequest request) {
        Notification notification = new Notification();
        apply(notification, request);
        return repository.save(notification);
    }

    public Notification update(Long id, NotificationRequest request) {
        Notification notification = getById(id);
        apply(notification, request);
        return repository.save(notification);
    }

    public Notification updateActive(Long id, boolean active) {
        Notification notification = getById(id);
        notification.setActive(active);
        return repository.save(notification);
    }

    public void delete(Long id) {
        Notification notification = getById(id);
        repository.delete(notification);
    }

    private void apply(Notification notification, NotificationRequest request) {
        notification.setTitle(request.title());
        notification.setMessage(request.message());
        notification.setType(request.type());
        notification.setDestination(request.destination());
        notification.setPriority(request.priority());
        notification.setActive(request.active() == null || request.active());
        notification.setExpiresAt(request.expiresAt());
    }
}
