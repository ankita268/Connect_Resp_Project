package org.nw.core.models;

import java.util.List;

public class BasicInputType
{
    private String key;

    private String value;

    private List<String> valueList;

    private String sort;

    private String dir;

    public BasicInputType()
    {
        super();
    }

    public BasicInputType(String key, String value)
    {
        super();
        this.key = key;
        this.value = value;
    }

    public BasicInputType(String key, String value, String sort, String dir)
    {
        super();
        this.key = key;
        this.value = value;
        this.sort = sort;
        this.dir = dir;
    }

    public String getKey()
    {
        return key;
    }

    public void setKey(String key)
    {
        this.key = key;
    }

    public String getValue()
    {
        return value;
    }

    public void setValue(String value)
    {
        this.value = value;
    }

    public String getSort()
    {
        return sort;
    }

    public void setSort(String sort)
    {
        this.sort = sort;
    }

    public String getDir()
    {
        return dir;
    }

    public void setDir(String dir)
    {
        this.dir = dir;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((dir == null) ? 0 : dir.hashCode());
        result = prime * result + ((key == null) ? 0 : key.hashCode());
        result = prime * result + ((sort == null) ? 0 : sort.hashCode());
        result = prime * result + ((value == null) ? 0 : value.hashCode());
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
        BasicInputType other = (BasicInputType) obj;
        if (dir == null)
        {
            if (other.dir != null)
                return false;
        }
        else if (!dir.equals(other.dir))
            return false;
        if (key == null)
        {
            if (other.key != null)
                return false;
        }
        else if (!key.equals(other.key))
            return false;
        if (sort == null)
        {
            if (other.sort != null)
                return false;
        }
        else if (!sort.equals(other.sort))
            return false;
        if (value == null)
        {
            if (other.value != null)
                return false;
        }
        else if (!value.equals(other.value))
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "FilterInputType [key=" + key + ", value=" + value + ", sort=" + sort + ", dir=" + dir + "]";
    }

    public List<String> getValueList()
    {
        return valueList;
    }

    public void setValueList(List<String> valueList)
    {
        this.valueList = valueList;
    }

}
