package org.nw.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.nw.core.models.BaseResult;
import org.nw.core.models.BaseTableInput;
import org.nw.core.models.BasicInputType;
import org.nw.core.models.BasicServiceResult;
import org.nw.core.models.Cust360UIException;
import org.nw.core.models.ErrorProcessor;
import org.nw.core.models.ManageNominationPeriod;
import org.nw.core.models.NominationChangeLog;
import org.nw.core.models.NominationType;
import org.nw.core.models.Program;
import org.nw.core.models.ServiceResult;
import org.nw.core.models.SortedPage;
import org.nw.core.models.UIErrorMessages;
import org.nw.core.utilities.CommonFunctions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/nomination")
public class NominationController
{
    private static final Logger logger = LoggerFactory.getLogger(NominationController.class);
    private static final String LOCATION = "NominationsController";
    
    @RequestMapping(value = "/getList", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<NominationType> getList(@RequestParam Map<String, Object> params)
    {
        int pageSize = params.containsKey("length") ? Integer.valueOf(String.valueOf(params.get("length"))) : 10;
        int start = params.containsKey("start") ? Integer.valueOf(String.valueOf(params.get("start"))) : 10;
        int draw = params.containsKey("draw") ? Integer.valueOf(String.valueOf(params.get("draw"))) : 1;
        List<NominationType> nominationList = new ArrayList<NominationType>();
        List<NominationType> finalNominationList = new ArrayList<NominationType>();
        if (nominationList.isEmpty())
        {
            nominationList = getNominationData();
        }
        finalNominationList.addAll(nominationList);
        ServiceResult<NominationType> serviceResult = new ServiceResult<NominationType>(finalNominationList.size(), 10, draw++, "0", "");
        try
        {
            Map<String, Object> sortParams = new HashMap<String, Object>();
            sortParams.put("start", start);
            sortParams.put("limit", pageSize);
            SortedPage<NominationType> sortedList = new SortedPage<NominationType>(finalNominationList, sortParams);
            serviceResult.setAoData(sortedList.getList());
        }
        catch (Cust360UIException e)
        {
            logger.info("Nomination list service returning data.." + e.getErrorMessage());
        }
        logger.info("Nomination list service returning data..");
        return serviceResult;
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<NominationType> list(@RequestBody BaseTableInput listParams)
    {
        List<NominationType> nominationList = new ArrayList<NominationType>();
        int pageSize = listParams.getPageSize();
        int draw = listParams.getCurrentPage();
        int start = (pageSize * draw) - pageSize;

        @SuppressWarnings("unused")
        Map<String, List<String>> filterMap = new HashMap<String, List<String>>();
        if (CollectionUtils.isNotEmpty(listParams.getFilter()))
        {
            filterMap = CommonFunctions.getSearchMap(listParams.getFilter());
        }

        if (nominationList.isEmpty())
        {
            nominationList = getNominationData();
        }

        ServiceResult<NominationType> serviceResult = new ServiceResult<NominationType>(nominationList.size(), 10, draw, "0", "");
        try
        {
            Map<String, Object> sortParams = new HashMap<String, Object>();
            sortParams.put("start", start);
            sortParams.put("limit", pageSize);
            SortedPage<NominationType> sortedList = new SortedPage<NominationType>(nominationList, sortParams);
            serviceResult.setAoData(sortedList.getList());
            serviceResult.setTotal(nominationList.size());
        }
        catch (Cust360UIException e)
        {
            logger.info("Nomination list service returning data.." + e.getErrorMessage());
        }
        return serviceResult;
    }

    public List<NominationType> getNominationData()
    {
        List<NominationType> nominationList = new ArrayList<NominationType>();
        nominationList.add(new NominationType("000020", "New", "Shipper1", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
        nominationList.add(new NominationType("000019", "Deleted", "Shipper2", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
        nominationList.add(new NominationType("000018", "Accepted", "Shipper3", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
        nominationList.add(new NominationType("000017", "Rejected", "Shipper4", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
        nominationList.add(new NominationType("000016", "Modified", "Shipper5", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
        nominationList.add(new NominationType("000020", "New", "Shipper1", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "MARCH' 2015", "unlock", true));
        nominationList.add(new NominationType("000019", "Deleted", "Shipper2", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "MARCH' 2015", "unlock", true));
        nominationList.add(new NominationType("000018", "Accepted", "Shipper3", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "MARCH' 2015", "unlock", true));
        nominationList.add(new NominationType("000017", "Rejected", "Shipper4", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "MARCH' 2015", "unlock", true));
        nominationList.add(new NominationType("000016", "Modified", "Shipper5", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "MARCH' 2015", "unlock", true));
        nominationList.add(new NominationType("000020", "New", "Shipper1", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "FEBRUARY' 2015", "unlock", true));
        nominationList.add(new NominationType("000019", "Deleted", "Shipper2", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "FEBRUARY' 2015", "unlock", true));
        nominationList.add(new NominationType("000018", "Accepted", "Shipper3", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "FEBRUARY' 2015", "unlock", true));
        nominationList.add(new NominationType("000017", "Rejected", "Shipper4", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "FEBRUARY' 2015", "unlock", true));
        nominationList.add(new NominationType("000016", "Modified", "Shipper5", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                "35000.00", "Mega Corp", "FEBRUARY' 2015", "unlock", true));
        return nominationList;
    }

    @RequestMapping(value = "/uploadXls", method = RequestMethod.POST)
    public @ResponseBody Map<String, String> uploadXls(HttpServletRequest request, @RequestParam Map<String, Object> params)
    {
        if (request instanceof MultipartRequest)
        {
            MultipartFile file = ((MultipartRequest) request).getFile("file");
            System.out.println("Uploaded File name is " + file.getOriginalFilename());

        }
        Map<String, String> uploadNomination = new HashMap<String, String>();
        uploadNomination.put("success", "true");
        uploadNomination.put("message", "Document Created successfully");
        return uploadNomination;
    }

    @RequestMapping(value = "/download", method = RequestMethod.POST)
    public ModelAndView downloadXls(HttpServletRequest request, @RequestParam Map<String, ? extends Object> params)
    {
        System.out.println("download file call");

        Map<String, Object> searchResultList = new HashMap<String, Object>();

        List<NominationType> nominationList = new ArrayList<NominationType>();

        nominationList = getNominationData();

        searchResultList.put("data", nominationList);

        searchResultList.put("fileName", "Nomination");

        searchResultList.put("success", "true");

        searchResultList.put("errorMessage", "");

        searchResultList.put("total", nominationList.size());

        searchResultList.put("messages", "");

        return new ModelAndView("ExcelReport", "data", searchResultList);
    }

    @RequestMapping(value = "/view", method = RequestMethod.POST)
    public @ResponseBody BasicServiceResult<NominationType> get(HttpServletRequest request,@RequestBody NominationType nominationType)
    {

        String id = nominationType.getId();

        System.out.println("id : " + id);

        List<NominationType> nominationList = new ArrayList<NominationType>();
        List<NominationType> finalNominationList = new ArrayList<NominationType>();
        
        if (nominationList.isEmpty())
        {
            if (null != id && id.equals("19"))
            {
                nominationList.add(new NominationType("000020", "Deleted", "Shipper1", "recLocation1", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "delLocation1",
                        "Big Oil Co", "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
            }
            else if (null != id && id.equals("20"))
            {
                nominationList.add(new NominationType("000020", "New", "Shipper1", "recLocation2", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "delLocation2",
                        "Big Oil Co", "35000.00", "Mega Corp", "APRIL' 2015", "unlock", false));
            }
            else if (null != id && id.equals("18"))
            {
                nominationList.add(new NominationType("000020", "Accepted", "Shipper1", "recLocation3", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "delLocation3",
                        "Big Oil Co", "35000.00", "Mega Corp", "APRIL' 2015", "lock", true));
            }
            else if (null != id && id.equals("17"))
            {
                nominationList.add(new NominationType("000020", "Rejected", "Shipper1", "recLocation6", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "delLocation5",
                        "Big Oil Co", "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
            }
            else
            {
                nominationList.add(new NominationType("000020", "Rejected", "Shipper1", "recLocation4", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "delLocation6",
                        "Big Oil Co", "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
            }
        }
        finalNominationList.addAll(nominationList);
        BasicServiceResult<NominationType> result = new BasicServiceResult<NominationType>();
       
        result.setResult(finalNominationList.get(0));

        logger.info("Nomination list service returning data..");
        return result;

    }

    @RequestMapping(value = "/changelog", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<NominationChangeLog> changelog(@RequestBody NominationType nominationType)
    {
    	/*int pageSize = listParams.getPageSize();
        int draw = listParams.getCurrentPage();
        int start = (pageSize * draw) - pageSize;*/
    	String nominationId=nominationType.getId();
    	String nominationperiod=nominationType.getPeriod();

        List<NominationChangeLog> nominationChangeLogList = new ArrayList<NominationChangeLog>();
        if (nominationChangeLogList.isEmpty())
        {
            nominationChangeLogList.add(new NominationChangeLog("05/10/2015", "john Doe", "Commited BPD", "1000.00", "12000"));
            nominationChangeLogList.add(new NominationChangeLog("05/11/2015", "john Doe", "Line Fill", "500.00", "2000"));
            nominationChangeLogList.add(new NominationChangeLog("05/12/2015", "john Doe", "Commited BPD", "15000.00", "12000"));
            nominationChangeLogList.add(new NominationChangeLog("05/13/2015", "john Doe", "Delivert Location", "1000.00", "12000"));
        }
        ServiceResult<NominationChangeLog> serviceResult = new ServiceResult<NominationChangeLog>();
        serviceResult.setAoData(nominationChangeLogList);
        return serviceResult;
    }

  

    @RequestMapping(value = "/receiptLocation", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<BasicInputType> getReceiptLocation(@RequestParam Map<String, Object> params)
    {
        List<BasicInputType> receiptLocationList = new ArrayList<BasicInputType>();
        logger.debug("ReceiptLocation list service started.");
        receiptLocationList.add(new BasicInputType("Rec. Location1", "recLocation1"));
        receiptLocationList.add(new BasicInputType("Rec. Location2", "recLocation2"));
        receiptLocationList.add(new BasicInputType("Rec. Location3", "recLocation3"));
        receiptLocationList.add(new BasicInputType("Rec. Location4", "recLocation4"));
        receiptLocationList.add(new BasicInputType("Rec. Location5", "recLocation5"));
        receiptLocationList.add(new BasicInputType("Rec. Location6", "recLocation6"));
        ServiceResult<BasicInputType> serviceResult = new ServiceResult<BasicInputType>();
        serviceResult.setAoData(receiptLocationList);
        return serviceResult;
    }

    @RequestMapping(value = "/deliverylocation", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<BasicInputType> getDeliveryLocationLocation(@RequestParam Map<String, Object> params)
    {
        List<BasicInputType> receiptLocationList = new ArrayList<BasicInputType>();
        logger.debug("DeliveryLocation list service started.");
        receiptLocationList.add(new BasicInputType("Del. Location1", "delLocation1"));
        receiptLocationList.add(new BasicInputType("Del. Location2", "delLocation2"));
        receiptLocationList.add(new BasicInputType("Del. Location3", "delLocation3"));
        receiptLocationList.add(new BasicInputType("Del. Location4", "delLocation4"));
        receiptLocationList.add(new BasicInputType("Del. Location5", "delLocation5"));
        receiptLocationList.add(new BasicInputType("Del. Location6", "delLocation6"));
        ServiceResult<BasicInputType> serviceResult = new ServiceResult<BasicInputType>();
        serviceResult.setAoData(receiptLocationList);
        return serviceResult;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody Map<String, String> createNomination(NominationType nomination)
    {
        Map<String, String> createNomination = new HashMap<String, String>();

        System.out.println(nomination.toString());

        createNomination.put("success", "true");
        createNomination.put("message", "Nomination Created successfully");
        return createNomination;
    }

    /*@RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody Map<String, String> updateNomination(@RequestBody NominationType nomination)
    {
        Map<String, String> updateNomination = new HashMap<String, String>();

        System.out.println(nomination.toString());

        updateNomination.put("success", "true");
        updateNomination.put("message", "Nomination Created successfully");
        return updateNomination;
    }*/

    @SuppressWarnings("unused")
	@RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody BasicServiceResult<String> update(@RequestBody NominationType nominationType) 
    {   
		BasicServiceResult<String> result = new BasicServiceResult<String>();
		
		try{
			result.setErrorCode(BaseResult.SUCCESS);
			if(result==null){
				throw new Cust360UIException(new Exception(),LOCATION,"update",null, UIErrorMessages.BX_DB_FAILURE);
			}
		} catch(Exception e){
			result =  new BasicServiceResult<String>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_NORECORDS);
			ErrorProcessor.processAppError(e, LOCATION, "getPrograms()");
		}
	       
	    return result;
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

    @RequestMapping(value = "/type", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<String> getTypes(@RequestParam Map<String, Object> params)
    {
        List<String> typeList = new ArrayList<String>();
        logger.debug("Statement list service started.");
        typeList.add("Unlock");
        typeList.add("Lock");
        ServiceResult<String> serviceResult = new ServiceResult<String>();
        serviceResult.setAoData(typeList);
        return serviceResult;
    }

    @RequestMapping(value = "/shipper", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<String> getShipperList(@RequestParam Map<String, Object> params)
    {
        List<String> shipperList = new ArrayList<String>();
        logger.debug("Statement list service started.");
        shipperList.add("Shipper 1");
        shipperList.add("Shipper 2");
        shipperList.add("Shipper 3");
        ServiceResult<String> serviceResult = new ServiceResult<String>();
        serviceResult.setAoData(shipperList);
        return serviceResult;
    }
    
    @RequestMapping(value = "/status", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<String> getStatus(@RequestParam Map<String, Object> params)
    {
        List<String> statiusList = new ArrayList<String>();
        statiusList.add("New or Modified");
        statiusList.add("Rejected");
        statiusList.add("Accepted");
        statiusList.add("Deleted");
        ServiceResult<String> serviceResult = new ServiceResult<String>();
        serviceResult.setAoData(statiusList);
        return serviceResult;
    }
    
    @RequestMapping(value = "/reject", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<NominationType> rejected(@RequestBody NominationType nominationType)
    {
    	String id = new String(nominationType.getId());

        List<NominationType> nominationList = new ArrayList<NominationType>();
        List<NominationType> finalNominationList = new ArrayList<NominationType>();
        if (nominationList.isEmpty())
        {

            nominationList.add(new NominationType("000020", "Rejected", "Shipper1", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                    "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
        }

        finalNominationList.addAll(nominationList);
        ServiceResult<NominationType> serviceResult = new ServiceResult<NominationType>(finalNominationList.size(), 1, 0, "0", "");

        serviceResult.setAoData(finalNominationList);

        logger.info("Nomination list service returning data..");
        return serviceResult;

    }

    @RequestMapping(value = "/accept", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<NominationType> accepted(@RequestBody NominationType nominationType)
    {
        String id = new String(nominationType.getId());

        System.out.println("id : " + id);

        List<NominationType> nominationList = new ArrayList<NominationType>();
        List<NominationType> finalNominationList = new ArrayList<NominationType>();
        if (nominationList.isEmpty())
        {

            nominationList.add(new NominationType("000020", "Accepted", "Shipper1", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                    "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
        }

        finalNominationList.addAll(nominationList);
        ServiceResult<NominationType> result = new ServiceResult<NominationType>(finalNominationList.size(), 1, 0, "0", "");

        result.setAoData(finalNominationList);

        logger.info("Nomination list service returning data..");
        return result;

    }
}
