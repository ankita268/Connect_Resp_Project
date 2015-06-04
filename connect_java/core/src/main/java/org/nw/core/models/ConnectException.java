package org.nw.core.models;


@SuppressWarnings("serial")
public abstract class ConnectException extends Exception{

	private String exceptionType;
	private String uiError;
	
	private int errorCode; 
	private String errorMessage;	
	private String stackTraceKey;

	private String stackTraceLog;
	private String userErrorMessage;
	private String inputArguments;
	
	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getStackTraceKey() {
		return stackTraceKey;
	}

	public void setStackTraceKey(String stackTraceKey) {
		this.stackTraceKey = stackTraceKey;
	}





	public String getUserErrorMessage() {
		return userErrorMessage;
	}

	public void setUserErrorMessage(String userErrorMessage) {
		this.userErrorMessage = userErrorMessage;
	}

	public ConnectException(Exception e)
	{
		super(e);
	}

	public ConnectException(String message)
	{

		super(message);
	}

	public void setExceptionType(String exceptionType) {
		this.exceptionType = exceptionType;
	}

	public String getExceptionType() {
		return exceptionType;
	}

	public void setUiError(String uiError) {
		this.uiError = uiError;
	}

	public String getUiError() {
		return uiError;
	}

	public void logException() {
		
		
	}

	public void setStackTraceLog(String stackTraceLog) {
		this.stackTraceLog = stackTraceLog;
	}

	public String getStackTraceLog() {
		return stackTraceLog;
	}

	public void setInputArguments(String inputArguments) {
		this.inputArguments = inputArguments;
	}

	public String getInputArguments() {
		return inputArguments;
	}
	
	
	
	
}
