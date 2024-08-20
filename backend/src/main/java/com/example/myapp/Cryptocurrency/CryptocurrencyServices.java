package com.example.myapp.Cryptocurrency;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CryptocurrencyServices {

    @Autowired
    private CoinMarketCapService coinMarketCapService;

    @Autowired
    private final CryptocurrencyRepository cryptocurrencyRepository;

    public CryptocurrencyServices(CryptocurrencyRepository cryptocurrencyRepository) {
        this.cryptocurrencyRepository = cryptocurrencyRepository;
    }

    public Iterable<Cryptocurrency> getAllCryptocurrencies() {
        return cryptocurrencyRepository.findAll();
    }

    public Cryptocurrency getCryptocurrencyById(int id) {
        return cryptocurrencyRepository.findById(id).orElse(null);
    }

    public Cryptocurrency addCryptocurrency(Cryptocurrency cryptocurrency) {
        return cryptocurrencyRepository.save(cryptocurrency);
    }

    public List<CryptocurrencyDTO> getTopCryptosWithPrices() {
        Map<String, Object> topCryptos = coinMarketCapService.getTopCryptos();
        List<Map<String, Object>> cryptoData = (List<Map<String, Object>>) topCryptos.get("data");
        List<CryptocurrencyDTO> result = new ArrayList<>();

        for (Map<String, Object> crypto : cryptoData){
            CryptocurrencyDTO cryptoInfo = new CryptocurrencyDTO();
            cryptoInfo.setName((String) crypto.get("name"));
            cryptoInfo.setSymbol((String) crypto.get("symbol"));
            cryptoInfo.setPrice((Double) ((Map<String, Object>) ((Map<String, Object>) crypto.get("quote")).get("USD")).get("price"));
            cryptoInfo.setPercentChange(String.valueOf((Double) ((Map<String, Object>) ((Map<String, Object>) crypto.get("quote")).get("USD")).get("percent_change_24h")));

            String id = String.valueOf(crypto.get("id"));
            String logoURL = "https://s2.coinmarketcap.com/static/img/coins/64x64/" + id + ".png";
            cryptoInfo.setLogoURL(logoURL);

            result.add(cryptoInfo);
        }

        return result;
    }

    public void deleteCryptocurrency(int id) {
        cryptocurrencyRepository.deleteById(id);
    }

    public void deleteAllCryptocurrencies() {
        cryptocurrencyRepository.deleteAll();
    }
}
