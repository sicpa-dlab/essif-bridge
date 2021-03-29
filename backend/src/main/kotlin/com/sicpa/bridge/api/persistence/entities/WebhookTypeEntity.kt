package com.sicpa.bridge.api.persistence.entities

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "webhook_type", schema = "public")
class WebhookTypeEntity(
    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(name = "name", nullable = false)
    var name: String,

    @Column(name = "description")
    var description: String?,

    @OneToMany(mappedBy = "refWebhookTypeEntity", targetEntity = WebhookTypeFilterEntity::class, fetch = FetchType.LAZY)
    var refWebhookTypeFilterEntities: List<WebhookTypeFilterEntity> = emptyList(),

    @OneToMany(mappedBy = "refWebhookTypeEntity", targetEntity = AcaPyWebhookTypeEntity::class, fetch = FetchType.LAZY)
    var refAcaPyWebhookTypeEntities: List<AcaPyWebhookTypeEntity> = emptyList()
) {
    override fun toString(): String =
        "Entity of type: ${javaClass.name} ( " +
            "id = $id " +
            "name = $name " +
            "description = $description " +
            ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as WebhookTypeEntity

        if (id != other.id) return false
        if (name != other.name) return false
        if (description != other.description) return false

        return true
    }
}
