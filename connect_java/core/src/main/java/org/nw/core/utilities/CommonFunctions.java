package org.nw.core.utilities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.nw.core.models.BaseValue;
import org.nw.core.models.BasicInputType;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CommonFunctions
{
    public static Map<String, List<String>> getSearchMap(String searchJsonString)
    {
        List<BasicInputType> searchParamList = new ArrayList<BasicInputType>();
        Map<String, List<String>> searchParamMap = new HashMap<String, List<String>>();
        ObjectMapper mapper = new ObjectMapper();

        try
        {
            // convert JSON string to List
            searchParamList = mapper.readValue(searchJsonString, new TypeReference<List<BasicInputType>>()
                {
                });

            for (BasicInputType filter : searchParamList)
            {
                if (searchParamMap.containsKey(filter.getKey()))
                {
                    List<String> valueList = searchParamMap.get(filter.getKey());
                    valueList.add(filter.getValue());
                    searchParamMap.put(filter.getKey(), valueList);
                }
                else
                {
                    List<String> valueList = new ArrayList<String>();
                    valueList.add(filter.getValue());
                    searchParamMap.put(filter.getKey(), valueList);
                }
            }

        }
        catch (Exception e)
        {
            return searchParamMap;
        }
        return searchParamMap;
    }

    public static Map<String, List<String>> getSearchMap(List<BaseValue> paramList)
    {
        Map<String, List<String>> searchParamMap = new HashMap<String, List<String>>();

        try
        {
            for (BaseValue filter : paramList)
            {
                if (searchParamMap.containsKey(filter.getKey()))
                {
                    List<String> valueList = searchParamMap.get(filter.getKey());
                    valueList.add(filter.getValue());
                    searchParamMap.put(filter.getKey(), valueList);
                }
                else
                {
                    List<String> valueList = new ArrayList<String>();
                    valueList.add(filter.getValue());
                    searchParamMap.put(filter.getKey(), valueList);
                }
            }

        }
        catch (Exception e)
        {
            return searchParamMap;
        }
        return searchParamMap;
    }

    public static Map<String, String> getSortMap(String searchJsonString)
    {
        List<BasicInputType> searchParamList = new ArrayList<BasicInputType>();
        Map<String, String> searchParamMap = new HashMap<String, String>();
        ObjectMapper mapper = new ObjectMapper();
        try
        {
            // convert JSON string to List
            searchParamList = mapper.readValue(searchJsonString, new TypeReference<List<BasicInputType>>()
                {
                });
            for (BasicInputType filter : searchParamList)
            {
                searchParamMap.put(filter.getSort(), filter.getDir());
            }
        }
        catch (Exception e)
        {
            return searchParamMap;
        }
        return searchParamMap;
    }
}
