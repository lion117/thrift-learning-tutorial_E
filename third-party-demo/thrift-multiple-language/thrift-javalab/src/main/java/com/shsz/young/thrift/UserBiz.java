package com.shsz.young.thrift;

import java.util.HashMap;

import org.apache.thrift.TException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.shsz.young.thrift.proto.UserProfile;
import com.shsz.young.thrift.proto.UserStorage;

public class UserBiz implements UserStorage.Iface {
	private static Logger logger = LoggerFactory.getLogger(UserBiz.class);
	private static HashMap<Integer, UserProfile> users = new HashMap<Integer, UserProfile>();

	@Override
	public void store(UserProfile user) throws TException {
		users.put(new Integer(user.uid), user);
		logger.info(String.format("store: %s", user));
	}

	@Override
	public UserProfile retrieve(int uid) throws TException {
		logger.info(String.format("retrieve: %s", uid));
		return users.get(new Integer(uid));
	}

}
