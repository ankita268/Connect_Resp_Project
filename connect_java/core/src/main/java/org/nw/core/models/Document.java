package org.nw.core.models;

import java.util.ArrayList;
import java.util.List;

import org.nw.core.utilities.TCOPDFExport;


public class Document
{ 
	@TCOPDFExport(header = "id")
    private int id;
	@TCOPDFExport(header = "name")
    private String name;
	@TCOPDFExport(header = "type")
	private String type;   
	@TCOPDFExport(header = "url")
	private String url;
    
    private List<Tag> assignedRoles;
    private List<Tag> assignedPrograms;
    private List<Tag> assignedShippers;
    
    public Document(){
    	 super();
    }
    public Document(int id, String name)
    {
    	super();
        new Document(id,name,false);
    }
    public Document(int id, String name,boolean withAssignements)
    {
        super();
        this.name = name;
        this.id = id;
        if(withAssignements){
        	this.url = "http://www.w3schools.com//images/myw3schoolsimage.jpg";
        	this.assignedRoles =  new ArrayList<Tag>();
            this.assignedRoles.add(new Tag(1,"Role-1"));
            this.assignedRoles.add(new Tag(2,"Role-2"));
            this.assignedPrograms = new ArrayList<Tag>();
            this.assignedPrograms.add(new Tag(1, "Program-1"));
            this.assignedPrograms.add(new Tag(2, "Program-2"));
            this.assignedShippers =  new ArrayList<Tag>();
            this.assignedShippers.add(new Tag(1, "Shipper-1"));
            this.assignedShippers.add(new Tag(2, "Shipper-2"));
        }
        
        
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}


	public List<Tag> getAssignedRoles() {
		return assignedRoles;
	}


	public void setAssignedRoles(List<Tag> assignedRoles) {
		this.assignedRoles = assignedRoles;
	}


	public List<Tag> getAssignedPrograms() {
		return assignedPrograms;
	}


	public void setAssignedPrograms(List<Tag> assignedPrograms) {
		this.assignedPrograms = assignedPrograms;
	}


	public List<Tag> getAssignedShippers() {
		return assignedShippers;
	}


	public void setAssignedShippers(List<Tag> assignedShippers) {
		this.assignedShippers = assignedShippers;
	}
	@Override
	public String toString() {
		return "Document [id=" + id + ", name=" + name + ", assignedRoles=" + assignedRoles + ", assignedPrograms=" + assignedPrograms + ", assignedShippers=" + assignedShippers + "]";
	}
	 

}
