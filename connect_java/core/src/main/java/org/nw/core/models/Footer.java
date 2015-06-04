package org.nw.core.models;

import java.util.List;

public class Footer
{
    private String id;

    private String name;
    
    private String link;

    private List<SubFooter> list;

    public Footer()
    {
        super();
    }

    public Footer(String id, String name, List<SubFooter> list)
    {
        super();
        this.id = id;
        this.name = name;
        this.list = list;
    }

    public Footer(String id, String name, String link, List<SubFooter> list) {
		super();
		this.id = id;
		this.name = name;
		this.link = link;
		this.list = list;
	}

	public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public List<SubFooter> getList()
    {
        return list;
    }

    public void setList(List<SubFooter> list)
    {
        this.list = list;
    }
    
    public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

    @Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((link == null) ? 0 : link.hashCode());
		result = prime * result + ((list == null) ? 0 : list.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
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
		Footer other = (Footer) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (link == null) {
			if (other.link != null)
				return false;
		} else if (!link.equals(other.link))
			return false;
		if (list == null) {
			if (other.list != null)
				return false;
		} else if (!list.equals(other.list))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

    @Override
	public String toString() {
		return "Footer [id=" + id + ", name=" + name + ", link=" + link
				+ ", list=" + list + "]";
	}
}
