package com.nepal.tourismguide.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "transportation")
public class Transportation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, length = 120) private String type;
    @Column(nullable = false, unique = true, length = 180) private String name;
    @Column(length = 240) private String route;
    @Column(columnDefinition = "TEXT") private String description;
    @Column(name = "important_information", columnDefinition = "TEXT") private String importantInformation;
    @Column(length = 700) private String contactWebsite;
    @Column(length = 240) private String location;
    @Column(nullable = false) private boolean developmentData;

    protected Transportation() {}
    public Transportation(String type, String name, String route, String description, String importantInformation, String contactWebsite, String location, boolean developmentData) {
        this.type = type; this.name = name; this.route = route; this.description = description;
        this.importantInformation = importantInformation; this.contactWebsite = contactWebsite; this.location = location;
        this.developmentData = developmentData;
    }
    public Long getId() { return id; }
    public String getType() { return type; }
    public String getName() { return name; }
    public String getRoute() { return route; }
    public String getDescription() { return description; }
    public String getImportantInformation() { return importantInformation; }
    public String getContactWebsite() { return contactWebsite; }
    public String getLocation() { return location; }
    public boolean isDevelopmentData() { return developmentData; }
}
