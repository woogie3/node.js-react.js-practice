package Service;

import dao.UsersDao;
import vo.UsersVO;

public class UsersServiceImpl implements UsersService {
	UsersDao dao;

	public UsersServiceImpl() {}

	public UsersServiceImpl(UsersDao dao) {
		this.dao = dao;
	}

	public UsersDao getDao() {
		return dao;
	}

	public void setDao(UsersDao dao) {
		this.dao = dao;
	}

	@Override
	public UsersVO loginUsers(UsersVO user) {
		return dao.loginUsers(user);
	}

	@Override
	public int addUsers(UsersVO user) {
		return dao.addUsers(user);
	}
	@Override
	public boolean checkUsers(UsersVO user) {
		return dao.checkUsers(user);
	}

	
	
	
	
	
	
}
