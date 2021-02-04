package com.sicpa.bridge.config

import com.sicpa.acapyclient.invoker.Configuration.getDefaultApiClient
import org.springframework.context.annotation.Configuration

@Configuration
class AcaPyClientConfig(
    acaPyClientConfigProperties: AcaPyClientConfigProperties
) {

    init {
        getDefaultApiClient().basePath = acaPyClientConfigProperties.url
    }
}