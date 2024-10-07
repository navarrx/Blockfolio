package com.example.backend.PortfolioCryptocurrency;

import com.example.backend.Portfolio.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioCryptocurrencyRepository extends JpaRepository<PortfolioCryptocurrency, Integer> {
    Optional<PortfolioCryptocurrency> findByPortfolioAndSymbol(Portfolio portfolio, String symbol);
}
