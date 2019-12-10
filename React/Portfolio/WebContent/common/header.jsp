<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link rel="stylesheet" href="./css/main.css" />
<header id="header"> 
				<h1 id="logo"><a href="main.html"><span> 상호명 </span></a></h1>
					<nav id="nav">
				<ul>
					<li class=""><a href="main.html">HOME</a></li>
					<li><a href="#">EAT딜</a></li>
					<li><a href="#">맛집 리스트</a></li>
				<c:if test="${empty login}">
					<li><a href="./login.jsp">LogIN</li>
					</c:if>
				<c:if test="${!empty login}">
					<li><a href="#">마이페이지</a></li>
					<li><a href="#">LogOUT</a></li>
				</c:if>
				</ul>		
					</nav>
		</header>