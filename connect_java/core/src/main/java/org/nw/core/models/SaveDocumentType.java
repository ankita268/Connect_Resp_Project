package org.nw.core.models;

public class SaveDocumentType
{ 
    private int id;
    private String name;
    private int[] assignedRoles;
    private int[]  assignedPrograms;
    private int[]  assignedShippers;
    
    public SaveDocumentType(){
    	 super();
    }
    public SaveDocumentType(int id, String name)
    {
    	super();
    }

	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public int[] getAssignedRoles() {
		return assignedRoles;
	}


	public void setAssignedRoles(int[] assignedRoles) {
		this.assignedRoles = assignedRoles;
	}


	public int[] getAssignedPrograms() {
		return assignedPrograms;
	}


	public void setAssignedPrograms(int[] assignedPrograms) {
		this.assignedPrograms = assignedPrograms;
	}


	public int[] getAssignedShippers() {
		return assignedShippers;
	}

	public void setAssignedShippers(int[] assignedShippers) {
		this.assignedShippers = assignedShippers;
	}
	@Override
	public String toString() {
		return "Document [id=" + id + ", name=" + name + ", assignedRoles=" + assignedRoles + ", assignedPrograms=" + assignedPrograms + ", assignedShippers=" + assignedShippers + "]";
	}
	 

}
