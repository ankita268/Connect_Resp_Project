package org.nw.core.utilities;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class PdfReport extends AbstractView
{
    @SuppressWarnings("unchecked")
    protected void renderMergedOutputModel(Map<String, Object> dataMap, HttpServletRequest request, HttpServletResponse response) throws Exception
    {

        // Code to Create a Create a new pdf and to open it
        Document document = new Document(PageSize.A4.rotate(), 100, 100, 100, 100);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        Map<String, Object> dataMapObj = new HashMap<String, Object>();
        dataMapObj = (Map<String, Object>) dataMap.get("data");
        String fileName = (String) dataMapObj.get("fileName") + ".pdf";
        PdfWriter writer = PdfWriter.getInstance(document, baos);
        document.open();

        // Data from Controller class
        List<?> dataList = (List<?>) dataMapObj.get("data");

        // count to set the column Length
        int count = 0;
        if (dataList != null)
        {
            List<String> fieldList = new java.util.ArrayList<String>();
            for (Object obj : dataList)
            {
                Class objClass = obj.getClass();
                if (count == 0)
                    count = objClass.getDeclaredFields().length;
                else
                    break;
                for (Field field : objClass.getDeclaredFields())
                {
                    if (field.isAnnotationPresent(TCOPDFExport.class))
                    {
                        field.setAccessible(true);
                        TCOPDFExport excelExport = (TCOPDFExport) field.getAnnotation(TCOPDFExport.class);
                        String name = "";
                        name = excelExport.header();
                        if (field.get(obj) != null && !fieldList.contains(field.getName()))
                        {

                        }
                    }
                    else
                        count--;
                }
            }
        }

        // Adding images to thr block will show the Logo of TESORO Logistics
        // com.lowagie.text.Image image =
        // com.lowagie.text.Image.getInstance("C:\\SAP\\images.jpeg");
        // document.add(image);

        PdfPTable t1 = null;
        t1 = createReportName(fileName);
        PdfPCell c3 = null;
        c3 = createHeaderCellBig(fileName);
        c3.setHorizontalAlignment(Element.ALIGN_RIGHT);
        c3.setBorder(Rectangle.NO_BORDER);
        c3.setNoWrap(false);

        t1.addCell(c3);

        PdfPTable t = new PdfPTable(count);
        t.setSpacingBefore(25);
        t.setSpacingAfter(25);
        t.setWidthPercentage(111);

        // This block is used to Get the column names from the Annotaions.

        if (dataList != null)
        {
            List<String> fieldList = new java.util.ArrayList<String>();
            int i = 0;
            for (Object obj : dataList)
            {
                if (i == 1)
                {
                    break;
                }
                i++;

                Class objClass = obj.getClass();
                for (Field field : objClass.getDeclaredFields())
                {
                    if (field.isAnnotationPresent(TCOPDFExport.class))
                    {
                        field.setAccessible(true);
                        TCOPDFExport excelExport = (TCOPDFExport) field.getAnnotation(TCOPDFExport.class);
                        String name = "";
                        name = excelExport.header();
                        // PdfPCell c2 = new PdfPCell(new Phrase(name,myBoldFont2));
                        PdfPCell c2 = null;
                        c2 = createHeaderCellBig(name);
                        // System.out.println(name.length());

                        t.addCell(c2);
                        fieldList.add(field.getName());

                    }

                }
            }

            // This block is used to Get the data from the List

            for (Object obj1 : dataList)
            {
                Class objClass = obj1.getClass();
                for (Field field : objClass.getDeclaredFields())
                {
                    if (field.isAnnotationPresent(TCOPDFExport.class))
                    {
                        field.setAccessible(true);
                        if (field.get(obj1) != null)
                        {
                            t.addCell(field.get(obj1).toString());
                        }
                        else
                        {
                            t.addCell(" ");
                        }
                    }

                }
            }
        }

        document.add(t1);
        document.add(t);

        document.close();
        response.setHeader("content-disposition", "attachment;filename=\"" + fileName + "\"");
        response.setContentType("application/pdf");
        response.setContentLength(baos.size());
        OutputStream os = response.getOutputStream();
        baos.writeTo(os);
        os.flush();
        os.close();
    }

    public static PdfPCell createHeaderCellBig(String cellContent)
    {
        Font myBoldFont2 = FontFactory.getFont("Times-Roman", 12, Font.BOLD);
        PdfPCell c2 = new PdfPCell(new Phrase(cellContent, myBoldFont2));
        c2.getWidth();
        return c2;
    }

    public static PdfPTable createReportName(String cellContent)
    {

        PdfPTable t1 = new PdfPTable(1);

        return t1;
    }
}
