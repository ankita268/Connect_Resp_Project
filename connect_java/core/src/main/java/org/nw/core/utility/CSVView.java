/**
 * 
 */
package org.nw.core.utility;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

import org.nw.core.utility.ExcelExport;
import org.nw.core.utility.ExcelExportList;
import com.csvreader.CsvWriter;

/**
 * @author 2shahp
 * 
 */
public class CSVView extends AbstractView {
 
	private char fieldSeparator = ',';

	@SuppressWarnings("unchecked")
	@Override
	protected void renderMergedOutputModel(Map<String, Object> dataMap,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		CsvWriter csvWriter = new CsvWriter(response.getWriter(), fieldSeparator);
		Map<String, Object> dataMapObj = new HashMap<String, Object>();
		dataMapObj = (Map<String, Object>) dataMap.get("data");
		String fileName = (String) dataMapObj.get("fileName") + ".csv";
		if(dataMapObj.get("searchCriteria")!=null){
			csvWriter.write((String)dataMapObj.get("searchCriteria"));
			csvWriter.endRecord();
		}
		response.setContentType("text/csv");
		
		if (fileName.isEmpty()) {
			response.setHeader("Content-Disposition",	"inline; filename=\"file.csv\"");
		} else {
			response.setHeader("Content-Disposition", "inline; filename=\""	+ fileName + "\"");
		}


		List<?> dataList = (List<?>) dataMapObj.get("data");

		if (dataList != null) {
			List<String> fieldList = new java.util.ArrayList<String>();
			for (Object obj : dataList) {
				Class objClass = obj.getClass();
				for (Field field : objClass.getDeclaredFields()) {
					if (field.isAnnotationPresent(ExcelExport.class)) {
						field.setAccessible(true);
						ExcelExport excelExport = (ExcelExport) field
								.getAnnotation(ExcelExport.class);
						String name = "";
						name = excelExport.header();
						if (/*field.get(obj) != null &&*/ !fieldList.contains(field.getName())) {
							csvWriter.write(name);
							fieldList.add(field.getName());
						}
					}
					else if (field.isAnnotationPresent(ExcelExportList.class) && field.getType().getName().equals("java.util.List")) {
						field.setAccessible(true);
						ExcelExportList excelExport = (ExcelExportList) field
							.getAnnotation(ExcelExportList.class);
						if (field.get(obj) != null) {
							List list = (List) field.get(obj);
							for (int i = 1; i <= list.size(); i++) {
								for (int j = 0; j < excelExport.headers().length; j++) {
									if(!fieldList.contains(excelExport.headers()[j] + i))
									{
										csvWriter.write(excelExport.headers()[j] + i);
										fieldList.add(excelExport.headers()[j] + i);
									}
								}
							}
						}
					}
				}
			}
			
			csvWriter.endRecord();
			
			for (Object obj1 : dataList) {
				Class objClass = obj1.getClass();
				for (Field field : objClass.getDeclaredFields()) {
					if (field.isAnnotationPresent(ExcelExport.class)) {
						field.setAccessible(true);
						if (field.get(obj1) != null) {
							csvWriter.write(field.get(obj1).toString(), true);
						}
					}
					else if (field.isAnnotationPresent(ExcelExportList.class) && field.getType().getName().equals("java.util.List")) {
						field.setAccessible(true);
						if (field.get(obj1) != null) {
							List list = (List) field.get(obj1);
							for (int i = 0; i < list.size(); i++) {
								Object subObj = list.get(i);
								for (Field subField : subObj.getClass().getDeclaredFields()) {
									subField.setAccessible(true);
									if (subField.get(subObj) != null) {
										csvWriter.write(subField.get(subObj).toString(), true);
									}
								}
							}
						}
					}
				}
				csvWriter.endRecord();
			}
		}
		csvWriter.flush();
		csvWriter.close();
	}
}
