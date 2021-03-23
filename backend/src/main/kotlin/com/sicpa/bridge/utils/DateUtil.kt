package com.sicpa.bridge.utils

import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.time.ZonedDateTime

object DateUtil {
    fun String.toOffsetDateTime(): OffsetDateTime {
        return ZonedDateTime.parse(this.replace(" ", "T")).toOffsetDateTime()
    }
    fun convertEpochToOffsetDateTime(epochValue: Int): OffsetDateTime {
        return OffsetDateTime.of(LocalDateTime.ofEpochSecond(epochValue.toLong(), 0, ZoneOffset.UTC), ZoneOffset.UTC)
    }
}
