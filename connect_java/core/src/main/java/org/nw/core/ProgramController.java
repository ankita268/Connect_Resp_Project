package org.nw.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.nw.core.models.BaseResult;
import org.nw.core.models.BasicServiceResult;
import org.nw.core.models.Cust360UIException;
import org.nw.core.models.Document;
import org.nw.core.models.ErrorProcessor;
import org.nw.core.models.Program;
import org.nw.core.models.ServiceResult;
import org.nw.core.models.SortedPage;
import org.nw.core.models.Tag;
import org.nw.core.models.TagListType;
import org.nw.core.models.UIErrorMessages;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;
 

@Controller
@RequestMapping(value = "/program")
public class ProgramController {
	private static final Logger logger = LoggerFactory.getLogger(ProgramController.class);
	private static final int PAGE_TOTAL = 20;
	private final static String LOCATION = "ProgramController";

	@InitBinder
	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) {
		binder.registerCustomEditor(Tag.class, new GenericPropertyEditor<Tag>(new Tag()));
		binder.registerCustomEditor(Document.class, new GenericPropertyEditor<Document>(new Document()));

	}

	@RequestMapping(value = "/programs")
	public @ResponseBody ServiceResult<Program> getPrograms() {

		ServiceResult<Program> result = null;
		try{
			 
			result = getProgramList();
			if(result==null){
				throw new Cust360UIException(new Exception(),LOCATION,"getPrograms",null, UIErrorMessages.BX_DB_NORECORDS);
			}
			
		}catch(Cust360UIException e){
			result =  new ServiceResult<Program>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_NORECORDS);
			ErrorProcessor.processAppError(e, LOCATION, "getPrograms()");
		}catch(Exception e){
			result =  new ServiceResult<Program>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_NORECORDS);
			ErrorProcessor.processAppError(e, LOCATION, "getPrograms()");
		}
		
		return result;
	}

	 private ServiceResult<Program>  getProgramList() throws Cust360UIException{
		List<Program> programList = new ArrayList<Program>();
		programList.add(new Program(1, "Program-1"));
		programList.add(new Program(2, "Program-2"));
		programList.add(new Program(3, "Program-3"));
		programList.add(new Program(4, "Program-4"));
		ServiceResult<Program> result = new ServiceResult<Program>(programList, BaseResult.SUCCESS, StringUtils.EMPTY);
		return result;
	}

	@RequestMapping(value = "/taglist", method = RequestMethod.POST)
	public @ResponseBody BasicServiceResult<TagListType> getTagList(@RequestParam Map<String, Object> params) {

		BasicServiceResult<TagListType> result = null;
		try{
			 
			result = getTags();
			if(result==null){
				throw new Cust360UIException(new Exception(),LOCATION,"getTagList",null, UIErrorMessages.BX_DB_NORECORDS);
			}
			
		}catch(Cust360UIException e){
			result =  new BasicServiceResult<TagListType>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_NORECORDS);
			ErrorProcessor.processAppError(e, LOCATION, "getTagList()");
		}catch(Exception e){
			result =  new BasicServiceResult<TagListType>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_NORECORDS);
			ErrorProcessor.processAppError(e, LOCATION, "getTagList()");
		}
		
		return result;
	}
	
	private  BasicServiceResult<TagListType>  getTags() throws Cust360UIException{
		TagListType tagListType = new TagListType();

		BasicServiceResult<TagListType> basicServiceResult = new BasicServiceResult<TagListType>(tagListType, BaseResult.SUCCESS, StringUtils.EMPTY);

		Map<String, List<Tag>> data = new HashMap<String, List<Tag>>();
		logger.info("Tag list service started.");
		List<Tag> programList = new ArrayList<Tag>();
		programList.add(new Tag(1, "Program-1"));
		programList.add(new Tag(2, "Program-2"));
		programList.add(new Tag(3, "Program-3"));
		programList.add(new Tag(4, "Program-4"));
		tagListType.setProgramList(programList);

		data.put("programList", programList);
		List<Tag> shipperList = new ArrayList<Tag>();
		shipperList.add(new Tag(1, "Shipper-1"));
		shipperList.add(new Tag(2, "Shipper-2"));
		shipperList.add(new Tag(3, "Shipper-3"));
		shipperList.add(new Tag(4, "Shipper-4"));
		data.put("shipperList", shipperList);
		tagListType.setShipperList(shipperList);

		List<Tag> roleList = new ArrayList<Tag>();
		roleList.add(new Tag(1, "Role-1"));
		roleList.add(new Tag(2, "Role-2"));
		roleList.add(new Tag(3, "Role-3"));
		roleList.add(new Tag(4, "Role-4"));
		tagListType.setRoleList(roleList);
		return basicServiceResult;
	}

	@RequestMapping(value = "/viewDocument", method = RequestMethod.POST)
	public @ResponseBody
	BasicServiceResult<Document> viewDocument(@RequestBody Document document) {

		BasicServiceResult<Document> result = null;
		try {
			if (document != null) {
				int documentId = document.getId();
				result = getDocument(documentId);
				if(result==null){
					throw new Cust360UIException(new Exception(), LOCATION, "viewDocument", null, UIErrorMessages.BX_DB_NORECORDS);
				}

			} else {
				throw new Cust360UIException(new Exception(), LOCATION, "viewDocument", null, UIErrorMessages.BX_DB_NORECORDS);
			}
		} catch (Cust360UIException e) {
			result = new BasicServiceResult<Document>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_NORECORDS);
			ErrorProcessor.processAppError(e, LOCATION, "viewDocument");
		} catch (Exception e) {
			result = new BasicServiceResult<Document>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_NORECORDS);
			ErrorProcessor.processAppError(e, LOCATION, "viewDocument");
		}
		return result;

	}
	private BasicServiceResult<Document>  getDocument(int documentId) throws Cust360UIException{
		Document doc = new Document(Integer.valueOf(documentId), "Docuement-" + documentId, true);
		return new BasicServiceResult<Document>(doc, BaseResult.SUCCESS, "");
	}

	public List<Document> getAllDocumentData() {
		List<Document> docuemnentList = new ArrayList<Document>();
		for (int id = 1; id < 5; id++) {
			docuemnentList.add(new Document(1, "Program-" + id + "-" + "Document-1", false));
			docuemnentList.add(new Document(2, "Program-" + id + "-" + "Document-2", false));
			docuemnentList.add(new Document(3, "Program-" + id + "-" + "Document-3", false));
			docuemnentList.add(new Document(4, "Program-" + id + "-" + "Document-4", false));
		}

		return docuemnentList;
	}

	@RequestMapping(value = "/documents", method = RequestMethod.POST)
	public @ResponseBody ServiceResult<Document> getList(@RequestParam Map<String, Object> params) {
		logger.info("program document list service started.");

		Map<String, List<String>> filterMap = new HashMap<String, List<String>>();
		Map<String, String> sortingMap = new HashMap<String, String>();

		if (params.containsKey("filter")) {
			String searchJsonString = params.get("filter").toString();
			filterMap = CommonFunctions.getSearchMap(searchJsonString);
		}
		if (params.containsKey("sort")) {
			String sortJsonString = params.get("sort").toString();
			sortingMap = CommonFunctions.getSortMap(sortJsonString);
		}

		String id = "";
		if (params.containsKey("id")) {
			id = params.get("id").toString();

		}

		int pageSize = params.containsKey("length") ? Integer.valueOf(String.valueOf(params.get("length"))) : PAGE_TOTAL;
		int start = params.containsKey("start") ? Integer.valueOf(String.valueOf(params.get("start"))) : 0;
		int draw = params.containsKey("draw") ? Integer.valueOf(String.valueOf(params.get("draw"))) : 1;
		String name = filterMap.containsKey("txt_documentName") ? filterMap.get("txt_documentName").get(0) : "";
		List<String> roles = filterMap.containsKey("role") ? (List<String>) filterMap.get("role") : null;
		List<String> programs = filterMap.containsKey("program") ? (List<String>) filterMap.get("program") : null;
		List<String> shippers = filterMap.containsKey("shipper") ? (List<String>) filterMap.get("shipper") : null;
		List<Document> programListLocal = new ArrayList<Document>();
		List<Document> finalProgramList = new ArrayList<Document>();

		if (StringUtils.isEmpty(id)) {
			if (programListLocal.isEmpty()) {
				for (int count = 1; count < 25; count++) {
					for (int programCount = 1; programCount < 5; programCount++) {
						programListLocal.add(new Document(count, "Program-" + programCount + "-" + "Document-" + count, false));
					}
				}

			}
		} else {
			if (programListLocal.isEmpty()) {
				for (int count = 1; count < 25; count++) {
					programListLocal.add(new Document(count, "Program-" + id + "-" + "Document-" + count, false));
				}

			}
		}

		/* Filter Code Start */
		if (!StringUtils.isEmpty(name) && !"*".equalsIgnoreCase(name)) {
			for (Document r : programListLocal) {
				if (r.getName().equalsIgnoreCase(name)) {
					finalProgramList.add(r);
				}
			}
		} else {
			finalProgramList.addAll(programListLocal);
		}
		/* Filter Code End */

		ServiceResult<Document> serviceResult = new ServiceResult<Document>(finalProgramList.size(), pageSize, draw++, "0", "");
		if (sortingMap.size() != 0) {
			try {
				SortedPage<Document> sortedList = new SortedPage<Document>(finalProgramList, new HashMap<String, Object>());
				List<Document> groupFinalList = sortedList.getMultipleSortedList(sortingMap, finalProgramList, start, pageSize);
				serviceResult.setAoData(groupFinalList);
			} catch (Cust360UIException e) {
				logger.info("role list service returning data.." + e.getMessage());
			}
		} else {
			try {
				Map<String, Object> sortParams = new HashMap<String, Object>();
				sortParams.put("start", start);
				sortParams.put("limit", pageSize);
				SortedPage<Document> sortedList = new SortedPage<Document>(finalProgramList, sortParams);
				serviceResult.setAoData(sortedList.getList());
			} catch (Cust360UIException e) {
				logger.info("Group list service returning data.." + e.getMessage());
			}
			logger.info("role list service returning data..");
		}

		return serviceResult;
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public @ResponseBody BasicServiceResult<Document> createDocument(HttpServletRequest request, Document document) {

		BasicServiceResult<Document> result = null;
		try{
			if (request instanceof MultipartRequest) {
				MultipartFile documentFile = ((MultipartRequest) request).getFile("file");
				System.out.println("Uploaded File name is " + documentFile.getName());
			}
			 
			result = createDocument(document);
			if(result==null){
				throw new Cust360UIException(new Exception(),LOCATION,"createDocument",null, UIErrorMessages.BX_DB_FAILURE);
			}

		}catch(Cust360UIException e){
			result = new BasicServiceResult<Document>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_FAILURE);
			ErrorProcessor.processAppError(e, LOCATION, "createDocument");
		}
		catch(Exception e){
			result = new BasicServiceResult<Document>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_FAILURE);
			ErrorProcessor.processAppError(e, LOCATION, "createDocument");
		}
		
		return result;
	}
	
	 BasicServiceResult<Document> createDocument(Document document) throws Cust360UIException{
		 return new BasicServiceResult<Document>(null, BaseResult.SUCCESS, StringUtils.EMPTY);
	 }

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public @ResponseBody
	BasicServiceResult<Document> updateDocument(Document document) {

		BasicServiceResult<Document> result = null;
		try {

			result = saveDocument(document);

			if (result == null) {
				throw new Cust360UIException(new Exception(), LOCATION, "updateDocument", null, UIErrorMessages.BX_DB_FAILURE);
			}

		} catch (Cust360UIException e) {
			result = new BasicServiceResult<Document>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_FAILURE);
			ErrorProcessor.processAppError(e, LOCATION, "updateDocument");
		} catch (Exception e) {
			result = new BasicServiceResult<Document>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_FAILURE);
			ErrorProcessor.processAppError(e, LOCATION, "updateDocument");
		}
		return result;
	}

	private BasicServiceResult<Document> saveDocument(Document document) throws Cust360UIException {
		return new BasicServiceResult<Document>(null, BaseResult.SUCCESS, StringUtils.EMPTY);
	}
	

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody BasicServiceResult<Document> deleteDocument(@RequestBody Document document) {

		BasicServiceResult<Document> result = null;
		try{
			 
			result = deleteDocumentFromDB(document);

			if (result == null) {
				throw new Cust360UIException(new Exception(), LOCATION, "deleteDocument", null, UIErrorMessages.BX_DB_FAILURE);
			}

		} catch (Cust360UIException e) {
			result = new BasicServiceResult<Document>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_FAILURE);
			ErrorProcessor.processAppError(e, LOCATION, "deleteDocument");
		} catch (Exception e) {
			result = new BasicServiceResult<Document>(null, BaseResult.ERROR, UIErrorMessages.BX_DB_FAILURE);
			ErrorProcessor.processAppError(e, LOCATION, "deleteDocument");
		}
		return result;
	 }
		 
	 private BasicServiceResult<Document> deleteDocumentFromDB(Document document) throws Cust360UIException{
		 return new BasicServiceResult<Document>(null, BaseResult.SUCCESS, StringUtils.EMPTY);
	 }
}
