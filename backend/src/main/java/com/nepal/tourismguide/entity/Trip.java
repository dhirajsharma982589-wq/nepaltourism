package com.nepal.tourismguide.entity;

import com.nepal.tourismguide.model.User;
import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity @Table(name="trips")
public class Trip {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,length=180) private String name;
    private LocalDate startDate; private LocalDate endDate;
    @Column(length=100) private String budget;
    @Column(name="travel_style",length=40) private String travelStyle;
    @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="user_id",nullable=false) private User user;
    @OneToMany(mappedBy="trip",cascade=CascadeType.ALL,orphanRemoval=true) @OrderBy("dayNumber ASC, id ASC") private List<TripItem> items=new ArrayList<>();
    @Column(nullable=false,updatable=false) private Instant createdAt=Instant.now(); @Column(nullable=false) private Instant updatedAt=Instant.now();
    public Trip(){} public Trip(String name,LocalDate startDate,LocalDate endDate,String budget,String travelStyle,User user){this.name=name;this.startDate=startDate;this.endDate=endDate;this.budget=budget;this.travelStyle=travelStyle;this.user=user;}
    @PreUpdate void touch(){updatedAt=Instant.now();}
    public Long getId(){return id;} public String getName(){return name;} public void setName(String v){name=v;} public LocalDate getStartDate(){return startDate;} public void setStartDate(LocalDate v){startDate=v;} public LocalDate getEndDate(){return endDate;} public void setEndDate(LocalDate v){endDate=v;} public String getBudget(){return budget;} public void setBudget(String v){budget=v;} public String getTravelStyle(){return travelStyle;} public void setTravelStyle(String v){travelStyle=v;} public User getUser(){return user;} public List<TripItem> getItems(){return items;}
}
