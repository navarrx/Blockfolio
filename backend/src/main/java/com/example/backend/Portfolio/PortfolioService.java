package com.example.backend.Portfolio;

import com.example.backend.Cryptocurrency.Cryptocurrency;
import com.example.backend.Cryptocurrency.CryptocurrencyRepository;
import com.example.backend.User.User;
import com.example.backend.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private CryptocurrencyRepository cryptocurrencyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    public Optional<Portfolio> getPortfolioById(Integer id) {
        return portfolioRepository.findById(id);
    }

    public List<Portfolio> getPortfoliosByUserId(Integer userId) {
        return portfolioRepository.findByUserId(userId);
    }

    public List<Portfolio> getPortfoliosByCryptocurrencyId(Integer cryptocurrencyId) {
        return portfolioRepository.findByCryptocurrencies_Id(cryptocurrencyId); // Ajustado para llamar al método correcto
    }

    public Portfolio createPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public Portfolio updatePortfolio(Integer id, Portfolio portfolioDetails) {
        Optional<Portfolio> portfolioOptional = portfolioRepository.findById(id);
        if (portfolioOptional.isPresent()) {
            Portfolio portfolio = portfolioOptional.get();
            portfolio.setUser(portfolioDetails.getUser());
            portfolio.setCryptocurrencies(portfolioDetails.getCryptocurrencies());
            portfolio.setQuantity(portfolioDetails.getQuantity());
            return portfolioRepository.save(portfolio);
        }
        return null; // O lanzar una excepción
    }

    public void deletePortfolio(Integer id) {
        portfolioRepository.deleteById(id);
    }

    public Portfolio addCryptocurrencyToPortfolio(Integer userId, String cryptoSymbol, double quantity){
        User user = userRepository.findById(userId).orElse(null);
        Cryptocurrency cryptocurrency = cryptocurrencyRepository.findBySymbol(cryptoSymbol);
        if (user == null || cryptocurrency == null) {
            return null;
        }
        Portfolio portfolio = portfolioRepository.findByUserId(userId).get(0);
        portfolio.addCryptocurrency(cryptocurrency, quantity);
        return portfolioRepository.save(portfolio);
    }
}
