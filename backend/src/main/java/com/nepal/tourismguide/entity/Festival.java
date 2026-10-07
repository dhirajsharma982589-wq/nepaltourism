package com.nepal.tourismguide.entity;

import jakarta.persistence.*;

@Entity @Table(name="festivals")
public class Festival {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,unique=true,length=120) private String name;
    @Column(nullable=false,columnDefinition="TEXT") private String description;
    @Column(name="cultural_significance",columnDefinition="TEXT") private String culturalSignificance;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="region_id") private Region region;
    @Column(length=120) private String season;
    @Column(name="date_information", length=180) private String dateInformation;
    @Column(name="image_url",length=700) private String imageUrl;
    public Festival() {}
    public Festival(String name,String description,String significance,Region region,String season,String imageUrl){this.name=name;this.description=description;this.culturalSignificance=significance;this.region=region;this.season=season;this.imageUrl=imageUrl;}
    public Festival(String name,String description,String significance,Region region,String season,String dateInformation,String imageUrl){this(name,description,significance,region,season,imageUrl);this.dateInformation=dateInformation;}
    public Long getId(){return id;} public String getName(){return name;} public String getDescription(){return description;} public String getCulturalSignificance(){return culturalSignificance;} public Region getRegion(){return region;} public String getSeason(){return season;} public String getDateInformation(){return dateInformation;} public String getImageUrl(){return imageUrl;}
}
