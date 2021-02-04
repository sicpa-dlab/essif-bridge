package com.sicpa.bridge.webhooks

import io.swagger.v3.oas.annotations.Hidden
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.http.HttpStatus

import org.springframework.http.ResponseEntity

@RestController
@Hidden
@RequestMapping("/topic")
class Credentials {

    @PostMapping(
        "/issue_credential",
        produces = ["application/json"]
    )
    fun credentials(
        @RequestBody
        credInfo: Any
    ): ResponseEntity<Any?> {
        return ResponseEntity<Any?>(EmptyJsonResponse(), HttpStatus.OK)
    }
}