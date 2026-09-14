package com.nepal.tourismguide.entity;
import jakarta.persistence.*;
@Entity @Table(name="emergency_contacts")
public class EmergencyContact {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=150) private String name;
 @Column(nullable=false,length=60) private String phone;
 @Column(length=255) private String description;
 @Column(name="verification_note",length=255) private String verificationNote;
 public EmergencyContact(){} public EmergencyContact(String name,String phone,String description,String note){this.name=name;this.phone=phone;this.description=description;this.verificationNote=note;}
 public Long getId(){return id;} public String getName(){return name;} public String getPhone(){return phone;} public String getDescription(){return description;} public String getVerificationNote(){return verificationNote;}
}
