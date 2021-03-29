package com.sicpa.bridge.api.persistence.entities

import javax.persistence.*

@Entity
@Table(name = "image", schema = "public")
class ImageEntity(
    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(name = "content", nullable = false)
    var content: ByteArray,

    @Column(name = "name", nullable = false)
    var name: String,

) {

    override fun toString(): String =
        "Entity of type: ${javaClass.name} ( " +
            "id = $id " +
            ")"

    // constant value returned to avoid entity inequality to itself before and after it's update/merge
    override fun hashCode(): Int = 42

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as ImageEntity

        if (id != other.id) return false

        return true
    }
}
