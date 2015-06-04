package org.nw.core.models;

import java.util.Arrays;
import java.util.List;


public class Linefill {
	
	private String downloadLink;
	
	private String period;
	
	private long periodYear;
	
	private int periodMonth;
	
	private double currentLinefill;
	
	private double newLinefill;
	
	private String shipperName;
	
	private String shipperNumber;
	
	public Linefill() {
		super();
	}

	public Linefill(String downloadLink, int periodMonth,long periodYear,double currentLinefill,
			double newLinefill, String shipperName, String shipperNumber) {
		super();
		this.downloadLink = downloadLink;
		this.periodMonth = periodMonth;
		this.periodYear = periodYear;
		this.period = getPeriod(periodMonth,periodYear);
		this.currentLinefill = currentLinefill;
		this.newLinefill = newLinefill;
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
	

	public long getPeriodYear() {
		return periodYear;
	}

	public void setPeriodYear(long periodYear) {
		this.periodYear = periodYear;
	}

	public int getPeriodMonth() {
		return periodMonth;
	}

	public void setPeriodMonth(int periodMonth) {
		this.periodMonth = periodMonth;
	}

	public void setCurrentLinefill(double currentLinefill) {
		this.currentLinefill = currentLinefill;
	}

	public void setNewLinefill(double newLinefill) {
		this.newLinefill = newLinefill;
	}

	public double getCurrentLinefill() {
		return currentLinefill;
	}

	public void setCurrentLinefill(float currentLinefill) {
		this.currentLinefill = currentLinefill;
	}

	public double getNewLinefill() {
		return newLinefill;
	}

	public void setNewLinefill(float newLinefill) {
		this.newLinefill = newLinefill;
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
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(currentLinefill);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result
				+ ((downloadLink == null) ? 0 : downloadLink.hashCode());
		temp = Double.doubleToLongBits(newLinefill);
		result = prime * result + (int) (temp ^ (temp >>> 32));
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
		Linefill other = (Linefill) obj;
		if (Double.doubleToLongBits(currentLinefill) != Double
				.doubleToLongBits(other.currentLinefill))
			return false;
		if (downloadLink == null) {
			if (other.downloadLink != null)
				return false;
		} else if (!downloadLink.equals(other.downloadLink))
			return false;
		if (Double.doubleToLongBits(newLinefill) != Double
				.doubleToLongBits(other.newLinefill))
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
	 private String getPeriod(int month,long year){
		 List<String> months =  Arrays.asList("January","Feburary","Marth","April","May","June","July","August","September","October","November","December");
		return months.get(month-1) + "' "+ year;
	} 

	@Override
	public String toString() {
		return "Linefill [downloadLink=" + downloadLink + ", period=" + period
				+ ", currentLinefill=" + currentLinefill + ", newLinefill="
				+ newLinefill + ", shipperName=" + shipperName
				+ ", shipperNumber=" + shipperNumber + "]";
	}
}
