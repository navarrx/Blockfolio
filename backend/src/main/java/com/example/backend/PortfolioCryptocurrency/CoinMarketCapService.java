package com.example.backend.PortfolioCryptocurrency;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;

import java.util.Map;

@Service
public class CoinMarketCapService {

    @Value("${coinmarketcap.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getTopCryptos() {
        String url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CMC_PRO_API_KEY", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from CoinMarketCap API", e);
        }
    }

    public Map<String, Object> getTopCryptoGainers() {
        String url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20&sort=percent_change_24h";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CMC_PRO_API_KEY", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from CoinMarketCap API", e);
        }
    }

    public Map<String, Object> getTopCryptoLosers() {
        String url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20&sort=percent_change_24h&sort_dir=asc";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CMC_PRO_API_KEY", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from CoinMarketCap API", e);
        }
    }
}
