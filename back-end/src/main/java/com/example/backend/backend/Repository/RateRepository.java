package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.RateKey;
import com.example.backend.backend.Entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RateRepository extends JpaRepository<Rate, RateKey> {

}
