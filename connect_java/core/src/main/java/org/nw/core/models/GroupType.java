package org.nw.core.models;

import java.util.Date;

public class GroupType
{
    private String createdby;
    private String modifiedby;
    private String description;
    private Date createddatetime;
    private Date modifieddatetime;
    private Integer group_type_id;
    private Integer id;
    private Integer usersCount;
    private String status;
    private String type;
    private String name;

    public GroupType(String createdby, String modifiedby, String description, Date createddatetime, Date modifieddatetime, Integer group_type_id, Integer id, Integer usersCount, String status,
            String type, String name)
    {
        super();
        this.createdby = createdby;
        this.modifiedby = modifiedby;
        this.description = description;
        this.createddatetime = createddatetime;
        this.modifieddatetime = modifieddatetime;
        this.group_type_id = group_type_id;
        this.id = id;
        this.usersCount = usersCount;
        this.status = status;
        this.type = type;
        this.name = name;
    }

    public GroupType()
    {
        super();
    }

    public String getCreatedby()
    {
        return createdby;
    }

    public void setCreatedby(String createdby)
    {
        this.createdby = createdby;
    }

    public String getModifiedby()
    {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby)
    {
        this.modifiedby = modifiedby;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public Date getCreateddatetime()
    {
        return createddatetime;
    }

    public void setCreateddatetime(Date createddatetime)
    {
        this.createddatetime = createddatetime;
    }

    public Date getModifieddatetime()
    {
        return modifieddatetime;
    }

    public void setModifieddatetime(Date modifieddatetime)
    {
        this.modifieddatetime = modifieddatetime;
    }

    public Integer getGroup_type_id()
    {
        return group_type_id;
    }

    public void setGroup_type_id(Integer group_type_id)
    {
        this.group_type_id = group_type_id;
    }

    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public Integer getUsersCount()
    {
        return usersCount;
    }

    public void setUsersCount(Integer usersCount)
    {
        this.usersCount = usersCount;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status)
    {
        this.status = status;
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((createdby == null) ? 0 : createdby.hashCode());
        result = prime * result + ((createddatetime == null) ? 0 : createddatetime.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((group_type_id == null) ? 0 : group_type_id.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((modifiedby == null) ? 0 : modifiedby.hashCode());
        result = prime * result + ((modifieddatetime == null) ? 0 : modifieddatetime.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + ((type == null) ? 0 : type.hashCode());
        result = prime * result + ((usersCount == null) ? 0 : usersCount.hashCode());
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
        GroupType other = (GroupType) obj;
        if (createdby == null)
        {
            if (other.createdby != null)
                return false;
        }
        else if (!createdby.equals(other.createdby))
            return false;
        if (createddatetime == null)
        {
            if (other.createddatetime != null)
                return false;
        }
        else if (!createddatetime.equals(other.createddatetime))
            return false;
        if (description == null)
        {
            if (other.description != null)
                return false;
        }
        else if (!description.equals(other.description))
            return false;
        if (group_type_id == null)
        {
            if (other.group_type_id != null)
                return false;
        }
        else if (!group_type_id.equals(other.group_type_id))
            return false;
        if (id == null)
        {
            if (other.id != null)
                return false;
        }
        else if (!id.equals(other.id))
            return false;
        if (modifiedby == null)
        {
            if (other.modifiedby != null)
                return false;
        }
        else if (!modifiedby.equals(other.modifiedby))
            return false;
        if (modifieddatetime == null)
        {
            if (other.modifieddatetime != null)
                return false;
        }
        else if (!modifieddatetime.equals(other.modifieddatetime))
            return false;
        if (name == null)
        {
            if (other.name != null)
                return false;
        }
        else if (!name.equals(other.name))
            return false;
        if (status == null)
        {
            if (other.status != null)
                return false;
        }
        else if (!status.equals(other.status))
            return false;
        if (type == null)
        {
            if (other.type != null)
                return false;
        }
        else if (!type.equals(other.type))
            return false;
        if (usersCount == null)
        {
            if (other.usersCount != null)
                return false;
        }
        else if (!usersCount.equals(other.usersCount))
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "GroupType [createdby=" + createdby + ", modifiedby=" + modifiedby + ", description=" + description + ", createddatetime=" + createddatetime + ", modifieddatetime=" + modifieddatetime
                + ", group_type_id=" + group_type_id + ", id=" + id + ", usersCount=" + usersCount + ", status=" + status + ", type=" + type + ", name=" + name + "]";
    }

}
