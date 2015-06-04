package org.nw.core.models;

import java.util.List;

public class DeliveryUpdateList
{ 
	private String periodMonth;
	private String periodYear;
	private String period;
	private int carrierID;
	private String carrier;
	
	private List<Delivery> dataList;

	public DeliveryUpdateList() {
		super();
	}
	
	public List<Delivery> getDataList() {
		return dataList;
	}

	public void setDataList(List<Delivery> dataList) {
		this.dataList = dataList;
	}

	@Override
	public String toString() {
		return "DeliveryUpdateList [dataList=" + dataList + "]";
	}

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public int getCarrierID() {
		return carrierID;
	}

	public void setCarrierID(int carrierID) {
		this.carrierID = carrierID;
	}

	public String getCarrier() {
		return carrier;
	}

	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}

	public String getPeriodMonth() {
		return periodMonth;
	}

	public void setPeriodMonth(String periodMonth) {
		this.periodMonth = periodMonth;
	}

	public String getPeriodYear() {
		return periodYear;
	}

	public void setPeriodYear(String periodYear) {
		this.periodYear = periodYear;
	}
}