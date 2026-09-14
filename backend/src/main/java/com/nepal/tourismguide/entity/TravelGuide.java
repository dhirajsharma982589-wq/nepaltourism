package com.nepal.tourismguide.entity;
import jakarta.persistence.*;
@Entity @Table(name="travel_guides")
public class TravelGuide {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String section;
 @Column(nullable=false,length=180) private String title;
 @Column(nullable=false,columnDefinition="TEXT") private String content;
 @Column(name="verification_note",length=255) private String verificationNote;
 public TravelGuide(){} public TravelGuide(String section,String title,String content,String note){this.section=section;this.title=title;this.content=content;this.verificationNote=note;}
 public Long getId(){return id;} public String getSection(){return section;} public String getTitle(){return title;} public String getContent(){return content;} public String getVerificationNote(){return verificationNote;}
}
