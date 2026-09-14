package com.nepal.tourismguide.entity;
import com.nepal.tourismguide.model.User;
import jakarta.persistence.*;
import java.time.Instant;
@Entity @Table(name="reviews",uniqueConstraints=@UniqueConstraint(name="uk_review_user_destination",columnNames={"user_id","destination_id"}))
public class ReviewEntity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private int rating;
 @Column(nullable=false,length=2000) private String comment;
 @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="user_id",nullable=false) private User user;
 @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="destination_id",nullable=false) private Destination destination;
 @Column(nullable=false,updatable=false) private Instant createdAt=Instant.now(); @Column(nullable=false) private Instant updatedAt=Instant.now();
 public ReviewEntity(){} public ReviewEntity(int rating,String comment,User user,Destination destination){this.rating=rating;this.comment=comment;this.user=user;this.destination=destination;}
 @PreUpdate void touch(){updatedAt=Instant.now();}
 public Long getId(){return id;} public int getRating(){return rating;} public void setRating(int v){rating=v;} public String getComment(){return comment;} public void setComment(String v){comment=v;} public User getUser(){return user;} public Destination getDestination(){return destination;} public Instant getCreatedAt(){return createdAt;} public Instant getUpdatedAt(){return updatedAt;}
}
