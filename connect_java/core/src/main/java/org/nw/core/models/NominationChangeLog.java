package org.nw.core.models;

public class NominationChangeLog {

	private String datetime;	
	private String username;
	private String nominationchanges;
	private String oldvalue;		
	private String newvalue;
	
	public NominationChangeLog() {
		super();
		// TODO Auto-generated constructor stub
	}

	public NominationChangeLog(String datetime, String username,
			String nominationchanges, String oldvalue, String newvalue) {
		super();
		this.datetime = datetime;
		this.username = username;
		this.nominationchanges = nominationchanges;
		this.oldvalue = oldvalue;
		this.newvalue = newvalue;
	}

	public String getDatetime() {
		return datetime;
	}

	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNominationchanges() {
		return nominationchanges;
	}

	public void setNominationchanges(String nominationchanges) {
		this.nominationchanges = nominationchanges;
	}

	public String getOldvalue() {
		return oldvalue;
	}

	public void setOldvalue(String oldvalue) {
		this.oldvalue = oldvalue;
	}

	public String getNewvalue() {
		return newvalue;
	}

	public void setNewvalue(String newvalue) {
		this.newvalue = newvalue;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((datetime == null) ? 0 : datetime.hashCode());
		result = prime * result
				+ ((newvalue == null) ? 0 : newvalue.hashCode());
		result = prime
				* result
				+ ((nominationchanges == null) ? 0 : nominationchanges
						.hashCode());
		result = prime * result
				+ ((oldvalue == null) ? 0 : oldvalue.hashCode());
		result = prime * result
				+ ((username == null) ? 0 : username.hashCode());
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
		NominationChangeLog other = (NominationChangeLog) obj;
		if (datetime == null) {
			if (other.datetime != null)
				return false;
		} else if (!datetime.equals(other.datetime))
			return false;
		if (newvalue == null) {
			if (other.newvalue != null)
				return false;
		} else if (!newvalue.equals(other.newvalue))
			return false;
		if (nominationchanges == null) {
			if (other.nominationchanges != null)
				return false;
		} else if (!nominationchanges.equals(other.nominationchanges))
			return false;
		if (oldvalue == null) {
			if (other.oldvalue != null)
				return false;
		} else if (!oldvalue.equals(other.oldvalue))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "NominationChangeLog [datetime=" + datetime + ", username="
				+ username + ", nominationchanges=" + nominationchanges
				+ ", oldvalue=" + oldvalue + ", newvalue=" + newvalue + "]";
	}	
	
	
}
