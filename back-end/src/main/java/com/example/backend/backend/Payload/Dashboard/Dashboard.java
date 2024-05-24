package com.example.backend.backend.Payload.Dashboard;

import lombok.Data;

import java.util.List;

@Data
public class Dashboard {
    private DashQuantity today;
    private DashQuantity thisWeek;
    private List<Object[]> listmonths1;
    private List<Object[]> listmonths2;
    private List<Object[]> listmonths3;
    private List<Object[]> listmonths4;
    private List<Object[]> listmonths5;
    private List<Object[]> listmonths6;

}
