package org.nw.core.models;

import java.util.List;

public class BaseTableInput {
	
	private int pageSize;
	
	private int currentPage;
	
	private List<BaseValue> filter;
	
	private String status;
	
	private String id;

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public List<BaseValue> getFilter() {
		return filter;
	}

	public void setFilter(List<BaseValue> filter) {
		this.filter = filter;
	}

	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setId(String id){
		this.id=id;		
	}
	
	public String getId(){
		return id;
	}
	public BaseTableInput(int pageSize, int currentPage, List<BaseValue> filter, String status) {
		super();
		this.pageSize = pageSize;
		this.currentPage = currentPage;
		this.filter = filter;
		this.status = status;
	}

	public BaseTableInput() {
		super();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + currentPage;
		result = prime * result + ((filter == null) ? 0 : filter.hashCode());
		result = prime * result + pageSize;
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		BaseTableInput other = (BaseTableInput) obj;
		if (currentPage != other.currentPage)
			return false;
		if (filter == null) {
			if (other.filter != null)
				return false;
		} else if (!filter.equals(other.filter))
			return false;
		if (pageSize != other.pageSize)
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		
		return true;
	}
	
	@Override
	public String toString() {
		return "BaseTableInput [pageSize=" + pageSize + ", currentPage="
				+ currentPage + ", filter=" + filter + ", status=" + status + ", id=" + id + "]";
	}
}
