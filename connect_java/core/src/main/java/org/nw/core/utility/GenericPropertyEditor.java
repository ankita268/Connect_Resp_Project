package org.nw.core.utility;

import java.beans.PropertyEditorSupport;
import java.io.IOException;

import org.apache.commons.lang.StringUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GenericPropertyEditor<T> extends PropertyEditorSupport
{
    private T obj;

    public GenericPropertyEditor(T obj)
    {
        super();
        this.obj = obj;
    }

    public GenericPropertyEditor()
    {
        super();
    }

    @Override
    public String getAsText()
    {
        return obj.toString();

    }

    /*
     * (non-Javadoc)
     * @see java.beans.PropertyEditorSupport#setAsText(java.lang.String)
     */
    @Override
    public void setAsText(String text) throws IllegalArgumentException
    {
        ObjectMapper objMapper = new ObjectMapper();
        try
        {
            if (!StringUtils.isEmpty(text))
            {
                obj = (T) objMapper.readValue(text, obj.getClass());
            }

        }
        
        catch (IOException e)
        {
            e.printStackTrace();
        }
        finally
        {
            setValue(obj);
        }
    }

    /*
     * (non-Javadoc)
     * @see java.beans.PropertyEditorSupport#setValue(java.lang.Object)
     */
    @Override
    public void setValue(Object value)
    {
        super.setValue(value);
    }
}