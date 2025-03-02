package com.xplora.backend.service;

import com.xplora.backend.entity.User;

import java.util.List;

public interface IUserService {
    List<User> findAllUsers();
}
