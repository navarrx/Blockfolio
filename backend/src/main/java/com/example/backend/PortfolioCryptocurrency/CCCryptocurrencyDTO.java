package com.example.backend.PortfolioCryptocurrency;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CCCryptocurrencyDTO {

    @JsonProperty("NAME")
    private String name;

    @JsonProperty("SYMBOL")
    private String symbol;

    @JsonProperty("LOGO_URL")
    private String logoURL;

    @JsonProperty("ASSET_DESCRIPTION_SNIPPET")
    private String description;

    @JsonProperty("WEBSITE_URL")
    private String websiteURL;

    @JsonProperty("SUPPLY_MAX")
    private double supplyMax;

    @JsonProperty("SUPPLY_TOTAL")
    private double supplyTotal;

    @JsonProperty("PRICE_USD")
    private double price;

    @JsonProperty("TOTAL_MKT_CAP_USD")
    private double marketCap;
}
