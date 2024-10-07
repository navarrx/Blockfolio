package com.example.backend.PortfolioCryptocurrency;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NewsDTO {
    private String id;
    private String guid;
    private Long published_on;
    private String imageurl;
    private String title;
    private String url;
    private String body;
    private String tags;
    private String lang;
    private String upvotes;
    private String downvotes;
    private String categories;
    private SourceInfo source_info;
    private String source;

    @Setter
    @Getter
    public static class SourceInfo {
        private String name;
        private String img;
        private String lang;
    }
}
