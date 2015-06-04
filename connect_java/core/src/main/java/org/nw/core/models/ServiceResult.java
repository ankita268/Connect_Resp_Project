package org.nw.core.models;

import java.util.List;

public class ServiceResult<T> extends BaseResult
{

    private List<T> aoData;

    public List<T> getAoData()
    {
        return aoData;
    }

    public void setAoData(List<T> aoData)
    {
        this.aoData = aoData;
    }

    public ServiceResult()
    {
        super();
    }
    

    /**
     * Contructor for List type of method with pagination
     * @param aoData
     * @param errorCode
     * @param errorMessage
     */
    public ServiceResult(int total, int pageTotal, int draw, String errorCode, String errorMessage)
    {
        super(total, pageTotal, draw, errorCode, errorMessage);
    }

    /**
     * Contructor for List type of method without pagination
     * @param aoData
     * @param errorCode
     * @param errorMessage
     */
    public ServiceResult(List<T> aoData,String errorCode, String errorMessage)
    {
        super();
        super.errorCode=errorCode;
        super.errorMessage=errorMessage;
        this.aoData = aoData;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((aoData == null) ? 0 : aoData.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        ServiceResult other = (ServiceResult) obj;
        if (aoData == null)
        {
            if (other.aoData != null)
                return false;
        }
        else if (!aoData.equals(other.aoData))
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "ServiceResult [aoData=" + aoData + "]";
    }

}
