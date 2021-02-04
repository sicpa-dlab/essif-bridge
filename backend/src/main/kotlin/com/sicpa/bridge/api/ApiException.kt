package com.sicpa.bridge.api

import com.google.gson.Gson
import com.sicpa.acapyclient.model.SignResponse
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

typealias AcaPyApiException = com.sicpa.acapyclient.invoker.ApiException

sealed class ApiException(msg: String, val code: HttpStatus, exception: Throwable? = null) : ResponseStatusException(
    code,
    msg,
    exception
) {
    class NotFoundException(msg: String, code: HttpStatus = HttpStatus.NOT_FOUND) : ApiException(msg, code)
}