package org.nw.core.models;

public class Statement {
	
	private String downloadLink;
	
	private String period;
	
	private String shipperName;
	
	private String shipperNumber;

	public Statement() {
		super();
	}

	public Statement(String downloadLink, String period, String shipperName,
			String shipperNumber) {
		super();
		this.downloadLink = downloadLink;
		this.period = period;
		this.shipperName = shipperName;
		this.shipperNumber = shipperNumber;
	}

	public String getDownloadLink() {
		return downloadLink;
	}

	public void setDownloadLink(String downloadLink) {
		this.downloadLink = downloadLink;
	}

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public String getShipperName() {
		return shipperName;
	}

	public void setShipperName(String shipperName) {
		this.shipperName = shipperName;
	}

	public String getShipperNumber() {
		return shipperNumber;
	}

	public void setShipperNumber(String shipperNumber) {
		this.shipperNumber = shipperNumber;
	}

	@Override
	public String toString() {
		return "Statement [downloadLink=" + downloadLink + ", period=" + period
				+ ", shipperName=" + shipperName + ", shipperNumber="
				+ shipperNumber + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((downloadLink == null) ? 0 : downloadLink.hashCode());
		result = prime * result + ((period == null) ? 0 : period.hashCode());
		result = prime * result
				+ ((shipperName == null) ? 0 : shipperName.hashCode());
		result = prime * result
				+ ((shipperNumber == null) ? 0 : shipperNumber.hashCode());
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
		Statement other = (Statement) obj;
		if (downloadLink == null) {
			if (other.downloadLink != null)
				return false;
		} else if (!downloadLink.equals(other.downloadLink))
			return false;
		if (period == null) {
			if (other.period != null)
				return false;
		} else if (!period.equals(other.period))
			return false;
		if (shipperName == null) {
			if (other.shipperName != null)
				return false;
		} else if (!shipperName.equals(other.shipperName))
			return false;
		if (shipperNumber == null) {
			if (other.shipperNumber != null)
				return false;
		} else if (!shipperNumber.equals(other.shipperNumber))
			return false;
		return true;
	}

}
