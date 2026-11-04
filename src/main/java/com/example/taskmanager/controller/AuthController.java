package com.example.taskmanager.controller;

import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ユーザー登録API (POST /api/auth/register)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body("メールアドレスが既に重複しています");
        }
        User savedUser = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "登録成功");
        response.put("token", "dummy-jwt-token-sample");
        response.put("user_id", savedUser.getUser_id());
        response.put("name", savedUser.getName());
        response.put("email", savedUser.getEmail());

        return ResponseEntity.status(201).body(response); // 201 Created
    }

    // ログインAPI (POST /api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());
        if (optionalUser.isEmpty() || !optionalUser.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("認証失敗（メールアドレスまたはパスワードが不正です）");
        }

        User user = optionalUser.get();
        Map<String, Object> response = new HashMap<>();
        response.put("token", "dummy-jwt-token-sample");
        response.put("user_id", user.getUser_id());
        response.put("name", user.getName());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response); // 200 OK
    }

    // ログインユーザー取得API (GET /api/auth/me)
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam(required = false) Long user_id) {
        // 簡易的にID指定またはデフォルトユーザーを返す形
        if (user_id == null) {
            return ResponseEntity.status(401).body("未認証です");
        }
        return userRepository.findById(user_id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body(null));
    }
}