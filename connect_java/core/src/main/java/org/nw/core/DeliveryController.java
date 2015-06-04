package org.nw.core;

import java.text.DateFormatSymbols;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.nw.core.models.BaseResult;
import org.nw.core.models.BasicServiceResult;
import org.nw.core.models.Cust360UIException;
import org.nw.core.models.Delivery;
import org.nw.core.models.DeliveryUpdateList;
import org.nw.core.models.ServiceResult;
import org.nw.core.models.SortedPage;
import org.nw.core.utilities.CommonFunctions;
import org.nw.core.utility.GenericPropertyEditor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/delivery")
public class DeliveryController
{
    private static final Logger logger = LoggerFactory.getLogger(NominationController.class);
    
    private static final int draw = 1;
    
    private static final int PAGE_SIZE = 20;
    
    private static final String LENGTH = "length";

    private static final String START = "start";

    private static final String DRAW = "draw";
    
    
    @InitBinder
   	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder)
    {
    	binder.registerCustomEditor(Delivery.class, new GenericPropertyEditor<Delivery>(new Delivery()));
    	binder.registerCustomEditor(DeliveryUpdateList.class, new GenericPropertyEditor<DeliveryUpdateList>(new DeliveryUpdateList()));
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<Delivery> list(@RequestParam Map<String, Object> params)
    {
        
    	List<Delivery> deliveryList = new ArrayList<Delivery>();
    	
    	logger.debug("Pipeline Delivery list service started.");
    	
    	int pageSize = params.containsKey(LENGTH) ? Integer.valueOf(String.valueOf(params.get(LENGTH))) : PAGE_SIZE;
        int start = params.containsKey(START) ? Integer.valueOf(String.valueOf(params.get(START))) : 0;
        int draw = params.containsKey(DRAW) ? Integer.valueOf(String.valueOf(params.get(DRAW))) : 1;
        
        Map<String, List<String>> filterMap = new HashMap<String, List<String>>();
        if (params.containsKey("filter"))
        {
            String searchJsonString = params.get("filter").toString();
            filterMap = CommonFunctions.getSearchMap(searchJsonString);
        }
        
        if (deliveryList.isEmpty())
        {
        	deliveryList = getDeliveryListData(1, "", "");
        }

        ServiceResult<Delivery> serviceResult = new ServiceResult<Delivery>(deliveryList.size(), pageSize, draw++, BaseResult.SUCCESS, "");
        try {
			Map<String, Object> sortParams = new HashMap<String, Object>();
			sortParams.put("start", start);
			sortParams.put("limit", pageSize);
			SortedPage<Delivery> sortedList = new SortedPage<Delivery>(deliveryList, sortParams);
			serviceResult.setAoData(sortedList.getList());
		} catch (Cust360UIException e) {
			logger.error("Delivery list service returning data.." + e.getErrorMessage());
		}

        return serviceResult;
    }

    @RequestMapping(value = "/downloadPdf", method = RequestMethod.POST)
    public ModelAndView downloadPDF(@RequestParam Map<String, Object> params)
    {
        Map<String, Object> searchResultList = new HashMap<String, Object>();
        String periodMonth = params.containsKey("periodMonth") ? String.valueOf(params.get("periodMonth")) : "";
        String periodYear = params.containsKey("periodYear") ? String.valueOf(params.get("periodYear")) : "";
        String carrierID = params.containsKey("carrierID") ? String.valueOf(params.get("carrierID")) : "";

        List<Delivery> deliveryList = new ArrayList<Delivery>();

        if (deliveryList.isEmpty())
        {
        	deliveryList = getDeliveryListData(0, periodMonth, periodYear); 
        }
        searchResultList.put("data", deliveryList);
        searchResultList.put("fileName", "DeliveryStatement");
        searchResultList.put("success", "true");
        searchResultList.put("errorMessage", "");
        searchResultList.put("total", deliveryList.size());
        searchResultList.put("messages", "");

        return new ModelAndView("PdfReport", "data", searchResultList);
    }
    
    @RequestMapping(value = "/period", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<String> getPeriod(@RequestParam Map<String, Object> params)
    {
        List<String> periodList = new ArrayList<String>();
        logger.debug("Period list service started.");
        periodList.add("January, 2015");
        periodList.add("February, 2015");
        periodList.add("March, 2015");
        periodList.add("April, 2015");
        periodList.add("May, 2015");
        periodList.add("June, 2015");
        periodList.add("July, 2015");
        periodList.add("August, 2015");
        periodList.add("September, 2015");
        periodList.add("October, 2015");
        periodList.add("November, 2015");
        periodList.add("December, 2015");
        ServiceResult<String> serviceResult = new ServiceResult<String>(periodList.size(), 0, 0, BaseResult.SUCCESS, "Some problem while getting period list for filter.");
        serviceResult.setAoData(periodList);
        return serviceResult;
    }

    @RequestMapping(value = "/type", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<String> getTypes(@RequestParam Map<String, Object> params)
    {
        List<String> typeList = new ArrayList<String>();
        logger.debug("Type list service started.");
        typeList.add("Unlock");
        typeList.add("Lock");
        ServiceResult<String> serviceResult = new ServiceResult<String>(typeList.size(), 0, 0, BaseResult.SUCCESS, "Some problem while getting type list for filter.");
        serviceResult.setAoData(typeList);
        return serviceResult;
    }

    @RequestMapping(value = "/carrierList", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<String> getCarrierList(@RequestParam Map<String, Object> params)
    {
        List<String> carrierList = new ArrayList<String>();
        logger.debug("Carrier list service started.");
        carrierList.add("Carrier 1");
        carrierList.add("Carrier 2");
        carrierList.add("Carrier 3");
        carrierList.add("Carrier 4");
        ServiceResult<String> serviceResult = new ServiceResult<String>(carrierList.size(), 0, 0, BaseResult.SUCCESS, "Some problem while getting carrier list for filter.");
        serviceResult.setAoData(carrierList);
        return serviceResult;
    }
    
    @RequestMapping(value = "/view", method = RequestMethod.POST)
    public @ResponseBody BasicServiceResult<DeliveryUpdateList> viewPeriod(@RequestBody  DeliveryUpdateList deliveryUpdateList)
    {
    	//Below lines are just to resolve month name.
    	String mnthName = getMonthName(deliveryUpdateList.getPeriodMonth(), deliveryUpdateList.getPeriodYear());
    	
    	deliveryUpdateList.setPeriod(mnthName);
    	deliveryUpdateList.setCarrier("Carrier "+deliveryUpdateList.getCarrierID());
    	
    	List<Delivery> deliveryList = new ArrayList<Delivery>();

        if (deliveryList.isEmpty())
        {
        	deliveryList = getDeliveryListData(0, deliveryUpdateList.getPeriodMonth(), deliveryUpdateList.getPeriodYear());
        }
        deliveryUpdateList.setDataList(deliveryList);
        BasicServiceResult<DeliveryUpdateList> baseServiceResult = new BasicServiceResult<DeliveryUpdateList>(deliveryUpdateList, BaseResult.SUCCESS, "Some problem while getting data..");

        return baseServiceResult;
    }
    
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody BasicServiceResult<DeliveryUpdateList>  update(@RequestBody  DeliveryUpdateList deliveryUpdateList)
    {
    	BasicServiceResult<DeliveryUpdateList> baseServiceResult = new BasicServiceResult<DeliveryUpdateList>(null, BaseResult.SUCCESS, "Some problem while updating carrier period.");
        return baseServiceResult;
    }
    
    /*This method is to resolve month name and year*/
    private String getMonthName(String month, String year) {
    	//Just to resolve month name
    	String[] monthArray = new DateFormatSymbols().getMonths();
		int month1 = Integer.parseInt(month);
		String display = monthArray[month1-1]+" "+year;
		return display;
    }
    
    private List<Delivery> getDeliveryListData(int i, String periodMonth, String periodYear)
    {
    	List<Delivery> deliveryList = new ArrayList<Delivery>();
        if(i == 1) {
        	deliveryList.add(new Delivery("04","2015","Carrier1", 1, "April 2015"));
            deliveryList.add(new Delivery("04","2015","Carrier2", 2, "April 2015"));
            deliveryList.add(new Delivery("04","2015","Carrier3", 3, "April 2015"));
            deliveryList.add(new Delivery("04","2015","Carrier4", 4, "April 2015"));
            deliveryList.add(new Delivery("03","2015","Carrier1", 1, "March 2015"));
            deliveryList.add(new Delivery("03","2015","Carrier2", 2, "March 2015"));
            deliveryList.add(new Delivery("03","2015","Carrier3", 3, "March 2015"));
            deliveryList.add(new Delivery("03","2015","Carrier4", 4, "March 2015"));
            deliveryList.add(new Delivery("02","2015","Carrier1", 1, "February 2015"));
            deliveryList.add(new Delivery("02","2015","Carrier2", 2, "February 2015"));
            deliveryList.add(new Delivery("02","2015","Carrier3", 3, "February 2015"));
            deliveryList.add(new Delivery("02","2015","Carrier4", 4, "February 2015"));
            deliveryList.add(new Delivery("01","2015","Carrier1", 1, "January 2015"));
            deliveryList.add(new Delivery("01","2015","Carrier2", 2, "January 2015"));
            deliveryList.add(new Delivery("01","2015","Carrier3", 3, "January 2015"));
            deliveryList.add(new Delivery("01","2015","Carrier4", 4, "January 2015"));
            deliveryList.add(new Delivery("04","2015","Carrier1", 1, "April 2015"));
            deliveryList.add(new Delivery("04","2015","Carrier2", 2, "April 2015"));
            deliveryList.add(new Delivery("04","2015","Carrier3", 3, "April 2015"));
            deliveryList.add(new Delivery("04","2015","Carrier4", 4, "April 2015"));
            deliveryList.add(new Delivery("03","2015","Carrier1", 1, "March 2015"));
            deliveryList.add(new Delivery("03","2015","Carrier2", 2, "March 2015"));
            deliveryList.add(new Delivery("03","2015","Carrier3", 3, "March 2015"));
            deliveryList.add(new Delivery("03","2015","Carrier4", 4, "March 2015"));
            deliveryList.add(new Delivery("02","2015","Carrier1", 1, "February 2015"));
            deliveryList.add(new Delivery("02","2015","Carrier2", 2, "February 2015"));
            deliveryList.add(new Delivery("02","2015","Carrier3", 3, "February 2015"));
            deliveryList.add(new Delivery("02","2015","Carrier4", 4, "February 2015"));
            deliveryList.add(new Delivery("01","2015","Carrier1", 1, "January 2015"));
            deliveryList.add(new Delivery("01","2015","Carrier2", 2, "January 2015"));
            deliveryList.add(new Delivery("01","2015","Carrier3", 3, "January 2015"));
            deliveryList.add(new Delivery("01","2015","Carrier4", 4, "January 2015"));
        } else {
        	deliveryList.add(new Delivery("Sweet","Crestwood-Dryfork", "Arrow Midstream", "", 6695.58, 207563.04, 207576.05,1, periodMonth, periodYear,"Carrier4", 4, "April 2015"));
            deliveryList.add(new Delivery("Sweet","Crestwood-Dryfork", "Arrow Midstream", "", 6695.58, 207563.04, 207574.00,2,periodMonth, periodYear,"Carrier4", 4, "April 2015"));
            deliveryList.add(new Delivery("Sweet","Crestwood-Dryfork", "Arrow Midstream", "", 6695.58, 207563.04, 207575.00,3,periodMonth, periodYear,"Carrier4", 4, "April 2015"));
            deliveryList.add(new Delivery("Sweet","Crestwood-Dryfork", "Arrow Midstream", "", 0, 0.0, 0.00,4,periodMonth, periodYear,"Carrier4", 4, "April 2015"));
            deliveryList.add(new Delivery("Sweet","Crestwood-Dryfork", "Arrow Midstream", "", 6695.58, 207563.04, 207578.00,5,periodMonth, periodYear,"Carrier4", 4, "April 2015"));
            deliveryList.add(new Delivery("Sweet","Crestwood-Dryfork", "Arrow Midstream", "", 6695.58, 207563.04, 207579.00,6,periodMonth, periodYear,"Carrier4", 4, "April 2015"));
            deliveryList.add(new Delivery("Sweet","Crestwood-Dryfork", "Arrow Midstream", "", 6695.58, 207563.04, 207580.00,7,periodMonth, periodYear,"Carrier4", 4, "April 2015"));
        }
        
        return deliveryList;
    }
}