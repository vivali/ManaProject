package fr.lfml.manaproject.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

	public static final String ADMIN = "ROLE_ADMIN";

	public static final String USER = "ROLE_USER";

	public static final String ANONYMOUS = "ROLE_ANONYMOUS";

	public static final String PMANAGER = "ROLE_PMANAGER";

	private AuthoritiesConstants() {
	}
}
