package org.nw.core.models;

public class BasicServiceResult<T> extends BaseResult{
	
	private T result;

	public BasicServiceResult() {
		super();
	}
	
	public BasicServiceResult(T result,String errorCode, String errorMessage) {
		this.result= result;
		super.errorCode = errorCode;
		super.errorMessage=errorMessage;
	}

	public BasicServiceResult(int total, int pageTotal, int draw,
			String errorCode, String errorMessage) {
		super(total, pageTotal, draw, errorCode, errorMessage);
	}

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}

	@Override
	public String toString() {
		return "BaseServiceResult [result=" + result + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((this.result == null) ? 0 : this.result.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		BasicServiceResult other = (BasicServiceResult) obj;
		if (result == null) {
			if (other.result != null)
				return false;
		} else if (!result.equals(other.result))
			return false;
		return true;
	}
 

}
