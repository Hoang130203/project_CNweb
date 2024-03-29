package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getNewest() {
        Pageable pageable = PageRequest.of(0, 12);
        return productRepository.findTop12Product(pageable);
    }

    @Override
    public List<Product> getProductByType(EType type) {
        return productRepository.findProductByType(type);
    }

    @Override
    public Product getProduct(int id) {
        Optional<Product> o_product= productRepository.findById(id);
        if (o_product.isPresent())
        {
            return o_product.get();
        }
        else{
            return null;
        }
    }
}
