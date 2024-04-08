package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.Color;
import com.example.backend.backend.Entity.Enum_Key.EColor;
import com.example.backend.backend.Entity.Enum_Key.ESize;
import com.example.backend.backend.Entity.Size;
import com.example.backend.backend.Repository.ColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class ColorService {
    @Autowired
    private  ColorRepository colorRepository;
    //Tạo các màu từ ENum vào csdl
    public void createColorsFromEnum() {
        for (EColor eColor : EColor.values()) {

            if (colorRepository.findByName(eColor) == null) {
                Color color = new Color();
                color.setName(eColor);
                colorRepository.save(color);
            }
        }
    }
}
