package com.terafuze.gohomenotes.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.terafuze.gohomenotes.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.terafuze.gohomenotes.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.terafuze.gohomenotes.domain.User.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.Authority.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.User.class.getName() + ".authorities");
            createCache(cm, com.terafuze.gohomenotes.domain.Address.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.Address.class.getName() + ".userProfiles");
            createCache(cm, com.terafuze.gohomenotes.domain.AfterSchoolProgram.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.DismissalLocation.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.EarlyPickupRequest.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.FamilyRegistration.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.FamilyRegistration.class.getName() + ".parentRegistrations");
            createCache(cm, com.terafuze.gohomenotes.domain.FamilyRegistration.class.getName() + ".studentRegistrations");
            createCache(cm, com.terafuze.gohomenotes.domain.GoHomeNotesReport.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.GuestRequest.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.HostRequest.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.Parent.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.Parent.class.getName() + ".students");
            createCache(cm, com.terafuze.gohomenotes.domain.ParentRegistration.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.School.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.School.class.getName() + ".afterSchoolPrograms");
            createCache(cm, com.terafuze.gohomenotes.domain.School.class.getName() + ".dismissalLocations");
            createCache(cm, com.terafuze.gohomenotes.domain.School.class.getName() + ".goHomeNotesReports");
            createCache(cm, com.terafuze.gohomenotes.domain.School.class.getName() + ".schoolGrades");
            createCache(cm, com.terafuze.gohomenotes.domain.School.class.getName() + ".students");
            createCache(cm, com.terafuze.gohomenotes.domain.School.class.getName() + ".teachers");
            createCache(cm, com.terafuze.gohomenotes.domain.SchoolGrade.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.SchoolGrade.class.getName() + ".studentRegistrations");
            createCache(cm, com.terafuze.gohomenotes.domain.SchoolGrade.class.getName() + ".students");
            createCache(cm, com.terafuze.gohomenotes.domain.SchoolGrade.class.getName() + ".teachers");
            createCache(cm, com.terafuze.gohomenotes.domain.Student.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.Student.class.getName() + ".earlyPickupRequests");
            createCache(cm, com.terafuze.gohomenotes.domain.Student.class.getName() + ".parents");
            createCache(cm, com.terafuze.gohomenotes.domain.StudentRegistration.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.Teacher.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.Teacher.class.getName() + ".students");
            createCache(cm, com.terafuze.gohomenotes.domain.TransportationChangeRequest.class.getName());
            createCache(cm, com.terafuze.gohomenotes.domain.UserProfile.class.getName());
            };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
