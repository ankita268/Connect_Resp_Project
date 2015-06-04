package org.nw.core;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.nw.core.models.Book;
import org.nw.core.models.Cust360UIException;
import org.nw.core.models.Footer;
import org.nw.core.models.GroupType;
import org.nw.core.models.Menu;
import org.nw.core.models.Role;
import org.nw.core.models.ServiceResult;
import org.nw.core.models.SortedPage;
import org.nw.core.models.UserRights;
import org.nw.core.utilities.CommonFunctions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController
{

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    private static final List<Book> bookList = new ArrayList<Book>();

    private static final List<Role> roleList = new ArrayList<Role>();

    private static final List<Menu> headerMenuList = new ArrayList<Menu>();

    private static final int draw = 1;
    private static final int PAGE_TOTAL = 20;

    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(Locale locale, Model model)
    {
        logger.info("Welcome home! The client locale is {}.", locale);

        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

        String formattedDate = dateFormat.format(date);

        model.addAttribute("serverTime", formattedDate);

        return "home";
    }

    public String createEditrole(HttpServletRequest request, Map<String, Object> params)
    {
        try
        {
            String roleName = params.containsKey("roleName") ? params.get("roleName").toString() : "";
            String roleDescription = params.containsKey("roleDescription") ? params.get("roleDescription").toString() : "";
            String roletype = params.containsKey("roletype") ? params.get("roletype").toString() : "";
            String accesslvel = params.containsKey("accesslevel") ? params.get("accesslevel").toString() : "";
            String status = params.containsKey("status") ? params.get("status").toString() : "";
            String assignment = params.containsKey("assignment") ? params.get("assignment").toString() : "";

            Base64 decoder = new Base64();
            byte[] decodedBytes = decoder.decode(roleName);
            System.out.println(new String(decodedBytes) + "\n");
            roleName = new String(decodedBytes);
            byte[] decodedBytes1 = decoder.decode(roleDescription);
            System.out.println(new String(decodedBytes1) + "\n");
            roleDescription = new String(decodedBytes1);

            byte[] decodedBytesroletype = decoder.decode(roletype);
            System.out.println(new String(decodedBytesroletype) + "\n");
            roletype = new String(decodedBytesroletype);
            byte[] decodedBytesaccesslvel = decoder.decode(accesslvel);
            System.out.println(new String(decodedBytesaccesslvel) + "\n");
            accesslvel = new String(decodedBytesaccesslvel);
            byte[] decodedBytesstatus = decoder.decode(status);
            System.out.println(new String(decodedBytesstatus) + "\n");
            status = new String(decodedBytesstatus);

            byte[] decodedBytesassignment = decoder.decode(assignment);
            System.out.println(new String(decodedBytesassignment) + "\n");
            assignment = new String(decodedBytesassignment);

            params.put("roleName", roleName);
            params.put("roleDescription", roleDescription);
            params.put("roletype", roletype);
            params.put("accesslvel", accesslvel);
            params.put("status", status);
            params.put("assignment", assignment.split(","));

            return "new role added successfully";

        }
        catch (Exception e)
        {
            // TODO: handle exception
        }
        return null;
    }

    @RequestMapping(value = "/view", method = RequestMethod.POST)
    public @ResponseBody String viewerole(HttpServletRequest request, @RequestParam Map<String, Object> params)
    {

        if (null != createEditrole(request, params))
        {
            return "Role Created Successfully";
        }
        return null;
    }

    @RequestMapping(value = "/createrole", method = RequestMethod.POST)
    public @ResponseBody String createrole(HttpServletRequest request, @RequestParam Map<String, Object> params)
    {

        if (null != createEditrole(request, params))
        {
            return "Role Created Successfully";
        }
        return null;
    }

    @RequestMapping(value = "/editRole", method = RequestMethod.POST)
    public @ResponseBody String editrole(HttpServletRequest request, @RequestParam Map<String, Object> params)
    {
        if (null != createEditrole(request, params))
        {
            return "Role Edited Successfully";
        }
        return null;
    }

    @RequestMapping(value = "/book", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<Book> list(@RequestParam Map<String, Object> params)
    {
        logger.info("book list service started.");

        int pageSize = params.containsKey("length") ? Integer.valueOf(String.valueOf(params.get("length"))) : 10;
        int start = params.containsKey("start") ? Integer.valueOf(String.valueOf(params.get("start"))) : 10;
        int draw = params.containsKey("draw") ? Integer.valueOf(String.valueOf(params.get("draw"))) : 1;

        if (bookList.isEmpty())
        {
            String periodTime = "";
            for (int i = 0; i < 100; i++)
            {
                if ((i % 2) == 0)
                    periodTime = "April' 2015";
                else
                    periodTime = "May' 2015";
                bookList.add(new Book(i + 1, "Name" + (i + 1), "Author" + (i + 1), periodTime));
            }
        }

        ServiceResult<Book> serviceResult = new ServiceResult<Book>(100, 10, draw++, "0", "");
        try
        {
            Map<String, Object> sortParams = new HashMap<String, Object>();
            sortParams.put("sort", "releaseTime");
            sortParams.put("dir", "Asc");
            sortParams.put("start", start);
            sortParams.put("limit", pageSize);
            SortedPage<Book> sortedList = new SortedPage<Book>(bookList.subList(start, start + pageSize), sortParams);
            serviceResult.setAoData(sortedList.getList());
        }
        catch (Cust360UIException e)
        {
            logger.info("book list service returning data.." + e.getErrorMessage());
        }

        logger.info("book list service returning data..");

        return serviceResult;
    }

    // /check if exist rolename in list
    @RequestMapping(value = "/isExistRolename", method = RequestMethod.POST)
    public @ResponseBody Map<String, String> isExistRolename(@RequestParam Map<String, Object> params)
    {
        Map<String, String> roleMap = new HashMap<String, String>();
        String roleName = params.containsKey("roleName") ? params.get("roleName").toString() : "";
        ArrayList<String> roleNameList = new ArrayList<String>();
        roleNameList.add("Shipper");
        roleNameList.add("SuperAdmin");
        roleNameList.add("Scheduler");
        roleNameList.add("TSO_PRODUCER");

        Base64 decoder = new Base64();
        byte[] decodedBytes = decoder.decode(roleName);
        System.out.println(new String(decodedBytes) + "\n");
        roleName = new String(decodedBytes);

        if (null != roleName && roleNameList.contains(roleName))
        {
            roleMap.put("isExist", "true");
            return roleMap;
        }

        roleMap.put("isExist", "false");
        return roleMap;
    }

    @RequestMapping(value = "/role", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<Role> rolelist(@RequestParam Map<String, Object> params)
    {
        logger.info("role list service started.");

        Map<String, List<String>> filterMap = new HashMap<String, List<String>>();
        Map<String, String> sortingMap = new HashMap<String, String>();

        if (params.containsKey("filter"))
        {
            String searchJsonString = params.get("filter").toString();
            filterMap = CommonFunctions.getSearchMap(searchJsonString);
        }
        if (params.containsKey("sort"))
        {
            String sortJsonString = params.get("sort").toString();
            sortingMap = CommonFunctions.getSortMap(sortJsonString);
        }

        int pageSize = params.containsKey("length") ? Integer.valueOf(String.valueOf(params.get("length"))) : PAGE_TOTAL;
        int start = params.containsKey("start") ? Integer.valueOf(String.valueOf(params.get("start"))) : 0;
        int draw = params.containsKey("draw") ? Integer.valueOf(String.valueOf(params.get("draw"))) : 1;
        String roleName = filterMap.containsKey("roleName") ? filterMap.get("roleName").get(0) : "";

        List<Role> roleListLocal = new ArrayList<Role>();
        List<Role> finalRoleList = new ArrayList<Role>();

        if (roleListLocal.isEmpty())
        {
            roleListLocal.add(new Role("Shipper", "External", "SHIPPERS", 1, 3, "Active", 1));
            roleListLocal.add(new Role("SuperAdmin", "Internal", "ALL", 1, 1, "In Preparation", 2));
            roleListLocal.add(new Role("AdminExternTest", "External", "SCHEDULERS", 1, 1, "Active", 3));
            roleListLocal.add(new Role("TSO_PRODUCER", "External", "PRODUCERS", 1, 1, "Active", 4));
            roleListLocal.add(new Role("Scheduler", "Internal", "SCHEDULERS", 1, 1, "Active", 1));
            roleListLocal.add(new Role("TSO_ADMIN", "Internal", "ALL", 1, 1, "Active", 1));
            roleListLocal.add(new Role("TSO_SITE_ADMIN", "Internal", "ALL", 1, 1, "In Preparation", 1));
            roleListLocal.add(new Role("TSO_SECURITY_ADMIN", "Internal", "ALL", 1, 1, "Active", 1));
            roleListLocal.add(new Role("Producer", "External", "PRODUCERS", 1, 1, "Active", 1));
            roleListLocal.add(new Role("IT Administrator", "Internal", "ALL", 1, 1, "Active", 1));
        }

        /* Filter Code Start */
        if (!StringUtils.isEmpty(roleName) && !"*".equalsIgnoreCase(roleName))
        {
            for (Role r : roleListLocal)
            {
                if (r.getName().equalsIgnoreCase(roleName))
                {
                    finalRoleList.add(r);
                }
            }
        }
        else
        {
            finalRoleList.addAll(roleListLocal);
        }
        /* Filter Code End */

        ServiceResult<Role> serviceResult = new ServiceResult<Role>(finalRoleList.size(), 10, draw++, "0", "");
        if (sortingMap.size() != 0)
        {
            try
            {
                SortedPage<Role> sortedList = new SortedPage<Role>(finalRoleList, new HashMap<String, Object>());
                List<Role> groupFinalList = sortedList.getMultipleSortedList(sortingMap, finalRoleList, start, pageSize);
                serviceResult.setAoData(groupFinalList);
            }
            catch (Cust360UIException e)
            {
                logger.info("role list service returning data.." + e.getErrorMessage());
            }
        }
        else
        {
            try
            {
                Map<String, Object> sortParams = new HashMap<String, Object>();
                sortParams.put("start", start);
                sortParams.put("limit", pageSize);
                SortedPage<Role> sortedList = new SortedPage<Role>(finalRoleList, sortParams);
                serviceResult.setAoData(sortedList.getList());
            }
            catch (Cust360UIException e)
            {
                logger.info("Group list service returning data.." + e.getErrorMessage());
            }
            logger.info("role list service returning data..");
        }

        return serviceResult;
    }

    @RequestMapping(value = "/menu", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<Menu> headerlist(@RequestParam Map<String, Object> params)
    {
        logger.info("menu list service started.");

        if (headerMenuList.isEmpty())
        {
            //headerMenuList.add(new Menu(1, "Home", "#/home", new ArrayList<Menu>()));
            //headerMenuList.add(new Menu(2, "Book", "#/book/list", new ArrayList<Menu>()));
            headerMenuList.add(new Menu(3, "Role", "#/role/list", new ArrayList<Menu>()));
            //headerMenuList.add(new Menu(4, "Kitchen Sink", "#/kitchensink", new ArrayList<Menu>()));
            headerMenuList.add(new Menu(6, "Nomination", "#/nomination/list", new ArrayList<Menu>()));
            headerMenuList.add(new Menu(6, "Manage Nomination Period", "#/nominationperiod/list", new ArrayList<Menu>()));
            //headerMenuList.add(new Menu(7, "Group", "#/group/list", new ArrayList<Menu>()));
            headerMenuList.add(new Menu(8, "Program", "#/program/list", new ArrayList<Menu>()));
            headerMenuList.add(new Menu(9, "Pipeline Delivery", "#/delivery/list", new ArrayList<Menu>()));
            List<Menu> subMenu = new ArrayList<Menu>();
            subMenu.add(new Menu(11, "SHIPPER STATEMENT", "#/statement/list", new ArrayList<Menu>()));
            subMenu.add(new Menu(12, "LINE FILL", "/#/linefill/list", new ArrayList<Menu>()));
            headerMenuList.add(new Menu(5, "REPORTS", "", subMenu));
        }

        ServiceResult<Menu> serviceResult = new ServiceResult<Menu>();
        serviceResult.setAoData(headerMenuList);

        logger.info("menu list service returning data..");

        return serviceResult;
    }

    @RequestMapping(value = "/footer", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<Footer> footerlist(@RequestParam Map<String, Object> params)
    {
        List<Footer> footerMenuList = new ArrayList<Footer>();

        logger.info("footer list service started.");
        ServiceResult<Footer> serviceResult = new ServiceResult<Footer>();
        footerMenuList.add(new Footer("1", "Terms & Conditions", "#", null));
        footerMenuList.add(new Footer("2", "Privacy Policy", "#", null));
        logger.info("footer list service returning data..");
        serviceResult.setAoData(footerMenuList);
        return serviceResult;

    }

    @RequestMapping(value = "/getUserProfile", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object> getUserProfile(@RequestParam Map<String, Object> params)
    {
        Map<String, Object> userProfileMap = new HashMap<String, Object>();
        List<UserRights> userRightsList = new ArrayList<UserRights>();
        userRightsList.add(new UserRights("home"));
        userRightsList.add(new UserRights("role"));
        userRightsList.add(new UserRights("book"));
        userRightsList.add(new UserRights("nomination"));
        userRightsList.add(new UserRights("kitchensink"));
        userRightsList.add(new UserRights("group"));
        userRightsList.add(new UserRights("statement"));
        userRightsList.add(new UserRights("program"));
        userRightsList.add(new UserRights("linefill"));
        userRightsList.add(new UserRights("delivery"));
        userProfileMap.put("currentuser", "Bgx_Admin_User");
        userProfileMap.put("contenttypes", userRightsList);
        userProfileMap.put("userType", "Internal");
        return userProfileMap;
    }

    @RequestMapping(value = "/group", method = RequestMethod.POST)
    public @ResponseBody ServiceResult<GroupType> grouplist(@RequestParam Map<String, Object> params)
    {
        logger.info("group list service started.");

        Map<String, List<String>> filterMap = new HashMap<String, List<String>>();
        Map<String, String> sortingMap = new HashMap<String, String>();

        if (params.containsKey("filter"))
        {
            String searchJsonString = params.get("filter").toString();
            filterMap = CommonFunctions.getSearchMap(searchJsonString);
        }
        if (params.containsKey("sort"))
        {
            String sortJsonString = params.get("sort").toString();
            sortingMap = CommonFunctions.getSortMap(sortJsonString);
        }

        int pageSize = params.containsKey("length") ? Integer.valueOf(String.valueOf(params.get("length"))) : 10;
        int start = params.containsKey("start") ? Integer.valueOf(String.valueOf(params.get("start"))) : 10;
        int draw = params.containsKey("draw") ? Integer.valueOf(String.valueOf(params.get("draw"))) : 1;
        String groupName = filterMap.containsKey("groupName") ? filterMap.get("groupName").get(0) : "";
        String groupType = filterMap.containsKey("groupType") ? filterMap.get("groupType").get(0) : "";

        List<GroupType> groupListLocal = new ArrayList<GroupType>();
        List<GroupType> finalGroupList = new ArrayList<GroupType>();

        if (groupListLocal.isEmpty())
        {
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1163, 1, "Active", "External", "Group1"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1164, 0, "In Prearation", "Internal", "Group2"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1165, 3, "Active", "External", "Group3"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1166, 4, "Active", "External", "Group4"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1167, 0, "Active", "Internal", "Group5"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1168, 0, "In Prearation", "External", "Group6"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1169, 7, "In Prearation", "External", "Group7"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1170, 8, "Active", "Internal", "Group8"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1171, 9, "Active", "Internal", "Group9"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1172, 0, "Active", "External", "Groue10"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1173, 11, "Active", "External", "Group11"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group12"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group13"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group14"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group15"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group16"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group17"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group18"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group19"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group20"));
            groupListLocal.add(new GroupType("W137651", "W137651", "Group Role Discription", new Date(), new Date(), 2, 1174, 0, "In Prearation", "Internal", "Group21"));
        }

        /* Filter Code Start */
        List<GroupType> groupNameList = new ArrayList<GroupType>();
        List<GroupType> groupTypeList = new ArrayList<GroupType>();
        if ((!StringUtils.isEmpty(groupName) && !"*".equalsIgnoreCase(groupName)) || !StringUtils.isEmpty(groupType))
        {
            for (GroupType r : groupListLocal)
            {
                if (!StringUtils.isEmpty(groupName) && !"*".equalsIgnoreCase(groupName))
                {
                    if (r.getName().equalsIgnoreCase(groupName))
                        groupNameList.add(r);
                }
                if (!StringUtils.isEmpty(groupType))
                {
                    if (r.getType().equalsIgnoreCase(groupType))
                        groupTypeList.add(r);
                }
            }
            if (CollectionUtils.isNotEmpty(groupNameList) && CollectionUtils.isNotEmpty(groupTypeList))
            {
                List<GroupType> groupFinalList = new ArrayList<GroupType>(groupNameList);
                groupFinalList.retainAll(groupTypeList);
                finalGroupList.addAll(groupFinalList);
            }
            else if (CollectionUtils.isEmpty(groupTypeList))
            {
                finalGroupList.addAll(groupNameList);
            }
            else if (CollectionUtils.isEmpty(groupNameList))
            {
                finalGroupList.addAll(groupTypeList);
            }
        }
        else
        {
            finalGroupList.addAll(groupListLocal);
        }
        /* Filter Code End */

        ServiceResult<GroupType> serviceResult = new ServiceResult<GroupType>(finalGroupList.size(), 10, draw++, "0", "");
        if (sortingMap.size() != 0)
        {
            try
            {
                SortedPage<GroupType> sortedList = new SortedPage<GroupType>(finalGroupList, new HashMap<String, Object>());
                List<GroupType> groupFinalList = sortedList.getMultipleSortedList(sortingMap, finalGroupList, start, pageSize);
                serviceResult.setAoData(groupFinalList);
            }
            catch (Cust360UIException e)
            {
                logger.info("Group list service returning data.." + e.getErrorMessage());
            }
        }
        else
        {
            try
            {
                Map<String, Object> sortParams = new HashMap<String, Object>();
                sortParams.put("start", start);
                sortParams.put("limit", pageSize);
                SortedPage<GroupType> sortedList = new SortedPage<GroupType>(finalGroupList, sortParams);
                serviceResult.setAoData(sortedList.getList());
            }
            catch (Cust360UIException e)
            {
                logger.info("Group list service returning data.." + e.getErrorMessage());
            }
            logger.info("Group list service returning data..");
        }

        return serviceResult;
    }

}
