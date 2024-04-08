package com.example.backend.backend.Payload.Order;

import com.example.backend.backend.Entity.Enum_Key.EStatus;
import com.example.backend.backend.Payload.Cart.PostCart;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
//Thông tin đơn hàng khi người dùng gửi request lên
public class OrderInfo {
    private List<PostCart> postCarts;
    private Long totalCost;
    private Long deliveryCost;
    @Getter@Setter
    private boolean payments;

    public boolean getPayments() {
        return this.payments;
    }
}
