package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Color;
import com.example.backend.backend.Entity.Enum_Key.EColor;
import com.example.backend.backend.Entity.Enum_Key.ESize;
import com.example.backend.backend.Entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color,Integer> {
    Color findByName(EColor name);

}
