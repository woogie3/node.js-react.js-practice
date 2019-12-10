<%@page import="Service.UsersServiceImpl"%>
<%@page import="Service.UsersService"%>
<%@page import="dao.UsersDao"%>
<%@page import="vo.UsersVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>



	<%
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
		UsersVO user = new UsersVO();
		UsersDao dao = new UsersDao();
		UsersService service = new UsersServiceImpl(dao);
		user.setId(id);
		user.setPassword(pw);
		UsersVO log = service.loginUsers(user);
		boolean data = service.checkUsers(user);
		System.out.println(data);
		
		
	%>
	
	{"log_in" : <%= log %>}
	

	{"check" : <%= data %>}
	
