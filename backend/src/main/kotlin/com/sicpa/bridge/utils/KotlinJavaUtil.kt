package com.sicpa.bridge.utils

import java.util.Optional

object KotlinJavaUtil {
    fun <T> Optional<T>.unwrap(): T? = orElse(null)
}
