package com.xplora.backend.service;

import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.entity.User;

import java.util.List;

public interface IUserService {
    User findByIdUser(Long id);
    List<User> findAllUsers();
    User changeRoleUser(Long id, UserRoleRequestDto request) throws Exception;
}
