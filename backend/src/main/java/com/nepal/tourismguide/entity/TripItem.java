package com.nepal.tourismguide.entity;
import jakarta.persistence.*;
@Entity @Table(name="trip_items")
public class TripItem {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="trip_id",nullable=false) private Trip trip;
 @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="destination_id",nullable=false) private Destination destination;
 @Column(nullable=false) private int dayNumber;
 @Column(length=500) private String notes;
 @Column(length=700) private String activities;
 public TripItem(){} public TripItem(Trip trip,Destination destination,int dayNumber,String notes,String activities){this.trip=trip;this.destination=destination;this.dayNumber=dayNumber;this.notes=notes;this.activities=activities;}
 public Long getId(){return id;} public Trip getTrip(){return trip;} public Destination getDestination(){return destination;} public int getDayNumber(){return dayNumber;} public void setDayNumber(int v){dayNumber=v;} public String getNotes(){return notes;} public void setNotes(String v){notes=v;} public String getActivities(){return activities;} public void setActivities(String v){activities=v;}
}
