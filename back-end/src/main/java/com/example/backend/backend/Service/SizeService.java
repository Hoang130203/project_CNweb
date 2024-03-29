package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.Enum_Key.ESize;
import com.example.backend.backend.Entity.Size;
import com.example.backend.backend.Repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    public void createSizesFromEnum() {
        for (ESize eSize : ESize.values()) {
            // Kiểm tra xem kích thước đã tồn tại trong bảng hay chưa
            if (sizeRepository.findByName(eSize) == null) {
                Size size = new Size();
                size.setName(eSize);
                sizeRepository.save(size);
            }
        }
    }
}