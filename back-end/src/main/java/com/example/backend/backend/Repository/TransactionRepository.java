package com.example.backend.backend.Repository;


import com.example.backend.backend.Entity.Transaction;
import com.example.backend.backend.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findAllByUser(User user);
    @Query("SELECT e FROM Transaction e  ORDER BY e.id DESC")
    List<Transaction> findTop5ByIdDesc(Pageable pageable);
}
