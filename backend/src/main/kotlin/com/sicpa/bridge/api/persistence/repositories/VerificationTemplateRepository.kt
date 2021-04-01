package com.sicpa.bridge.api.persistence.repositories

import com.sicpa.bridge.api.persistence.entities.VerificationTemplateEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface VerificationTemplateRepository : JpaRepository<VerificationTemplateEntity, Int>
