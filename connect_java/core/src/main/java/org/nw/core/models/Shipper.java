package org.nw.core.models;

public class Shipper
{ 
    private int id;
    private String name;
    
 
    public Shipper(int id, String name)
    {
        super();
        this.name = name;
        this.id = id;
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

     

}
