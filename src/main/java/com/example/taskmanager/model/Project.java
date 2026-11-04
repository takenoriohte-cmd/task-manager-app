package com.example.taskmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long project_id;

    private String project_name;

    @Column(length = 1000)
    private String description;

    private Double progress_rate; // 進捗率など

    // --- Getter / Setter ---
    public Long getProject_id() { return project_id; }
    public void setProject_id(Long project_id) { this.project_id = project_id; }

    public String getProject_name() { return project_name; }
    public void setProject_name(String project_name) { this.project_name = project_name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getProgress_rate() { return progress_rate; }
    public void setProgress_rate(Double progress_rate) { this.progress_rate = progress_rate; }
}