package json_jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import util.JDBCUtil;



public class JsonDB {
	public static void main(String[] args) {
		System.out.println(getJsonDept("20"));
		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		System.out.println(getAllJsonDept());
	}
	
	
	
	public static String getAllJsonDept() {
		String sql = "select * from dept";
		
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		JSONArray array = new JSONArray();
		Map<String, String> map = new HashMap<String, String>(); //맵핑으로 결과값을 핸들링 하는데 필요하기에 HashMap()을 사용했다.
		
		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			
			rs = ps.executeQuery();
			while (rs.next()) {
				map.put("deptno", rs.getString("deptno")); //맵안에 db에서 가져온 테이블내용을 맵핑!
				map.put("dname", rs.getString("dname"));
				map.put("loc", rs.getString("loc"));
				
				JSONObject obj = new JSONObject(map);
				array.add(obj);
				
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}finally {
			JDBCUtil.close(con, ps, rs);;
		}
		return JSONArray.toJSONString(array);	//json객체로 맵핑한 결과값을 배열로 돌려받음
	}

	public static String getJsonDept(String deptno) {
		String sql = "select * from dept where deptno = ?";
	
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
	
		Map<String, String> map = new HashMap<String, String>(); //맵핑으로 결과값을 핸들링 하는데 필요하기에 HashMap()을 사용했다.
	
		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, deptno);
		
			rs = ps.executeQuery();
			while (rs.next()) {
				map.put("deptno", rs.getString("deptno")); //맵안에 db에서 가져온 테이블내용을 맵핑!
				map.put("dname", rs.getString("dname"));
				map.put("loc", rs.getString("loc"));
				
			}
		
	} catch (Exception e) {
		System.out.println(e.getMessage());
	}finally {
		JDBCUtil.close(con, ps, rs);;
	}
	return JSONObject.toJSONString(map);	//json객체로 맵핑한 결과값을 스트링화시켜서 값을 돌려받는다.
}

public static String idCheck(String id) {
	String sql = "select * from users where id = ?";

	Connection con = null;
	PreparedStatement ps = null;
	ResultSet rs = null;

	Map<String, String> map = new HashMap<String, String>(); //맵핑으로 결과값을 핸들링 하는데 필요하기에 HashMap()을 사용했다.

	try {
		con = JDBCUtil.getConnection();
		ps = con.prepareStatement(sql);
		ps.setString(1, id);
	
		rs = ps.executeQuery();
		while (rs.next()) {
			map.put("id", rs.getString("id")); //맵안에 db에서 가져온 테이블내용을 맵핑!
			map.put("password", rs.getString("password"));
			map.put("name", rs.getString("name"));
			map.put("role", rs.getString("role"));
			
		}
	
} catch (Exception e) {
	System.out.println(e.getMessage());
}finally {
	JDBCUtil.close(con, ps, rs);;
}
return JSONObject.toJSONString(map);	//json객체로 맵핑한 결과값을 스트링화시켜서 값을 돌려받는다.
}
}
