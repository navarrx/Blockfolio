package com.example.backend.Cryptocurrency;

import org.springframework.data.repository.CrudRepository;

public interface CryptocurrencyRepository extends CrudRepository<Cryptocurrency, Integer>{
    Cryptocurrency findBySymbol(String cryptoSymbol);
}
