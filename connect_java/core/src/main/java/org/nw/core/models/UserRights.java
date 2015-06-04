package org.nw.core.models;

public class UserRights
{
    String group;

    public UserRights(String group)
    {
        super();
        this.group = group;
    }

    public UserRights()
    {
        super();
    }

    public String getGroup()
    {
        return group;
    }

    public void setGroup(String group)
    {
        this.group = group;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((group == null) ? 0 : group.hashCode());
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
        UserRights other = (UserRights) obj;
        if (group == null)
        {
            if (other.group != null)
                return false;
        }
        else if (!group.equals(other.group))
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "UserRights [group=" + group + "]";
    }

}
