package com.sicpa.bridge.api.persistence.entities

import javax.persistence.*

@Entity
@Table(name = "webhook", schema = "public")
class WebhookEntity(
    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(name = "name", nullable = false)
    var name: String,

    @Column(name = "url", nullable = false)
    var url: String,

    @Column(name = "active", nullable = false)
    var active: Boolean,

    @Column(name = "secret")
    var secret: String?,

    @OneToMany(mappedBy = "refWebhookEntity", targetEntity = WebhookWebhookTypeEntity::class, fetch = FetchType.LAZY)
    var refWebhookWebhookTypeEntities: MutableList<WebhookWebhookTypeEntity> = mutableListOf(),

    ) {

    fun addWebhookWebhookTypeEntity(w: WebhookWebhookTypeEntity) {
        refWebhookWebhookTypeEntities.add(w)
        w.setWebhookEntity(this)
    }

    override fun toString(): String =
        "Entity of type: ${javaClass.name} ( " +
                "id = $id " +
                "name = $name " +
                "url = $url " +
                "active = $active " +
                ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as WebhookEntity

        if (id != other.id) return false
        if (name != other.name) return false
        if (url != other.url) return false
        if (active != other.active) return false

        return true
    }
}
