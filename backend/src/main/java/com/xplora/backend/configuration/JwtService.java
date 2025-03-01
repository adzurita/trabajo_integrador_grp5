package com.xplora.backend.configuration;

import com.xplora.backend.entity.User;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    private static final SecretKey key = Jwts.SIG.HS256.key().build();

    public String generateToken(UserDetails userDetails) {
        User user = (User) userDetails;
        Map<String, Object> claims = Map.of(
                "role", userDetails.getAuthorities(),
                "firstname", user.getFirstname(),
                "lastname", user.getLastname()
        );

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000*60*60*24))
                .signWith(key)
                .compact();
    }
}
