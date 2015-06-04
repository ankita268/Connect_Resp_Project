package org.nw.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.nw.core.models.BaseTableInput;
import org.nw.core.models.BasicInputType;
import org.nw.core.models.Cust360UIException;
import org.nw.core.models.Document;
import org.nw.core.models.ManageNominationPeriod;
import org.nw.core.models.ServiceResult;
import org.nw.core.models.SortedPage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping(value = "/nominationperiod")
public class NominationperiodController {
	
	private static final Logger logger = LoggerFactory.getLogger(NominationController.class);
	private static final int PAGE_TOTAL = 20;

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<ManageNominationPeriod> getList(@RequestParam Map<String, Object> params)
    {
        int pageSize = params.containsKey("length") ? Integer.valueOf(String.valueOf(params.get("length"))) :  PAGE_TOTAL;
        int start = params.containsKey("start") ? Integer.valueOf(String.valueOf(params.get("start"))) : 0;
        int draw = params.containsKey("draw") ? Integer.valueOf(String.valueOf(params.get("draw"))) : 1;
        @SuppressWarnings("unused")
        Map<String, List<String>> filterMap = new HashMap<String, List<String>>();
        if (params.containsKey("filter"))
        {
            String searchJsonString = params.get("filter").toString();
            filterMap = getSearchMap(searchJsonString);
        }
        List<ManageNominationPeriod> finalNominationList =  getNominationPeriodData();
         
        ServiceResult<ManageNominationPeriod> serviceResult = new ServiceResult<ManageNominationPeriod>(finalNominationList.size(), pageSize, draw++, "0", "");
        try
        {
            Map<String, Object> sortParams = new HashMap<String, Object>();
            sortParams.put("start", start);
            sortParams.put("limit", pageSize);
            SortedPage<ManageNominationPeriod> sortedList = new SortedPage<ManageNominationPeriod>(finalNominationList, sortParams);
            serviceResult.setAoData(sortedList.getList());
        }
        catch (Cust360UIException e)
        {
            logger.info("Nomination list service returning data.." + e.getErrorMessage());
            serviceResult = new ServiceResult<ManageNominationPeriod>(0, pageSize, draw++, "0", "");
        }
        logger.info("Nomination list service returning data..");
        return serviceResult;
    }
    
    @RequestMapping(value = "/period", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<ManageNominationPeriod> allList(@RequestParam Map<String, Object> params)
    {
        
        List<ManageNominationPeriod> finalNominationList = getNominationPeriodData();
        
        ServiceResult<ManageNominationPeriod> serviceResult = new ServiceResult<ManageNominationPeriod>(finalNominationList.size(), 10, 1, "0", "");
       
         serviceResult.setAoData(finalNominationList);
        
        logger.info("Nomination list service returning data..");
        return serviceResult;
    }
    
    public List<ManageNominationPeriod> getNominationPeriodData()
    {
        List<ManageNominationPeriod> nominationList = new ArrayList<ManageNominationPeriod>();
        nominationList.add(new ManageNominationPeriod("000020", "January' 2015", "Lock"));
        nominationList.add(new ManageNominationPeriod("000019", "February' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000018", "March' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000017", "April' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000016", "May' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000015", "June' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000014", "July' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000013", "August' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000012", "September' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000011", "October' 2015", "Unlock"));
        nominationList.add(new ManageNominationPeriod("000010", "November' 2015", "Lock"));
        nominationList.add(new ManageNominationPeriod("000009", "December' 2015", "Lock"));
        nominationList.add(new ManageNominationPeriod("000008", "January' 2016", "Lock"));
        nominationList.add(new ManageNominationPeriod("000007", "February' 2016", "Lock"));
        nominationList.add(new ManageNominationPeriod("000006", "March' 2016", "Lock"));       
       
        return nominationList;
    }
    
    public Map<String, List<String>> getSearchMap(String searchJsonString)
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
    
    @RequestMapping(value = "/state", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<ManageNominationPeriod> state(@RequestParam Map<String, Object> params, @RequestBody BaseTableInput listParams )
    {
        int start = params.containsKey("start") ? Integer.valueOf(String.valueOf(params.get("start"))) : 10;
        int draw = params.containsKey("draw") ? Integer.valueOf(String.valueOf(params.get("draw"))) : 1;
       
        List<ManageNominationPeriod> nominationList = new ArrayList<ManageNominationPeriod>();
        List<ManageNominationPeriod> finalNominationList = new ArrayList<ManageNominationPeriod>();
        if (nominationList.isEmpty())
        {	
            String status=listParams.getStatus();
            nominationList.remove(new ManageNominationPeriod(listParams.getId(), "APRIL' 2015", status));
            
            if(status.equals("unlock"))
            	status="lock";
            else
            	status="unlock";            
            
            nominationList.add(new ManageNominationPeriod(listParams.getId(), "APRIL' 2015", status));
            
        }
        finalNominationList.addAll(nominationList);
        ServiceResult<ManageNominationPeriod> serviceResult = new ServiceResult<ManageNominationPeriod>(finalNominationList.size(), 10, draw++, "0", "");
        try
        {
            Map<String, Object> sortParams = new HashMap<String, Object>();
            sortParams.put("start", start);
            sortParams.put("limit", listParams.getPageSize());
            SortedPage<ManageNominationPeriod> sortedList = new SortedPage<ManageNominationPeriod>(finalNominationList, sortParams);
            serviceResult.setAoData(sortedList.getList());
        }
        catch (Cust360UIException e)
        {
            logger.info("Nomination list service returning data.." + e.getErrorMessage());
        }
        logger.info("Nomination list service returning data..");
        return serviceResult;
    }
    
    @RequestMapping(value = "/type", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<String> getTypes(@RequestParam Map<String, Object> params)
    {
        List<String> typeList = new ArrayList<String>();
        logger.debug("Nominationperiod list service started.");
        typeList.add("Unlock");
        typeList.add("Lock");
        ServiceResult<String> serviceResult = new ServiceResult<String>();
        serviceResult.setAoData(typeList);
        return serviceResult;
    }
}
