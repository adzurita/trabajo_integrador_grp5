package com.xplora.backend.openapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "Xplora+ API",
                version = "1.0",
                description = "Esta es una aplicación realizada para el Proyecto Integrador"
        )
)
public class OpenApiConfiguration {
}
