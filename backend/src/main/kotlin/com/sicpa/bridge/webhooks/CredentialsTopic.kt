package com.sicpa.bridge.webhooks

import io.swagger.v3.oas.annotations.Hidden
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.http.HttpStatus

import org.springframework.http.ResponseEntity
import org.springframework.messaging.simp.SimpMessagingTemplate

@RestController
@Hidden
@RequestMapping("/topic")
class CredentialsTopic {

    @Autowired
    private val simpMessagingTemplate: SimpMessagingTemplate? = null

    @PostMapping(
        "/issue_credential",
        produces = ["application/json"]
    )
    fun credentials(
        @RequestBody
        credInfo: Any
    ): ResponseEntity<Any?> {
        val map =  credInfo as Map<*,*>
        map["connection_id"]?.let { connection ->
            simpMessagingTemplate?.convertAndSend("/topic/credential/${connection}", credInfo)
        }
        return ResponseEntity<Any?>(EmptyJsonResponse(), HttpStatus.OK)
    }
}