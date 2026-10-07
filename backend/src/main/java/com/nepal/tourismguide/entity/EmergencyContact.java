package com.nepal.tourismguide.entity;

import jakarta.persistence.*;

/**
 * Emergency service contact for tourists in Nepal.
 * Phone numbers are sourced from authoritative references (Nepal Police, NTB).
 * If a number cannot be verified it is stored with available=false rather than invented.
 */
@Entity
@Table(name = "emergency_contacts")
public class EmergencyContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    /** The emergency phone number. May be null if the contact is marked unavailable. */
    @Column(length = 60)
    private String phone;

    @Column(length = 255)
    private String description;

    /**
     * Category of service. E.g. POLICE, AMBULANCE, FIRE, TOURIST_POLICE, ARMED_POLICE, RED_CROSS, OTHER.
     */
    @Column(name = "service_type", length = 60)
    private String serviceType;

    /** What a traveller should do when calling this number. */
    @Column(name = "action_info", length = 255)
    private String actionInfo;

    /**
     * Whether this contact is currently considered available and verified.
     * Unverified or withdrawn contacts are marked false rather than removed.
     */
    @Column(nullable = false)
    private boolean available = true;

    @Column(name = "verification_note", length = 255)
    private String verificationNote;

    public EmergencyContact() {}

    /** Backwards-compatible constructor used by existing code. */
    public EmergencyContact(String name, String phone, String description, String note) {
        this.name = name;
        this.phone = phone;
        this.description = description;
        this.verificationNote = note;
        this.available = true;
    }

    /** Full constructor for Phase 4 seeding. */
    public EmergencyContact(String name, String phone, String serviceType, String description, String actionInfo, String note, boolean available) {
        this.name = name;
        this.phone = phone;
        this.serviceType = serviceType;
        this.description = description;
        this.actionInfo = actionInfo;
        this.verificationNote = note;
        this.available = available;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getDescription() { return description; }
    public String getServiceType() { return serviceType; }
    public String getActionInfo() { return actionInfo; }
    public boolean isAvailable() { return available; }
    public String getVerificationNote() { return verificationNote; }
}
