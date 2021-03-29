package com.sicpa.bridge.webhooks

import io.swagger.v3.oas.annotations.Hidden
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Hidden
@RequestMapping("/topic")
class ConnectionsTopic {

    @Autowired
    private val simpMessagingTemplate: SimpMessagingTemplate? = null

    @PostMapping(
        "/connections",
        produces = ["application/json"]
    )
    fun connections(
        connectionInfo: Any
    ): ResponseEntity<Any?> {

        val map =  connectionInfo as Map<*,*>
        map["connection_id"]?.let { connection ->
            simpMessagingTemplate?.convertAndSend("/topic/connections/${connection}", connectionInfo)
        }
        return ResponseEntity<Any?>(EmptyJsonResponse(), HttpStatus.OK)
    }

}