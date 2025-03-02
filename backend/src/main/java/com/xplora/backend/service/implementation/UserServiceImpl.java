package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.User;
import com.xplora.backend.repository.IUserRepository;
import com.xplora.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private IUserRepository iUserRepository;

    @Autowired
    public UserServiceImpl(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    @Override
    public List<User> findAllUsers() {
        List<User> users = iUserRepository.findAll();
        if (users.isEmpty()) {
            System.out.println("No se encontraron usuarios.");
        } else {
            System.out.println(users.size() + " usuario(s) encontrado(s)."); // TODO: "logger"
        }
        return users;
    }
}
