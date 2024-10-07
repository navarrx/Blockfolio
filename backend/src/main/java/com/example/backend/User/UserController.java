package com.example.backend.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserServices userServices;

    @Autowired
    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping(value="/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userServices.getUserByEmail(user.getEmail()) != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User already exists");
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }
        User newUser = userServices.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping(value="/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = (List<User>) userServices.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        User user = userServices.getUserById(id);
        if (user == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(
            @RequestParam Integer userId,
            @RequestBody User user) {
        User updatedUser = userServices.updateUser(userId, user);
        if (updatedUser == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        userServices.deleteUser(user.getId());
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        User user = userServices.getMe();
        if (user == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}