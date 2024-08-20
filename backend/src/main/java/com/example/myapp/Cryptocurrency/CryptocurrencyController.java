package com.example.myapp.Cryptocurrency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cryptocurrencies")
public class CryptocurrencyController {

    private final CryptocurrencyServices cryptocurrencyServices;
    private final CryptocurrencyRepository cryptocurrencyRepository;

    @Autowired
    public CryptocurrencyController(CryptocurrencyServices cryptocurrencyServices, CryptocurrencyRepository cryptocurrencyRepository) {
        this.cryptocurrencyServices = cryptocurrencyServices;
        this.cryptocurrencyRepository = cryptocurrencyRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cryptocurrency>> getAllCryptocurrencies() {
        List<Cryptocurrency> cryptocurrencies = (List<Cryptocurrency>) cryptocurrencyServices.getAllCryptocurrencies();
        return new ResponseEntity<>(cryptocurrencies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCryptocurrencyById(@PathVariable int id) {
        if (cryptocurrencyRepository.findById(id).orElse(null) == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cryptocurrency not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        Cryptocurrency cryptocurrency = cryptocurrencyRepository.findById(id).get();
        return new ResponseEntity<>(cryptocurrency, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Cryptocurrency> createCryptocurrency(@RequestBody Cryptocurrency cryptocurrency) {
        Cryptocurrency createdCryptocurrency = cryptocurrencyRepository.save(cryptocurrency);
        return new ResponseEntity<>(createdCryptocurrency, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCryptocurrency(@RequestBody Cryptocurrency cryptocurrency) {
        if (cryptocurrencyRepository.findById(cryptocurrency.getId()).orElse(null) == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cryptocurrency not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        Cryptocurrency updatedCryptocurrency = cryptocurrencyRepository.save(cryptocurrency);
        return new ResponseEntity<>(updatedCryptocurrency, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCryptocurrency(@RequestBody Cryptocurrency cryptocurrency) {
        if (cryptocurrencyRepository.findById(cryptocurrency.getId()).orElse(null) == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cryptocurrency not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        cryptocurrencyRepository.delete(cryptocurrency);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cryptocurrency deleted");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/topCryptos")
    public List<CryptocurrencyDTO> getTopCryptos() {
        return cryptocurrencyServices.getTopCryptosWithPrices();
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<?> deleteAllCryptocurrencies() {
        cryptocurrencyRepository.deleteAll();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cryptocurrencies deleted");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
