package com.xplora.backend.service;

import com.xplora.backend.entity.User;
import jakarta.mail.MessagingException;

public interface IEmailService {
    void sendMailWelcome(User user) throws MessagingException;
}
