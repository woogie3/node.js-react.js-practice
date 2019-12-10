package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import util.JDBCUtil;
import vo.BookVO;
/*
 *  DAO로 시작한다면 DB를 연동해 프로젝트를 진행하는데 정해진? 프로토콜? 규칙같은거다. 
 *  프로그래머들이 프로젝트에 들어갈시 DB를 연동해야하기에 _DAO,_SERVICE,_VO는
 *  항상 DB를 연동하고 있다는것을 염두해두자!! 
 *  
 *  반드시 DB를 연동하기 위해서는 DAO를 거쳐야 한다.
 *  
 *  serviceimpl는 서번트객체(server)에서 사용되기에 함부로 이름을 변경하면 안된다.
 *  
 *  Data access Layer < - > Data service Layer < - > Clients Layer
 *  DAO(재료들 & ETC),VO		SERVICE(=ex.메뉴판)		 APP(=ex.메뉴에만 있는 음식)
 */
public class BookDAO{
	
	public List<BookVO> getBookRec(){
		String sql =
//				"select * from ( " + 
				"select rownum row#, bookid, bookname, publisher, price " + 
				"from (select * from Book order by bookid)";
//				") where row# between ? and ? ";
		
		List<BookVO> list = new ArrayList<BookVO>();
		
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			// ? 세팅
//			ps.setInt(1, 1);
//			ps.setInt(2, 5);
			//실행 및 결과값 핸들링
			rs = ps.executeQuery();
			while (rs.next()) { // #row mapping
				BookVO vo = new BookVO();
				vo.setBookid(rs.getInt("bookid"));
				vo.setBookname(rs.getString("bookname"));
				vo.setPublisher(rs.getString("publisher"));
				vo.setPrice(rs.getInt("price"));
				
				list.add(vo);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JDBCUtil.close(con, ps, rs);
		}
		
		
		return list;
	}
	
	public int insertBook(BookVO vo) {
		
		String sql = "INSERT INTO Book(bookid, bookname, publisher, price) VALUES(?,?,?,?)";
		
		Connection con = null;
		PreparedStatement ps = null;
		int result = 0;
		
		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			// ? 세팅
			ps.setInt(1, vo.getBookid());
			ps.setString(2, vo.getBookname());
			ps.setString(3, vo.getPublisher());
			ps.setInt(4, vo.getPrice());
			//실행 및 결과값 핸들링
			ps.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JDBCUtil.close(con, ps, null);
		}
		return result;
	}
	
	
	public int updateBook(BookVO vo) {
		
		String sql = "UPDATE Book SET price = ? WHERE bookid = ?";
		
		Connection con = null;
		PreparedStatement ps = null;
		int result = 0;
		
		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			// ? 세팅
			ps.setInt(1, vo.getBookid());
			ps.setString(2, vo.getBookname());
			ps.setString(3, vo.getPublisher());
			ps.setInt(4, vo.getPrice());
			//실행 및 결과값 핸들링
			ps.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JDBCUtil.close(con, ps, null);
		}
		return result;
	}
	
	public int deleteBook(int bookid) {
		
		String sql = "delete from book where bookid = ? ";
		Connection con = null;
		PreparedStatement ps = null;
		int result = 0;
		
		try {
			con = JDBCUtil.getConnection();
			ps = con.prepareStatement(sql);
			// ? 세팅
			ps.setInt(1, bookid);
		
			
			//실행 및 결과값 핸들링
			result = ps.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JDBCUtil.close(con, ps, null);
		}
		return result;
		
	}
	
	/*
	 * INSERT INTO Book(bookid, bookname, publisher, price)
	 * VALUES(?,?,?,?);
	 * 
	 * delete from book where bookid = ?;
	 * 
	 * UPDATE Book SET proce = ? WHERE bookid = ?;
	 * 
	 * 
	 * select * from (  
				"select rownum row#, bookid, bookname, publisher, price "
				 "from (select * from dept order by deptno) "  
				) where row# between ? and ?
				
				select * from Book order by bookid
				
				select count(*) from book;
	 */
	

}
