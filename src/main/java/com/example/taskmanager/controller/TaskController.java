package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }
    // タスクの更新 (PUT: 完了状態の切り替えなど)
@PutMapping("/{id}")
public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
    Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    task.setTitle(taskDetails.getTitle());
    task.setCompleted(taskDetails.isCompleted());
    return taskRepository.save(task);
}

// タスクの削除 (DELETE)
@DeleteMapping("/{id}")
public void deleteTask(@PathVariable Long id) {
    taskRepository.deleteById(id);
}
}