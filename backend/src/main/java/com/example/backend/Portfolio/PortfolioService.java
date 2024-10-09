package com.example.backend.Portfolio;

import com.example.backend.PortfolioCryptocurrency.CCCryptocurrencyDTO;
import com.example.backend.PortfolioCryptocurrency.PortfolioCryptocurrency;
import com.example.backend.PortfolioCryptocurrency.PortfolioCryptocurrencyDTO;
import com.example.backend.PortfolioCryptocurrency.PortfolioCryptocurrencyServices;
import com.example.backend.User.User;
import com.example.backend.User.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private UserServices userServices;

    @Autowired
    private PortfolioCryptocurrencyServices portfolioCryptocurrencyServices;

    public Portfolio getPortfolioByUserId(Integer userId) {
        List<Portfolio> portfolios = portfolioRepository.findByUserId(userId);
        if (portfolios.isEmpty()) {
            return createNewPortfolioForUser(userId);
        }
        return portfolios.get(0);
    }

    public Portfolio createNewPortfolioForUser(Integer userId) {
        Optional<User> userOptional = Optional.ofNullable(userServices.getUserById(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Portfolio portfolio = new Portfolio();
            portfolio.setUser(user);
            portfolio.setPortfolioCryptocurrencies(Set.of());
            return portfolioRepository.save(portfolio);
        }
        throw new RuntimeException("Usuario no encontrado con ID: " + userId);
    }

    public Double updateTotalPortfolioValue(Integer userId) {
        Portfolio portfolio = getPortfolioByUserId(userId);
        Set<PortfolioCryptocurrency> cryptocurrencies = portfolio.getPortfolioCryptocurrencies();

        Double totalValue = 0.0;
        for (PortfolioCryptocurrency cryptocurrency : cryptocurrencies) {
            Double value = portfolioCryptocurrencyServices.getCryptocurrencyValue(cryptocurrency.getSymbol());
            totalValue += value * cryptocurrency.getQuantity();
        }

        return totalValue;
    }

    public List<PortfolioCryptocurrencyDTO> updateEachCrypto(Integer userId) {
        Portfolio portfolio = getPortfolioByUserId(userId);
        Set<PortfolioCryptocurrency> cryptocurrencies = portfolio.getPortfolioCryptocurrencies();

        List<PortfolioCryptocurrencyDTO> updatedCryptos = new ArrayList<>();

        for (PortfolioCryptocurrency portfolioCryptocurrency : cryptocurrencies) {
            String symbol = portfolioCryptocurrency.getSymbol();

            CCCryptocurrencyDTO cryptoData = portfolioCryptocurrencyServices.getDataBySymbol(symbol);

            if (cryptoData != null) {
                PortfolioCryptocurrencyDTO updatedCrypto = new PortfolioCryptocurrencyDTO();
                updatedCrypto.setSymbol(symbol);
                updatedCrypto.setLogoURL(cryptoData.getLogoURL());
                updatedCrypto.setQuantity(portfolioCryptocurrency.getQuantity());
                updatedCrypto.setCurrentPrice(cryptoData.getPrice());
                updatedCrypto.setTotalValue(cryptoData.getPrice() * portfolioCryptocurrency.getQuantity());

                updatedCryptos.add(updatedCrypto);
            }
        }
        return updatedCryptos;
    }
}