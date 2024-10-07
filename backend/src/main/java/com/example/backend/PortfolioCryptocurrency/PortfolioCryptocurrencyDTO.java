package com.example.backend.PortfolioCryptocurrency;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PortfolioCryptocurrencyDTO {
    private String symbol;
    private String logoURL;
    private double quantity;
    private double currentPrice;
    private double totalValue;

}
