package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // タスク一覧取得API (GET /api/tasks) - キーワードやステータス等の検索条件に対応（任意）
    @GetMapping
    public List<Task> getAllTasks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Long project_id,
            @RequestParam(required = false) String keyword) {
        
        // 現時点では全件返却を基本としつつ、必要に応じて拡張できるベースとなります
        return taskRepository.findAll();
    }

    // タスク詳細取得API (GET /api/tasks/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // タスク登録API (POST /api/tasks)
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.status(201).body(savedTask); // 登録成功時は201を返す仕様
    }

    // タスク更新API (PUT /api/tasks/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setTitle(taskDetails.getTitle());
            existingTask.setDescription(taskDetails.getDescription());
            existingTask.setStatus(taskDetails.getStatus());
            existingTask.setPriority(taskDetails.getPriority());
            existingTask.setDue_date(taskDetails.getDue_date());
            existingTask.setAssigned_to(taskDetails.getAssigned_to());
            existingTask.setProject_id(taskDetails.getProject_id());
            
            Task updatedTask = taskRepository.save(existingTask);
            return ResponseEntity.ok(updatedTask); // 200 OK
        }).orElse(ResponseEntity.notFound().build()); // 対象データなしは404
    }

    // タスク削除API (DELETE /api/tasks/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (!taskRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // 404
        }
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}