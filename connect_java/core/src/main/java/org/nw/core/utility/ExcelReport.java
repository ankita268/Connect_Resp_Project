package org.nw.core.utility;
 
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.springframework.web.servlet.view.document.AbstractExcelView;

//import com.bgx.connect.foundation.constants.DatabaseConstants;

/**
 * The Class ExcelReport.
 */
public class ExcelReport extends AbstractExcelView{

	/**
	 * Builds the excel document.
	 *
	 * @param arg0 the Hash Map that contains the list of data to be exported.
	 * @param arg1 the Excel Workbook Object
	 * @param request the HTTP Request Object
	 * @param response the HTTP Response Object
	 * @throws Exception the exception
	 */
	@SuppressWarnings("unchecked")
	protected void buildExcelDocument(Map<String, Object> arg0,
			HSSFWorkbook arg1, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		/* Get the Data Object */
		Map<String, Object> map = new HashMap<String, Object>();
		map = (Map<String, Object>) arg0.get("data");
		List<?> objList = (List<?>) map.get("data");
		
		String languageFileCode=null;
		languageFileCode="en-us";
       /* if ( map.containsKey(DatabaseConstants.LANGUAGE)) {
            languageFileCode = (String) map.get(DatabaseConstants.LANGUAGE);
        }           
        if (languageFileCode == null || languageFileCode.isEmpty()) {
            languageFileCode = DatabaseConstants.EN_US;
        }*/
        
		Map<String, String> ftlLabelValues = getLanguageLabels(languageFileCode, request.getSession().getServletContext().getRealPath(
                "/resources/Application_" + languageFileCode + ".txt"));
		
		if (map.containsKey("fileName")){
			   String fileName = (String) map.get("fileName") + ".xls"; 
			   response.setHeader("Content-Disposition", "attachment; filename=\""+fileName+"\"");
			   //response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName);
		}
		
		/* Create Workbook */
		HSSFSheet sheet = arg1.createSheet("Sheet 1");
		
		CellStyle headerStyle = arg1.createCellStyle();
		
		// Set Border Style for header
		headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
		headerStyle.setBorderTop(CellStyle.BORDER_THIN);
		headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
		headerStyle.setBorderRight(CellStyle.BORDER_THIN);
		
		// Set Alignment for header
		headerStyle.setAlignment(CellStyle.ALIGN_CENTER);
		headerStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		
		headerStyle.setFillForegroundColor(HSSFColor.GREY_40_PERCENT.index);
		headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
		
		HSSFFont headerFont = arg1.createFont();
		headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		headerFont.setColor(HSSFColor.BLACK.index);
		headerFont.setFontHeightInPoints((short) 9);
		headerStyle.setFont(headerFont);		
		
		
		
		if (objList!=null && !objList.isEmpty()){
			
			Class cls = objList.get(0).getClass();		
			
			/* Create Header */
			HSSFRow header = sheet.createRow(0);
			
			int headerColumnCount = 0;
			
			/* Create Excel Headers */
			for (Field field: cls.getDeclaredFields()){
				HSSFCell cell = header.createCell(headerColumnCount);
				if (field.isAnnotationPresent(ExcelExport.class)){
					ExcelExport excelExport = (ExcelExport) field.getAnnotation(ExcelExport.class);				
					String name = "";
					 
					name = excelExport.header();
					if( ftlLabelValues.get(name)!= null && ftlLabelValues.get(name).replaceAll("\"", "").length() > 0){
                        name = StringEscapeUtils.unescapeHtml(ftlLabelValues.get(name).replaceAll("\"", ""));
                    }
					
					if (!name.isEmpty()){
						cell.setCellValue(name);
					}else{
						cell.setCellValue(field.getName());
					}
					cell.setCellStyle(headerStyle);			
					headerColumnCount++;
				}else{
					//cell.setCellValue(field.getName());
				}
					
				
			}
						
			CellStyle rowStyle = arg1.createCellStyle();
			
			// Set Border Style for header
			rowStyle.setBorderBottom(CellStyle.BORDER_THIN);
			rowStyle.setBorderTop(CellStyle.BORDER_THIN);
			rowStyle.setBorderLeft(CellStyle.BORDER_THIN);
			rowStyle.setBorderRight(CellStyle.BORDER_THIN);
			
			HSSFFont rowFont = arg1.createFont();		
			rowFont.setColor(HSSFColor.BLACK.index);
			rowFont.setFontHeightInPoints((short) 9);
			headerStyle.setFont(rowFont);	
			
			/* Create Excel Data Rows */
			int rowNumber = 1;
			for (Object obj: objList){
				Class objClass = obj.getClass();
				//Object newObj = obj.newInstance();			
				int rowCell = 0;
				HSSFRow row = sheet.createRow(rowNumber++);			
				for (Field field: objClass.getDeclaredFields()){
					if (field.isAnnotationPresent(ExcelExport.class)){
						HSSFCell colCell = row.createCell(rowCell++);
						field.setAccessible(true);
						if (field.get(obj) != null){
							if (field.getType().equals(Integer.TYPE) || field.getType().equals(Integer.class))
								colCell.setCellValue(Integer.parseInt(field.get(obj).toString()));
							else if (field.getType().equals(Float.TYPE) || field.getType().equals(Float.class))
								colCell.setCellValue(Double.parseDouble(field.get(obj).toString()));
							else if (field.getType().equals(Double.TYPE) || field.getType().equals(Double.class))
								colCell.setCellValue(Double.parseDouble(field.get(obj).toString()));
							else if (field.getType().equals(Boolean.TYPE) || field.getType().equals(Boolean.class))
								colCell.setCellValue(Boolean.parseBoolean(field.get(obj).toString()));
							else
							colCell.setCellValue(field.get(obj).toString());
						}else{
							colCell.setCellValue(StringUtils.EMPTY);
						}
						colCell.setCellStyle(rowStyle);
					}
					
				}			
			}			
			for (int i=0; i<headerColumnCount; i++){
				sheet.autoSizeColumn(i);				
			}
			
		}else{ 
			/* Create Header */
			HSSFRow header = sheet.createRow(5);
			HSSFCell cell = header.createCell(5);
			cell.setCellValue("No Data Found");
			cell.setCellStyle(headerStyle);		
			sheet.autoSizeColumn(5);
			
		}
		
		
	} 
	
