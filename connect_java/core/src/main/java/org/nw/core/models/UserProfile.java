package org.nw.core.models;

public class UserProfile {
	private String currentUser;

	public UserProfile() {
		super();
	}

	public UserProfile(String currentUser) {
		super();
		this.currentUser = currentUser;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((currentUser == null) ? 0 : currentUser.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserProfile other = (UserProfile) obj;
		if (currentUser == null) {
			if (other.currentUser != null)
				return false;
		} else if (!currentUser.equals(other.currentUser))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UserProfile [currentUser=" + currentUser + "]";
	}
	
}
