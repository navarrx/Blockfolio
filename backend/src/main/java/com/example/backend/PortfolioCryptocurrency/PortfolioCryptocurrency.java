package com.example.backend.PortfolioCryptocurrency;

import com.example.backend.Portfolio.Portfolio;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "portfolio_cryptocurrency")
public class PortfolioCryptocurrency {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonBackReference
    private Portfolio portfolio;
    private String symbol;
    private Double quantity;

    public void setCurrentPrice(double price) {
    }

    public void setTotalValue(double v) {
    }
}