package com.sicpa.bridge.api.persistence.entities

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "aca_py_webhook_type_filter", schema = "public")
class AcaPyWebhookTypeFilterEntity(
    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(name = "name", nullable = false)
    var name: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "webhook_type_filter_id", referencedColumnName = "id")
    var refWebhookTypeFilterEntity: WebhookTypeFilterEntity
)
