package org.nw.core.models;

public class PdfDownloadInput {
	
	private String period;
	
	private String shipperNumber;
	
	private String carrierNumber;

	public PdfDownloadInput() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PdfDownloadInput(String period, String shipperNumber,
			String carrierNumber) {
		super();
		this.period = period;
		this.shipperNumber = shipperNumber;
		this.carrierNumber = carrierNumber;
	}

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public String getShipperNumber() {
		return shipperNumber;
	}

	public void setShipperNumber(String shipperNumber) {
		this.shipperNumber = shipperNumber;
	}

	public String getCarrierNumber() {
		return carrierNumber;
	}

	public void setCarrierNumber(String carrierNumber) {
		this.carrierNumber = carrierNumber;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((carrierNumber == null) ? 0 : carrierNumber.hashCode());
		result = prime * result + ((period == null) ? 0 : period.hashCode());
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
		PdfDownloadInput other = (PdfDownloadInput) obj;
		if (carrierNumber == null) {
			if (other.carrierNumber != null)
				return false;
		} else if (!carrierNumber.equals(other.carrierNumber))
			return false;
		if (period == null) {
			if (other.period != null)
				return false;
		} else if (!period.equals(other.period))
			return false;
		if (shipperNumber == null) {
			if (other.shipperNumber != null)
				return false;
		} else if (!shipperNumber.equals(other.shipperNumber))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "PdfDownloadInput [period=" + period + ", shipperNumber="
				+ shipperNumber + ", carrierNumber=" + carrierNumber + "]";
	}
}
