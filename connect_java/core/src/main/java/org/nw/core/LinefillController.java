package org.nw.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.nw.core.models.BasicServiceResult;
import org.nw.core.models.BaseResult;
import org.nw.core.models.Cust360UIException;
import org.nw.core.models.Document;
import org.nw.core.models.Linefill;
import org.nw.core.models.ManageNominationPeriod;
import org.nw.core.models.NominationType;
import org.nw.core.models.PdfDownloadInput;
import org.nw.core.models.ServiceResult;
import org.nw.core.models.SortedPage;
import org.nw.core.models.Statement;
import org.nw.core.models.Tag;
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

/**
 * Handles requests for the Linefill application.
 */
@Controller
@RequestMapping(value = "/linefill")
public class LinefillController {
	
	private static final Logger logger = LoggerFactory.getLogger(LinefillController.class);

    private static final int draw = 1;

    private static final String LENGTH = "length";

    private static final String START = "start";

    private static final String DRAW = "draw";

    private static final String PDFREP_TXT = "PdfReport";

    private static final String DATA_TXT = "data";
    private static final int PAGE_TOTAL = 20;
    
    @InitBinder
	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) {
		binder.registerCustomEditor(Linefill.class, new GenericPropertyEditor<Linefill>(new Linefill()));

	}
    
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<Linefill> getList(@RequestParam Map<String, Object> params)
    {
        List<Linefill> linefillList = new ArrayList<Linefill>();

        logger.debug("Statement list service started.");

        int pageSize = params.containsKey(LENGTH) ? Integer.valueOf(String.valueOf(params.get(LENGTH))) : PAGE_TOTAL;
        int start = params.containsKey(START) ? Integer.valueOf(String.valueOf(params.get(START))) : 0;
        int draw = params.containsKey(DRAW) ? Integer.valueOf(String.valueOf(params.get(DRAW))) : 1;
        Map<String, List<String>> filterMap = new HashMap<String, List<String>>();
        Map<String, String> sortingMap = new HashMap<String, String>();
        if (params.containsKey("filter"))
        {
            String searchJsonString = params.get("filter").toString();
            filterMap = CommonFunctions.getSearchMap(searchJsonString);
        }
        if (params.containsKey("sort")) {
			String sortJsonString = params.get("sort").toString();
			sortingMap = CommonFunctions.getSortMap(sortJsonString);
		}

          linefillList.add(new Linefill("/linefill/downloadPdf",4,2015, 4470.00, 6784.80, "Shipper 1", "1234"));
        	 

        ServiceResult<Linefill> serviceResult = new ServiceResult<Linefill>(linefillList.size(), pageSize, draw++, BaseResult.SUCCESS, "");
        
        try{
        	
        	if (sortingMap.size() != 0) {
            	SortedPage<Linefill> sortedList = new SortedPage<Linefill>(linefillList, new HashMap<String, Object>());
            	List<Linefill> groupFinalList = sortedList.getMultipleSortedList(sortingMap, linefillList, start, pageSize);
                serviceResult.setAoData(groupFinalList);
            }else{
            	Map<String, Object> sortParams = new HashMap<String, Object>();
    			sortParams.put("start", start);
    			sortParams.put("limit", pageSize);
    			SortedPage<Linefill> sortedList = new SortedPage<Linefill>(linefillList, sortParams);
    			serviceResult.setAoData(sortedList.getList());
            }	
        
        } catch (Cust360UIException e) {
			logger.info("Group list service returning data.." + e.getErrorMessage());
			serviceResult = new ServiceResult<Linefill>(0, pageSize, draw++, BaseResult.ERROR, "");
		}
        
        return serviceResult;
    }
    
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody BasicServiceResult<Linefill> update(Linefill lineFill){
    	BasicServiceResult<Linefill> baseServiceResult = new BasicServiceResult<Linefill>(null,BaseResult.SUCCESS,StringUtils.EMPTY);
    	
    	return baseServiceResult;
    }
    
    @RequestMapping(value = "/view", method = RequestMethod.POST)
	public @ResponseBody BasicServiceResult<Linefill> view(Linefill linefill) {

    	 linefill = new Linefill("/linefill/downloadPdf", 4,2015,4470.00, 6784.80, "Shipper 1", "1234");
    	
    	return new BasicServiceResult<Linefill>(linefill, BaseResult.SUCCESS, "");

	}
    
    @RequestMapping(value = "/downloadPdf", method = RequestMethod.POST)
    public ModelAndView downloadPDF(HttpServletRequest request, @RequestBody PdfDownloadInput pdfDownloadInput)
    {
    	 Map<String, Object> searchResultList = new HashMap<String, Object>();
         List<NominationType> nominationList = new ArrayList<NominationType>();
         nominationList.add(new NominationType("000020", "New", "Shipper1", "15Cox", "Carney asdasd asdasd asdasdasd adsasdasd ", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00",
                 "Big Tank", "Big Oil Co", "35000.00", "Mega Corp", "APRIL' 2015", "unlock", true));
         nominationList.add(new NominationType("000019", "Deleted", "Shipper2", "15Cox", "Carney", "Enormo", "32000.00", "10000.00", "5000.00", "45000.00", "30000.00", "Big Tank", "Big Oil Co",
                 "35000.00", "Mega Corp", "APRIL' 2015", "unlock", false));
        searchResultList.put(DATA_TXT, nominationList);
        searchResultList.put("fileName", "LinefillStatement");
        searchResultList.put("success", "true");
        searchResultList.put("errorMessage", "");
        searchResultList.put("total", nominationList.size());
        searchResultList.put("messages", "");

        return new ModelAndView(PDFREP_TXT, DATA_TXT, searchResultList);
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

    @RequestMapping(value = "/shipperList", method = RequestMethod.POST)
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

}
