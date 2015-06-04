package org.nw.core.models;

import java.util.List;

public class TagListType
{ 
	private List<Tag> roleList;
	private List<Tag> shipperList;
	private List<Tag> programList;
	
	public List<Tag> getRoleList() {
		return roleList;
	}
	public void setRoleList(List<Tag> roleList) {
		this.roleList = roleList;
	}
	public List<Tag> getShipperList() {
		return shipperList;
	}
	public void setShipperList(List<Tag> shipperList) {
		this.shipperList = shipperList;
	}
	public List<Tag> getProgramList() {
		return programList;
	}
	public void setProgramList(List<Tag> programList) {
		this.programList = programList;
	}
     
     

}
