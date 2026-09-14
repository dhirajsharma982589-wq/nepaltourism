package com.nepal.tourismguide.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "destination_images")
public class DestinationImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "destination_id", nullable = false) private Destination destination;
    @Column(name = "image_url", nullable = false, length = 700) private String imageUrl;
    @Column(name = "is_primary", nullable = false) private boolean primaryImage;
    @Column(name = "sort_order", nullable = false) private int sortOrder;
    public DestinationImage() {}
    public DestinationImage(Destination destination, String imageUrl, boolean primaryImage, int sortOrder) { this.destination=destination; this.imageUrl=imageUrl; this.primaryImage=primaryImage; this.sortOrder=sortOrder; }
    public Long getId(){return id;} public String getImageUrl(){return imageUrl;} public boolean isPrimaryImage(){return primaryImage;} public int getSortOrder(){return sortOrder;}
}
