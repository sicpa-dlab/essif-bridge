package com.sicpa.bridge.core

import kotlinx.coroutines.coroutineScope

abstract class BaseUseCase<out Type, in Params> where Type : Any {

    abstract suspend fun run(params: Params): Type

    suspend operator fun invoke(
        params: Params,
    ): Type {
        return coroutineScope {
            run(params)
        }
    }
}