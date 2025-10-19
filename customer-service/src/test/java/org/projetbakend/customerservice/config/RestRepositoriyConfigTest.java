package org.projetbakend.customerservice.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.projetbakend.customerservice.entities.Customer;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RestRepositoriyConfigTest {

    @Mock
    private RepositoryRestConfiguration repositoryRestConfiguration;

    @Mock
    private CorsRegistry corsRegistry;

    private RestRepositoriyConfig restRepositoriyConfig;

    @BeforeEach
    void setUp() {
        restRepositoriyConfig = new RestRepositoriyConfig();
    }

    @Test
    void testConfigurationMethodCalled() {
        // When
        restRepositoriyConfig.configureRepositoryRestConfiguration(repositoryRestConfiguration, corsRegistry);

        // Then - The method should complete without error (empty implementation)
        assertDoesNotThrow(() -> {
            restRepositoriyConfig.configureRepositoryRestConfiguration(repositoryRestConfiguration, corsRegistry);
        }, "Configuration method should execute without throwing exceptions");
    }

    @Test
    void testConfigLoadsProperlyAsBean() {
        // Given/When
        RestRepositoriyConfig config = new RestRepositoriyConfig();

        // Then
        assertNotNull(config, "Configuration should be instantiated successfully");
    }

    @Test
    void testConfigurationWithValidParameters() {
        // When/Then - should not throw exception with valid parameters
        assertDoesNotThrow(() -> {
            restRepositoriyConfig.configureRepositoryRestConfiguration(repositoryRestConfiguration, corsRegistry);
        }, "Configuration method should handle valid parameters");
    }

    @Test
    void testConfigurerInterfaceImplemented() {
        // Then
        assertTrue(restRepositoriyConfig instanceof RepositoryRestConfigurer, 
                "RestRepositoriyConfig should implement RepositoryRestConfigurer");
    }

    @Test
    void testConfigurationBeanCreation() {
        // When
        RestRepositoriyConfig config = new RestRepositoriyConfig();

        // Then
        assertNotNull(config, "Configuration bean should be created successfully");
        assertInstanceOf(RepositoryRestConfigurer.class, config, 
                "Configuration should be instance of RepositoryRestConfigurer");
    }

    @Test
    void testInvalidConfigurationHandling() {
        // When/Then - should not throw exception with null parameters
        assertDoesNotThrow(() -> {
            restRepositoriyConfig.configureRepositoryRestConfiguration(null, null);
        }, "Configuration method should handle null parameters gracefully");
    }
}