package org.nw.core.models;

import java.text.DecimalFormat;
import org.nw.core.utilities.TCOPDFExport;

public class Delivery
{ 
	@TCOPDFExport(header = "period")
	private String period;
	@TCOPDFExport(header = "carrier")
    private String carrier;
    private int carrierID;
    private String periodMonth;
    private String periodYear;
    
    @TCOPDFExport(header = "grade")
    private String grade;
    @TCOPDFExport(header = "deliveredTo")
    private String deliveredTo;
    @TCOPDFExport(header = "fromTheAccountOf")
    private String fromTheAccountOf;
    @TCOPDFExport(header = "forAccount")
    private String forAccount;
    @TCOPDFExport(header = "bblsPerDay")
    private double bblsPerDay;
    @TCOPDFExport(header = "bblsPerMonth")
    private double bblsPerMonth;
    @TCOPDFExport(header = "actualBblsPerMonth")
    private double actualBblsPerMonth;
    private int rowID;
    private DecimalFormat df = new DecimalFormat("0.00");
    
    public Delivery()
    {
    	super();
    }
    
    public Delivery(String periodMonth, String periodYear, String carrier, int carrierID, String period)
    {
        super();
        this.periodMonth = periodMonth;
        this.periodYear = periodYear;
        this.carrier = carrier;
        this.carrierID = carrierID;
        this.period = period;
    }
    
    public Delivery(String grade, String deliveredTo, String fromTheAccountOf,String forAccount, double bblsPerDay, double bblsPerMonth, double actualBblsPerMonth, int rowID, String periodMonth, String periodYear, String carrier, int carrierID, String period)
    {
        this(periodMonth, periodYear, carrier, carrierID, period);
        this.grade = grade;
        this.deliveredTo = deliveredTo;
        this.fromTheAccountOf = fromTheAccountOf;        
        this.forAccount = forAccount;
        this.bblsPerDay = bblsPerDay;
        this.bblsPerMonth = bblsPerMonth;
        this.actualBblsPerMonth = actualBblsPerMonth;
        this.rowID = rowID;
    }
    
	public String getPeriod() {
		return period;
	}


	public void setPeriod(String period) {
		this.period = period;
	}
	
	
	public String getCarrier() {
		return carrier;
	}
	
	
	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}


	public int getCarrierID() {
		return carrierID;
	}


	public void setCarrierID(int carrierID) {
		this.carrierID = carrierID;
	}


	public String getGrade() {
		return grade;
	}


	public void setGrade(String grade) {
		this.grade = grade;
	}


	public String getDeliveredTo() {
		return deliveredTo;
	}


	public void setDeliveredTo(String deliveredTo) {
		this.deliveredTo = deliveredTo;
	}


	public String getFromTheAccountOf() {
		return fromTheAccountOf;
	}


	public void setFromTheAccountOf(String fromTheAccountOf) {
		this.fromTheAccountOf = fromTheAccountOf;
	}


	public String getForAccount() {
		return forAccount;
	}


	public void setForAccount(String forAccount) {
		this.forAccount = forAccount;
	}

	public double getBblsPerDay() {
		return bblsPerDay;
	}

	public void setBblsPerDay(double bblsPerDay) {
		this.bblsPerDay = bblsPerDay;
	}

	public double getBblsPerMonth() {
		return bblsPerMonth;
	}

	public void setBblsPerMonth(double bblsPerMonth) {
		this.bblsPerMonth = bblsPerMonth;
	}

	public String getActualBblsPerMonth() {
		return this.df.format(this.actualBblsPerMonth);
	}

	public void setActualBblsPerMonth(double actualBblsPerMonth) {
		this.actualBblsPerMonth = actualBblsPerMonth;
	}

	public int getRowID() {
		return rowID;
	}

	public void setRowID(int rowID) {
		this.rowID = rowID;
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
