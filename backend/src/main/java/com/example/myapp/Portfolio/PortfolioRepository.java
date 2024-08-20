package com.example.myapp.Portfolio;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Integer> {
    List<Portfolio> findByUserId(Integer userId);
    List<Portfolio> findByCryptocurrencies_Id(Integer cryptocurrencyId); // Cambiado para trabajar con la relación correcta
}
