package com.terafuze.gohomenotes.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.terafuze.gohomenotes.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Address.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Address.class.getName() + ".userProfiles", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.AfterSchoolProgram.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.DailyVerificationRecord.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.DismissalLocation.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.EarlyPickupRequest.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.FamilyRegistration.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.FamilyRegistration.class.getName() + ".parentRegistrations", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.FamilyRegistration.class.getName() + ".studentRegistrations", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.GuestRequest.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.HostRequest.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Parent.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Parent.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.ParentRegistration.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.School.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.School.class.getName() + ".afterSchoolPrograms", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.School.class.getName() + ".dismissalLocations", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.School.class.getName() + ".schoolGrades", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.School.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.School.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.SchoolGrade.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.SchoolGrade.class.getName() + ".studentRegistrations", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.SchoolGrade.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.SchoolGrade.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Student.class.getName() + ".earlyPickupRequests", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Student.class.getName() + ".parents", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.StudentRegistration.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.Teacher.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.TransportationChangeRequest.class.getName(), jcacheConfiguration);
            cm.createCache(com.terafuze.gohomenotes.domain.UserProfile.class.getName(), jcacheConfiguration);
            };
    }
}
