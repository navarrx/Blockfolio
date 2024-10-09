package com.example.backend.PortfolioCryptocurrency;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CryptocompareService {

    @Value("${cryptocompare.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getDataByCrypto(String crypto) {
        String url = "https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=" + crypto + "&api_key=" + apiKey;
        return restTemplate.getForObject(url, String.class);
    }

    public String getNews() {
        String url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=" + apiKey;
        return restTemplate.getForObject(url, String.class);
    }
}
