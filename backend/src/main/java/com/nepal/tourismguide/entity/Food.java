package com.nepal.tourismguide.entity;

import jakarta.persistence.*;

@Entity @Table(name="foods")
public class Food {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,unique=true,length=120) private String name;
    @Column(nullable=false,columnDefinition="TEXT") private String description;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="region_id") private Region region;
    @Column(name="image_url",length=700) private String imageUrl;
    @Column(nullable=false) private boolean vegetarian;
    public Food() {}
    public Food(String name,String description,Region region,String imageUrl,boolean vegetarian){this.name=name;this.description=description;this.region=region;this.imageUrl=imageUrl;this.vegetarian=vegetarian;}
    public Long getId(){return id;} public String getName(){return name;} public String getDescription(){return description;} public Region getRegion(){return region;} public String getImageUrl(){return imageUrl;} public boolean isVegetarian(){return vegetarian;}
}
