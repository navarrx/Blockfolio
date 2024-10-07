package com.example.backend.Portfolio;

import com.example.backend.PortfolioCryptocurrency.PortfolioCryptocurrency;
import com.example.backend.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "portfolio")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference // Esta referencia ya está bien gestionada con User
    private User user;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    @JsonManagedReference // Indica que este es el lado "principal" de la relación
    private Set<PortfolioCryptocurrency> portfolioCryptocurrencies;
}

