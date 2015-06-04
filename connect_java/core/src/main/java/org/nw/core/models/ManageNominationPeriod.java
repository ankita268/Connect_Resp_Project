package org.nw.core.models;

public class ManageNominationPeriod {

	private String id;
	
	private String period;
	private String currentstatus;
	
	public ManageNominationPeriod(){
		super();
	}

	public ManageNominationPeriod(String id,  String period, String currentstatus ) {
		super();
		this.id = id;
		this.period = period;
		this.currentstatus = currentstatus;
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}


	public String getCurrentstatus() {
		return currentstatus;
	}

	public void setCurrentstatus(String currentstatus) {
		this.currentstatus = currentstatus;
	}

	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());	
		result = prime * result + ((period == null) ? 0 : period.hashCode());
		result = prime * result + ((currentstatus == null) ? 0 : currentstatus.hashCode());
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
		ManageNominationPeriod other = (ManageNominationPeriod) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (period == null) {
			if (other.period != null)
				return false;
		} else if (!period.equals(other.period))
			return false;
		if (currentstatus == null) {
			if (other.currentstatus != null)
				return false;
		} else if (!currentstatus.equals(other.currentstatus))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ManageNominationPeriod [id=" + id + ", period=" + period
				+ ", currentstatus=" + currentstatus + "]";
	}
	
	
}
