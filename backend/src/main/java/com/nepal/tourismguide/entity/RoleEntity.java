package com.nepal.tourismguide.entity;

import jakarta.persistence.*;
@Entity @Table(name="roles")
public class RoleEntity {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,unique=true,length=40) private String name;
    public RoleEntity() {} public RoleEntity(String name){this.name=name;} public Long getId(){return id;} public String getName(){return name;}
}
