package com.sicpa.bridge.api.validation

import com.sicpa.bridge.api.isValidUrl
import javax.validation.Constraint
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext
import javax.validation.Payload
import kotlin.reflect.KClass

@Target(AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [JsonLdContextValidator::class])
annotation class ValidJsonLdContext constructor(
    val message: String = "context not valid",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)

internal class JsonLdContextValidator() :
    ConstraintValidator<ValidJsonLdContext?, List<String>> {
    override fun initialize(constraint: ValidJsonLdContext?) {}
    override fun isValid(jsonLdContext: List<String>, context: ConstraintValidatorContext): Boolean {
        return jsonLdContext.count() == 2 &&  jsonLdContext.all { it.isValidUrl() }
    }
}