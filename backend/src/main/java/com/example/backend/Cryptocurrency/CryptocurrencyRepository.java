package com.example.myapp.Cryptocurrency;

import org.springframework.data.repository.CrudRepository;
import com.example.myapp.Cryptocurrency.Cryptocurrency;
public interface CryptocurrencyRepository extends CrudRepository<Cryptocurrency, Integer>{
    Cryptocurrency findBySymbol(String cryptoSymbol);
}
