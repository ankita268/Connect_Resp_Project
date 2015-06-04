package org.nw.core.models;

public class HttpConfig {
	
	private int timeout;

	public HttpConfig() {
		super();
	}

	public HttpConfig(int timeout) {
		super();
		this.timeout = timeout;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + timeout;
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
		HttpConfig other = (HttpConfig) obj;
		if (timeout != other.timeout)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "HttpConfig [timeout=" + timeout + "]";
	}
	
}
