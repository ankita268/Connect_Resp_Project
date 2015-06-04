package org.nw.core.models;

//import com.bgx.connect.foundation.utilities.SAPLogger;

@SuppressWarnings("serial")
public class Cust360UIException extends ConnectException {

	public Cust360UIException(Exception e, int errorCode, String msg1,
			String msg2, String msg3, String msg4,
			String msg5, String msg6) {
		super(e);
	//	SAPLogger.logError(e, msg1, msg2, msg3, msg4, msg5, msg6);
		// TODO Auto-generated constructor stub
	}
	 
	public Cust360UIException(Exception e, String className, String method,String params, String uiErrorMessage){
		super(e);
//		SAPLogger.logError(e, msg1, msg2, msg3, msg4, msg5, msg6);
			// TODO Auto-generated constructor stub
	}

	
}
