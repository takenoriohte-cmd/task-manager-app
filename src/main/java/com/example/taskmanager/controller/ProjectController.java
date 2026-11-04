package com.example.taskmanager.controller;

import com.example.taskmanager.model.Project;
import com.example.taskmanager.repository.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // プロジェクト一覧取得API (GET /api/projects)
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // プロジェクト登録API (POST /api/projects)
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }
}