package com.xplora.backend.controller;

import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.entity.User;
import com.xplora.backend.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .ok(userService.findByIdUser(id));
        } catch (Exception ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity
                .ok(userService.findAllUsers());
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("{id}/role")
    public ResponseEntity<?> changeRole(@PathVariable Long id, @RequestBody UserRoleRequestDto role) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(userService.changeRoleUser(id, role));
        } catch (Exception ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }
}
