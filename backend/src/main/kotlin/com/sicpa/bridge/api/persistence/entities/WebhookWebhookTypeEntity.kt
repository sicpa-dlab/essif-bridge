package com.sicpa.bridge.api.persistence.entities

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "webhook_webhook_type", schema = "public")
class WebhookWebhookTypeEntity(
    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @JoinTable(
        name = "webhook_webhook_type_webhook_type_filter",
        joinColumns = [JoinColumn(name = "webhook_webhook_type_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "hook_type_filter_id", referencedColumnName = "id")]
    )
    @OneToMany(targetEntity = WebhookTypeFilterEntity::class, fetch = FetchType.LAZY)
    var refWebhookTypeFilterEntities: List<WebhookTypeFilterEntity> = emptyList(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "webhook_id", referencedColumnName = "id")
    var refWebhookEntity: WebhookEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hook_type_id", referencedColumnName = "id")
    var refWebhookTypeEntity: WebhookTypeEntity
) {
    fun setWebhookEntity(webhookEntity: WebhookEntity) {
        refWebhookEntity = webhookEntity
    }

    override fun toString(): String =
        "Entity of type: ${javaClass.name} ( " +
            "id = $id " +
            ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as WebhookWebhookTypeEntity

        if (id != other.id) return false

        return true
    }
}
