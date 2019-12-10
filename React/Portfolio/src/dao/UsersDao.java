package dao;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import util.JDBCUtil;
import vo.UsersVO;

public class UsersDao {

	public UsersDao() {

	}

	

	public int addUsers(UsersVO user) {
		int result = 0;
		Connection con = null;
		PreparedStatement ps = null;
		String sql = "insert into users values (?,?,?,?) ";

		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, user.getId());
			ps.setString(2, user.getPassword());
			ps.setString(3, user.getName());
			ps.setString(4, user.getRole());
			result = ps.executeUpdate();
		

		} catch (Exception e) {
			
		} finally {
			JDBCUtil.close(con, ps, null);
		}
		return result;
	}

	public UsersVO loginUsers(UsersVO user) { 
		
		UsersVO vo = null;
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement ps = null;
		String sql = "select * from users where id= ? and password = ? ";

		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, user.getId());
			ps.setString(2, user.getPassword());
			rs = ps.executeQuery();
			if(rs.next()) {
				vo = new UsersVO();
				vo.setId(rs.getString("id"));
				vo.setPassword(rs.getString("password"));
				vo.setName(rs.getString("name"));
				vo.setRole(rs.getString("role"));
			}

		} catch (Exception e) {
		} finally {
			JDBCUtil.close(con, ps, rs);
		}
		return vo;
	}
	public boolean checkUsers(UsersVO user) {
		boolean result = false;
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = " select * from users where id = ?";

		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, user.getId());
			rs = ps.executeQuery();
			if(rs.next()) {
				result = true;
			}

		} catch (Exception e) {
			
		} finally {
			JDBCUtil.close(con, ps, null);
		}
		return result;
	}

	

}

