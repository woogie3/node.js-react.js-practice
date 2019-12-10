package Service;

import vo.UsersVO;

public interface UsersService {
	UsersVO loginUsers(UsersVO user);
	int addUsers(UsersVO user);
	boolean checkUsers(UsersVO user);
	
}
