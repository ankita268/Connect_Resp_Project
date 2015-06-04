package org.nw.core.models;

import java.util.List;

public class Menu
{
    private int id;
    private String name;
    private String link;
    private List<Menu> list;

    public Menu()
    {
        super();
    }

    public Menu(int id, String name, String link, List<Menu> list)
    {
        super();
        this.id = id;
        this.name = name;
        this.link = link;
        this.list = list;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
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

    public String getLink()
    {
        return link;
    }

    public void setLink(String link)
    {
        this.link = link;
    }

    public List<Menu> getList()
    {
        return list;
    }

    public void setList(List<Menu> list)
    {
        this.list = list;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((link == null) ? 0 : link.hashCode());
        result = prime * result + ((list == null) ? 0 : list.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Menu other = (Menu) obj;
        if (id != other.id)
            return false;
        if (link == null)
        {
            if (other.link != null)
                return false;
        }
        else if (!link.equals(other.link))
            return false;
        if (list == null)
        {
            if (other.list != null)
                return false;
        }
        else if (!list.equals(other.list))
            return false;
        if (name == null)
        {
            if (other.name != null)
                return false;
        }
        else if (!name.equals(other.name))
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "Menu [id=" + id + ", name=" + name + ", link=" + link + ", list=" + list + "]";
    }

}
