package com.sicpa.bridge.api.persistence.entities

import com.sicpa.bridge.api.annoncreds.domain.model.VerificationTemplateContent
import com.vladmihalcea.hibernate.type.json.JsonBinaryType
import com.vladmihalcea.hibernate.type.json.JsonStringType
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import javax.persistence.*

@Entity
@Table(name = "verification_template", schema = "public")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType::class)
class VerificationTemplateEntity(
    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(name = "name", nullable = false)
    var name: String,

    @Type(type = "jsonb")
    @Column(name = "content", columnDefinition = "jsonb", nullable = false)
    var content: VerificationTemplateContent,

) {

    override fun toString(): String =
        "Entity of type: ${javaClass.name} ( " +
            "id = $id " +
            "name = $name " +
            "content = $content " +
            ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as VerificationTemplateEntity

        if (id != other.id) return false
        if (name != other.name) return false
        if (content != other.content) return false

        return true
    }
}
