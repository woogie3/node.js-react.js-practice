<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="./css/foodshop_main.css" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">


		

<title>selected foodShop page</title>
	
</head>
<body>	
	<!-- header -->
		<%@include file="../common/header.jsp" %>

		<!--메인 컨텐츠 -->

		<!-- 컨텐츠 제목 -->
		<article id="main">
		
		<header class="main_header">
			<div>
				<ul class="main_header_collection">
					<li class="img_list_style">
					<img src="./image/restaurant1.jpg"
					 class="restaurant_img_style">
					 </li>
					<li class="img_list_style">
					<img src="./image/restaurant1_menu.jpg"
					 class="restaurant_img_menu_style">
					 </li>
				</ul>
			</div>
		</header>
		
		<!--컨텐츠 내용-->
			<section class="restaurant-content_all">
					<div class="restaurant_content_main">
						<div class="restaurant_content">
							<section class="restaurant_content_detail">
								<p class="restaurant_content_style"> --------음식종류------- </p>
								<p class="restaurant_content_style"> --------위치------- </p>
								<p class="restaurant_content_style"> --------공휴일------- </p>
								<p class="restaurant_content_style"> --------전화번호------- </p>
							</section>
						</div>	
							<!--리뷰리스트-->
							<section class="restaurantReviewList_all">
								<header class="restaurantReviewList_Header">
								<h2 class="restaurantReviewList_Header_Title">**리뷰 리스트**</h2>
								<ul class="restaurantReviewList_FilterList">
									<li class="restaurantReviewList_FiterItem">
									<button class="restaurantReviewList_FilterButton">
									전체
									<span class="restaurantReviewList_ReviewCount">
									79
									</span>
									</button>
									</li>
									<li class="restaurantReviewList_FiterItem">
									<button class="restaurantReviewList_FilterButton">
									전체
									<span class="restaurantReviewList_ReviewCount">
									79
									</span>
									</button>
									</li>
									<li class="restaurantReviewList_FiterItem">
									<button class="restaurantReviewList_FilterButton">
									맛있다
									<span class="restaurantReviewList_ReviewCount">
									43
									</span>
									</button>
									</li>
									<li class="restaurantReviewList_FiterItem">
									<button class="restaurantReviewList_FilterButton">
									괜찮다
									<span class="restaurantReviewList_ReviewCount">
									23
									</span>
									</button>
									</li>
									<li class="restaurantReviewList_FiterItem">
									<button class="restaurantReviewList_FilterButton">
									별로
									<span class="restaurantReviewList_ReviewCount">
									13
									</span>
									</button>
									</li>
								</ul>
							</header>
							
							
							<!--리뷰리스트내용들-->
							<ul class="review_list_main">
							 <li class="review_list_main_item">
								 <span class="username_review">user_name</span>
								 <span class="user_review_date">-----리뷰등록날짜------</span>
								 <div class="">
									 <h3 class="user_review_content"><p class="review_content">-----리뷰내용------</p></h3>>
								 	<ul>
									 <li class="user_review_img_collection"><img src="리뷰이미지1" class="review_list_image"></li>
									 <li class="user_review_img_collection"><img src="리뷰이미지2" class="review_list_image"></li>
									 <li class="user_review_img_collection"><img src="리뷰이미지3" class="review_list_image"></li>
									 <li class="user_review_img_collection"><img src="리뷰이미지4" class="review_list_image"></li>
									</ul>								
								</div>
								 <div class="user_review_rating_grade">맛있다<span class="">맛있다/괜춘/별로</span></div>
							 </li>	

							
							</ul>
							</section>
						</div>
						<!-- 사이드컨텐츠 -->
						<div class="side-wrap">
							<!--지도-->
		<div id="map" style="width:800px;height:700px;"></div>
<script  type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cf7b76e3a2c369d74d6fed8c89980981"></script>
		<script>
		var container = document.getElementById('map');
		var options = { //지도를 생성할 때 필요한 기본 옵션
				center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
				level: 3 //지도의 레벨(확대, 축소 정도)
			};
		var map = new kakao.maps.Map(container, options); 		
		</script>
							<div class="map-container">
								<div class="map_layer"></div>
							</div>
						</div>
			</section>
		</article>
		<!-- footer -->
	<%@include file="../common/footer.jsp" %>

</body>
</html>
			<script src="./js/jquery.min.js"></script>
			<script src="./js/jquery.dropotron.min.js"></script>
			<script src="./js/jquery.scrolly.min.js"></script>
			<script src="./js/jquery.scrollgress.min.js"></script>
			<script src="./js/jquery.scrollex.min.js"></script>
			<script src="./js/browser.min.js"></script>
			<script src="./js/breakpoints.min.js"></script>
			<script src="./js/util.js"></script>
			<script src="./js/.js"></script>
			<script src="./js/amp-analytics-0.1.js"></script>
			<script src="./js/analytics.js"></script>
			<script src="./js/atrk.js"></script>
			<script src="./js/branch_latest.min.js"></script>
			<script src="./js/am4ads_host_v0.js"></script>
			<script src="./js/amp4adsv0.js"></script>
			<script src="./js/sdk2.js"></script>
			<script src="./js/sdk1.js"></script>
			<script src="./js/restaurant_first_load.js"></script>
			<script src="./js/restaurant.js"></script>
			<script src="./js/vendor_no_jquery.all.min.js"></script>
			<script src="./js/kakao_sdk_open.js"></script>
			<script src="./js/gpt.js"></script>
			<script src="./js/pubads_impl.js"></script>
			<script src="./js/pubads_impl_rendering.js"></script>
			<script src="./js/restaurant_detail_all.js"></script>
<noscript><link rel="stylesheet" href="./css/noscript.css" /></noscript>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>