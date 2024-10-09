package com.example.backend.Portfolio;

import com.example.backend.PortfolioCryptocurrency.PortfolioCryptocurrency;
import com.example.backend.PortfolioCryptocurrency.PortfolioCryptocurrencyDTO;
import com.example.backend.PortfolioCryptocurrency.PortfolioCryptocurrencyServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/portfolios")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @Autowired
    private PortfolioCryptocurrencyServices portfolioCryptocurrencyServices;

    @PostMapping("/add")
    public ResponseEntity<?> addCryptocurrencyToPortfolio(
            @RequestParam Integer userId,
            @RequestParam String symbol,
            @RequestParam Double quantity) {

        Portfolio portfolio = portfolioService.getPortfolioByUserId(userId);

        PortfolioCryptocurrency portfolioCryptocurrency = portfolioCryptocurrencyServices.createOrUpdatePortfolioCryptocurrency(portfolio, symbol, quantity);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Cryptocurrency added/updated successfully");
        response.put("portfolioCryptocurrency", portfolioCryptocurrency);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeCryptocurrencyFromPortfolio(
            @RequestParam Integer userId,
            @RequestParam String symbol) {

        Portfolio portfolio = portfolioService.getPortfolioByUserId(userId);

        portfolioCryptocurrencyServices.removePortfolioCryptocurrency(portfolio, symbol);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Cryptocurrency removed successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCryptocurrencyInPortfolio(
            @RequestParam Integer userId,
            @RequestParam String symbol,
            @RequestParam Double quantity) {

        Portfolio portfolio = portfolioService.getPortfolioByUserId(userId);

        portfolioCryptocurrencyServices.updatePortfolioCryptocurrency(portfolio, symbol, quantity);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Cryptocurrency updated successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getPortfolio")
    public ResponseEntity<?> getPortfolio(
            @RequestParam Integer userId) {

        Portfolio portfolio = portfolioService.getPortfolioByUserId(userId);
        if (portfolio == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Portfolio not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(portfolio, HttpStatus.OK);
    }

    @GetMapping("/getTotalValue")
    public ResponseEntity<?> getTotalPortfolioValue(
            @RequestParam Integer userId) {

        Double totalValue = portfolioService.updateTotalPortfolioValue(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("totalValue", totalValue);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getEachCryptoValue")
    public ResponseEntity<?> getEachCryptoValue(
            @RequestParam Integer userId) {

        List<PortfolioCryptocurrencyDTO> updatedCryptos = portfolioService.updateEachCrypto(userId);

        return new ResponseEntity<>(updatedCryptos, HttpStatus.OK);
    }
}