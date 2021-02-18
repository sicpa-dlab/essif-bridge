package com.sicpa.bridge.utils

import java.text.SimpleDateFormat
import java.util.*

fun Date.toISO8601UTC(): String = SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'", Locale.getDefault()).format(this)