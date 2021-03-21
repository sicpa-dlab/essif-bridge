package com.sicpa.bridge.webhooks

import io.swagger.v3.oas.annotations.Hidden
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Hidden
@RequestMapping("/topic")
class ProofsTopic {

    @Autowired
    private val simpMessagingTemplate: SimpMessagingTemplate? = null

    @PostMapping(
        "/present_proof",
        produces = ["application/json"]
    )
    fun credentials(
        @RequestBody
        proofInfo: Any
    ): ResponseEntity<Any?> {
        simpMessagingTemplate?.convertAndSend("/topic/proof", proofInfo)
        return ResponseEntity<Any?>(EmptyJsonResponse(), HttpStatus.OK)
    }
}