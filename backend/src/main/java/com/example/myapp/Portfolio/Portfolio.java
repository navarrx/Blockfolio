package com.example.myapp.Portfolio;

import com.example.myapp.User.User;
import com.example.myapp.Cryptocurrency.Cryptocurrency;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "portfolio")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "portfolio_cryptocurrency",
            joinColumns = @JoinColumn(name = "portfolio_id"),
            inverseJoinColumns = @JoinColumn(name = "cryptocurrency_id")
    )
    private Set<Cryptocurrency> cryptocurrencies;

    private Double quantity;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Cryptocurrency> getCryptocurrencies() {
        return cryptocurrencies;
    }

    public void setCryptocurrencies(Set<Cryptocurrency> cryptocurrencies) {
        this.cryptocurrencies = cryptocurrencies;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public void addCryptocurrency(Cryptocurrency cryptocurrency, double quantity) {
    }
}
