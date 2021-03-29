package com.sicpa.bridge.api

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

typealias AcaPyApiException = com.sicpa.acapyclient.invoker.ApiException

sealed class ApiException(msg: String, val code: HttpStatus, exception: Throwable? = null) : ResponseStatusException(
    code,
    msg,
    exception
) {
    class NotFoundException(msg: String, code: HttpStatus = HttpStatus.BAD_REQUEST) : ApiException(msg, code)
    class WrongCredential(msg: String, code: HttpStatus = HttpStatus.BAD_REQUEST) : ApiException(msg, code)
    class GenericBusinessException(msg: String, code: HttpStatus = HttpStatus.BAD_REQUEST) : ApiException(msg, code)

}