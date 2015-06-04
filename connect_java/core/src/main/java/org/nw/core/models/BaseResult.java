package org.nw.core.models;

public class BaseResult {
	
	public final static String SUCCESS="success";
	
	public final static String ERROR="error";
	
	public final static String WARN="warning";
	
	private int total;
	
	private int pageTotal;
	
	protected String errorCode;
	
	protected String errorMessage;
	
	private int draw;
	
	private int recordsTotal;
	
	private int recordsFiltered;
	
	public BaseResult() {
		super();
	}

	public BaseResult(int total, int pageTotal, int draw, String errorCode,
			String errorMessage) {
		super();
		this.total = total;
		this.pageTotal = pageTotal;
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
		this.draw = draw;
		this.recordsTotal = total;
		this.recordsFiltered = total;
	}

	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}

	public int getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public int getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(int recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getPageTotal() {
		return pageTotal;
	}

	public void setPageTotal(int pageTotal) {
		this.pageTotal = pageTotal;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((errorCode == null) ? 0 : errorCode.hashCode());
		result = prime * result
				+ ((errorMessage == null) ? 0 : errorMessage.hashCode());
		result = prime * result + pageTotal;
		result = prime * result + total;
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
		BaseResult other = (BaseResult) obj;
		if (errorCode == null) {
			if (other.errorCode != null)
				return false;
		} else if (!errorCode.equals(other.errorCode))
			return false;
		if (errorMessage == null) {
			if (other.errorMessage != null)
				return false;
		} else if (!errorMessage.equals(other.errorMessage))
			return false;
		if (pageTotal != other.pageTotal)
			return false;
		if (total != other.total)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "BasicServiceResult [total=" + total + ", pageTotal="
				+ pageTotal + ", errorCode=" + errorCode + ", errorMessage="
				+ errorMessage + "]";
	}		

}
