package org.nw.core.models;

public class Role
{
    private String createdby;
    private String modifiedby;
    private String business_entity_type_name;
    private String name;
    private String type;
    private String accessLevel;
    private int usersCount;
    private int groupCount;
    private String status;
    private int id;
    private String description;
    private int business_entity_type_id;
    private int groupandrole_type_id;

    public Role()
    {
        super();
    }

    public Role(String name, String type, String accessLevel, int usersCount, int groupCount, String status, int id)
    {
        super();
        this.name = name;
        this.type = type;
        this.accessLevel = accessLevel;
        this.usersCount = usersCount;
        this.groupCount = groupCount;
        this.status = status;
        this.id = id;
    }

    public Role(String createdby, String modifiedby, String business_entity_type_name, String name, String type, String accessLevel, int usersCount, int groupCount, String status, int id,
            String description, int business_entity_type_id, int groupandrole_type_id)
    {
        super();
        this.createdby = createdby;
        this.modifiedby = modifiedby;
        this.business_entity_type_name = business_entity_type_name;
        this.name = name;
        this.type = type;
        this.accessLevel = accessLevel;
        this.usersCount = usersCount;
        this.groupCount = groupCount;
        this.status = status;
        this.id = id;
        this.description = description;
        this.business_entity_type_id = business_entity_type_id;
        this.groupandrole_type_id = groupandrole_type_id;
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

    public String getBusiness_entity_type_name()
    {
        return business_entity_type_name;
    }

    public void setBusiness_entity_type_name(String business_entity_type_name)
    {
        this.business_entity_type_name = business_entity_type_name;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public String getAccessLevel()
    {
        return accessLevel;
    }

    public void setAccessLevel(String accessLevel)
    {
        this.accessLevel = accessLevel;
    }

    public int getUsersCount()
    {
        return usersCount;
    }

    public void setUsersCount(int usersCount)
    {
        this.usersCount = usersCount;
    }

    public int getGroupCount()
    {
        return groupCount;
    }

    public void setGroupCount(int groupCount)
    {
        this.groupCount = groupCount;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status)
    {
        this.status = status;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public int getBusiness_entity_type_id()
    {
        return business_entity_type_id;
    }

    public void setBusiness_entity_type_id(int business_entity_type_id)
    {
        this.business_entity_type_id = business_entity_type_id;
    }

    public int getGroupandrole_type_id()
    {
        return groupandrole_type_id;
    }

    public void setGroupandrole_type_id(int groupandrole_type_id)
    {
        this.groupandrole_type_id = groupandrole_type_id;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((accessLevel == null) ? 0 : accessLevel.hashCode());
        result = prime * result + business_entity_type_id;
        result = prime * result + ((business_entity_type_name == null) ? 0 : business_entity_type_name.hashCode());
        result = prime * result + ((createdby == null) ? 0 : createdby.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + groupCount;
        result = prime * result + groupandrole_type_id;
        result = prime * result + id;
        result = prime * result + ((modifiedby == null) ? 0 : modifiedby.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + ((type == null) ? 0 : type.hashCode());
        result = prime * result + usersCount;
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
        Role other = (Role) obj;
        if (accessLevel == null)
        {
            if (other.accessLevel != null)
                return false;
        }
        else if (!accessLevel.equals(other.accessLevel))
            return false;
        if (business_entity_type_id != other.business_entity_type_id)
            return false;
        if (business_entity_type_name == null)
        {
            if (other.business_entity_type_name != null)
                return false;
        }
        else if (!business_entity_type_name.equals(other.business_entity_type_name))
            return false;
        if (createdby == null)
        {
            if (other.createdby != null)
                return false;
        }
        else if (!createdby.equals(other.createdby))
            return false;
        if (description == null)
        {
            if (other.description != null)
                return false;
        }
        else if (!description.equals(other.description))
            return false;
        if (groupCount != other.groupCount)
            return false;
        if (groupandrole_type_id != other.groupandrole_type_id)
            return false;
        if (id != other.id)
            return false;
        if (modifiedby == null)
        {
            if (other.modifiedby != null)
                return false;
        }
        else if (!modifiedby.equals(other.modifiedby))
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
        if (usersCount != other.usersCount)
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "Role [createdby=" + createdby + ", modifiedby=" + modifiedby + ", business_entity_type_name=" + business_entity_type_name + ", name=" + name + ", type=" + type + ", accessLevel="
                + accessLevel + ", usersCount=" + usersCount + ", groupCount=" + groupCount + ", status=" + status + ", id=" + id + ", description=" + description + ", business_entity_type_id="
                + business_entity_type_id + ", groupandrole_type_id=" + groupandrole_type_id + "]";
    }

}
