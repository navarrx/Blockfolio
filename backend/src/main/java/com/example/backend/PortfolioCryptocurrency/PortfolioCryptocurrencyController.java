package com.example.backend.PortfolioCryptocurrency;

import com.example.backend.Portfolio.Portfolio;
import com.example.backend.Portfolio.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cryptocurrencies")
public class PortfolioCryptocurrencyController {

    @Autowired
    private final PortfolioCryptocurrencyServices portfolioCryptocurrencyServices;

    @Autowired
    public PortfolioCryptocurrencyController(PortfolioCryptocurrencyServices portfolioCryptocurrencyServices) {
        this.portfolioCryptocurrencyServices = portfolioCryptocurrencyServices;
    }

    @GetMapping("/topCryptos")
    public List<CryptocurrencyDTO> getTopCryptos() {
        return portfolioCryptocurrencyServices.getTopCryptosWithPrices();
    }

    @GetMapping("/topCryptosGainers")
    public List<CryptocurrencyDTO> getTopCryptosGainers() {
        return portfolioCryptocurrencyServices.getTopCryptoGainersWithPrices();
    }

    @GetMapping("/topCryptosLosers")
    public List<CryptocurrencyDTO> getTopCryptosLosers() {
        return portfolioCryptocurrencyServices.getTopCryptoLosersWithPrices();
    }

    @GetMapping("/getNews")
    public List<NewsDTO> getNews() {
        return portfolioCryptocurrencyServices.getNews();
    }

    @GetMapping("/getDataByCrypto")
    public ResponseEntity<?> getDataBySymbol(
            @RequestParam String symbol) {

        CCCryptocurrencyDTO cccryptocurrencyDTO = portfolioCryptocurrencyServices.getDataBySymbol(symbol);
        if (cccryptocurrencyDTO == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cryptocurrency not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cccryptocurrencyDTO, HttpStatus.OK);
    }
}
