package com.terafuze.gohomenotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.terafuze.gohomenotes.domain.UserProfile;

/**
 * Spring Data JPA repository for the User Profile entity.
 */
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

	/**
	 * Find the User Profile object for the currently logged in user
	 */
    @Query("select userProfile from UserProfile userProfile where userProfile.user.login = ?#{principal.username}")
    List<UserProfile> findByUserIsCurrentUser();
}
