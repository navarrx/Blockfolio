package com.example.backend.Portfolio;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddCryptoRequest {
    private String symbol;
    private double quantity;
}
