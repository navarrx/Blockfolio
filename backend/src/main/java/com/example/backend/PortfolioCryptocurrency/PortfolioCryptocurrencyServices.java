package com.example.backend.PortfolioCryptocurrency;

import com.example.backend.Portfolio.Portfolio;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PortfolioCryptocurrencyServices {

    @Autowired
    private CoinMarketCapService coinMarketCapService;

    @Autowired
    private PortfolioCryptocurrencyRepository portfolioCryptocurrencyRepository;

    @Autowired
    private CryptocompareService cryptocompareService;

    public PortfolioCryptocurrency createOrUpdatePortfolioCryptocurrency(Portfolio portfolio, String symbol, Double quantity) {
        Optional<PortfolioCryptocurrency> existingCrypto = portfolioCryptocurrencyRepository.findByPortfolioAndSymbol(portfolio, symbol);

        if (existingCrypto.isPresent()) {
            PortfolioCryptocurrency portfolioCryptocurrency = existingCrypto.get();
            portfolioCryptocurrency.setQuantity(portfolioCryptocurrency.getQuantity() + quantity);
            return portfolioCryptocurrencyRepository.save(portfolioCryptocurrency);
        } else {
            PortfolioCryptocurrency newCrypto = new PortfolioCryptocurrency();
            newCrypto.setPortfolio(portfolio);
            newCrypto.setSymbol(symbol);
            newCrypto.setQuantity(quantity);
            return portfolioCryptocurrencyRepository.save(newCrypto);
        }
    }

    public void removePortfolioCryptocurrency(Portfolio portfolio, String symbol) {
        Optional<PortfolioCryptocurrency> existingCrypto = portfolioCryptocurrencyRepository.findByPortfolioAndSymbol(portfolio, symbol);

        if (existingCrypto.isPresent()) {
            portfolioCryptocurrencyRepository.delete(existingCrypto.get());
        }
    }

    public void updatePortfolioCryptocurrency(Portfolio portfolio, String symbol, Double quantity) {
        Optional<PortfolioCryptocurrency> existingCrypto = portfolioCryptocurrencyRepository.findByPortfolioAndSymbol(portfolio, symbol);

        if (existingCrypto.isPresent()) {
            PortfolioCryptocurrency portfolioCryptocurrency = existingCrypto.get();
            portfolioCryptocurrency.setQuantity(quantity);
            portfolioCryptocurrencyRepository.save(portfolioCryptocurrency);
        }
    }

    public Double getCryptocurrencyValue(String symbol) {
        CCCryptocurrencyDTO cryptoData = getDataBySymbol(symbol);

        if (cryptoData == null) {
            return null;
        } else {
            return cryptoData.getPrice();
        }
    }

    public PortfolioCryptocurrency getPortfolioCryptocurrency(Portfolio portfolio, String symbol) {
        return portfolioCryptocurrencyRepository.findByPortfolioAndSymbol(portfolio, symbol).orElse(null);
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

    public List<CryptocurrencyDTO> getTopCryptoGainersWithPrices() {
        Map<String, Object> topCryptos = coinMarketCapService.getTopCryptoGainers();
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

    public List<CryptocurrencyDTO> getTopCryptoLosersWithPrices() {
        Map<String, Object> topCryptos = coinMarketCapService.getTopCryptoLosers();
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

    public List<NewsDTO> getNews() {
        String data = cryptocompareService.getNews();
        ObjectMapper mapper = new ObjectMapper();
        List<NewsDTO> newsList = new ArrayList<>();

        try {
            System.out.println(data); // Imprimir el JSON recibido
            JsonNode rootNode = mapper.readTree(data);
            JsonNode dataNode = rootNode.path("Data");

            // Verificar que el nodo no esté vacío
            if (dataNode.isArray() && dataNode.size() > 0) {
                for (JsonNode newsNode : dataNode) {
                    NewsDTO newsDTO = mapper.convertValue(newsNode, NewsDTO.class);
                    newsList.add(newsDTO);
                }
            } else {
                System.out.println("No news data found in the response.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return newsList;
    }

    public CCCryptocurrencyDTO getDataBySymbol(String symbol) {
        String data = cryptocompareService.getDataByCrypto(symbol);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = null;

        try {
            rootNode = mapper.readTree(data);
        } catch (Exception e) {
            e.printStackTrace();
        }

        JsonNode dataNode = rootNode.path("Data");

        return mapper.convertValue(dataNode, CCCryptocurrencyDTO.class);
    }
}
