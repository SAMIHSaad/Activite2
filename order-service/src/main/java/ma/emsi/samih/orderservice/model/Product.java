package ma.emsi.samih.orderservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Product {
    private String name;
    private double price;
    private int quantity;

    @JsonProperty("_links")
    private Links _links;

    public String getId() {
        if (_links != null && _links.getSelf() != null) {
            String href = _links.getSelf().getHref();
            return href.substring(href.lastIndexOf('/') + 1);
        }
        return null;
    }

    @Data
    public static class Links {
        private Self self;
    }

    @Data
    public static class Self {
        private String href;
    }
}
