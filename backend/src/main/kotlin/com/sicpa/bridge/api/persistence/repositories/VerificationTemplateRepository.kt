package com.sicpa.bridge.api.persistence.repositories

import com.sicpa.bridge.api.persistence.entities.VerificationTemplateEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface VerificationTemplateRepository : JpaRepository<VerificationTemplateEntity, Int> {

}
