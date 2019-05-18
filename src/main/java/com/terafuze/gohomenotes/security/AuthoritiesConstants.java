package com.terafuze.gohomenotes.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
    
    public static final String PARENT = "ROLE_PARENT";
    
    public static final String SCHOOL_STAFF = "ROLE_SCHOOL_STAFF";
    
    public static final String STUDENT = "ROLE_STUDENT";
    
    public static final String PARENT_VOLUNTEER = "ROLE_PARENT_VOLUNTEER";
    
    public static final String TEACHER = "ROLE_TEACHER";
    
    public static final String SCHOOL_ADMIN = "ROLE_SCHOOL_ADMIN";

    private AuthoritiesConstants() {
    }
}
