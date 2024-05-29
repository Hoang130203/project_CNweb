package com.example.backend.backend;


import com.example.backend.backend.payos.PayOS;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Value("${PAYOS_CLIENT_ID}")
	private String clientId;

	@Value("${PAYOS_API_KEY}")
	private String apiKey;

	@Value("${PAYOS_CHECKSUM_KEY}")
	private String checksumKey;

	@Bean
	public PayOS payOS() {
		return new PayOS(clientId, apiKey, checksumKey);
	}
}
