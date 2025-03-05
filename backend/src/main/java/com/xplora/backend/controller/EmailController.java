package com.xplora.backend.controller;

import com.xplora.backend.entity.User;
import com.xplora.backend.service.IEmailService;
import com.xplora.backend.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/send-email")
public class EmailController {

    private IEmailService emailService;
    private IUserService iUserService;

    @Autowired
    public EmailController(IEmailService emailService, IUserService iUserService) {
        this.emailService = emailService;
        this.iUserService = iUserService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/welcome")
    private ResponseEntity<String> sendEmailWelcome(@RequestHeader("Authorization") String authHeader) {
        try {
            User user = iUserService.findByTokenUser(authHeader.substring(7));
            emailService.sendMailWelcome(user);
            return ResponseEntity
                    .ok("Correo enviado exitosamente.");
        } catch (Exception ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }
}