	public Map<String, String> getLanguageLabels(String languageFileCode, String filePath)
    {
        Map<String, String> ftlLabelValues = new HashMap<String, String>();
        Map<String, Map<String, String>> languageDependentFTLLabels = new HashMap<String, Map<String, String>>();
        if (languageDependentFTLLabels.containsKey(languageFileCode))
        {
            ftlLabelValues = languageDependentFTLLabels.get(languageFileCode);
        }
        else
        {
            try
            {
                Properties prop = new Properties();
                prop.load(new FileInputStream(filePath));

                Iterator<Object> propertyKeys = prop.keySet().iterator();

                while (propertyKeys.hasNext())
                {
                    String propertyKey = propertyKeys.next().toString();
                    ftlLabelValues.put(propertyKey, prop.get(propertyKey).toString());
                }
                languageDependentFTLLabels.put(languageFileCode, ftlLabelValues);

            }
            catch (FileNotFoundException e)
            {
                /*SAPLogger.logError(e, "[" + new Date() + "],[Thread:" + Thread.currentThread().getName() + ", " + "BxCustomInterceptor.getFTLLabels" + "]", "Cannot read file from " + filePath + ".",
                        "", "", "", "");*/
            }
            catch (IOException e)
            {
               /* SAPLogger.logError(e, "[" + new Date() + "],[Thread:" + Thread.currentThread().getName() + ", " + "BxCustomInterceptor.getFTLLabels" + "]", "Cannot read file from " + filePath + ".",
                        "", "", "", "");*/
            }
        }

        return ftlLabelValues;
    }
}

