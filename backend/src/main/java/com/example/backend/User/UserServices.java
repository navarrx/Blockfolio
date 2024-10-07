package com.example.backend.User;

import com.example.backend.Portfolio.Portfolio;
import com.example.backend.Portfolio.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserServices {

    @Autowired
    private PortfolioRepository portfolioRepository;

    private final UserRepository userRepository;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Guardar el usuario primero
        User savedUser = userRepository.save(user);
        System.out.println("Usuario creado: " + savedUser.getEmail());

        // Crear el portfolio y asignarlo al usuario
        Portfolio portfolio = new Portfolio();
        portfolio.setUser(savedUser);
        savedUser.setPortfolio(portfolio);

        // Guardar el portfolio
        portfolioRepository.save(portfolio);
        System.out.println("Portfolio creado para el usuario: " + savedUser.getEmail());

        return savedUser;
    }


    public User updateUser(int id, User user) {
        User userToUpdate = userRepository.findById(id).orElse(null);
        if (userToUpdate == null) {
            return null;
        }
        userToUpdate.setName(user.getName());
        userToUpdate.setEmail(user.getEmail());

        if (!user.getPassword().isEmpty() && user.getPassword() != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            userToUpdate.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.save(userToUpdate);
    }


    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public User validateUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User getMe() {
        // Obtener el usuario autenticado desde el contexto de seguridad
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // El 'email' del usuario autenticado

        // Buscar el usuario en la base de datos por su email
        return userRepository.findByEmail(email).orElse(null);
    }
}
