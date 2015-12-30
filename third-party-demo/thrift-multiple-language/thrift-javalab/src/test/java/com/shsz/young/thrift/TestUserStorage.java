package com.shsz.young.thrift;

import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TFramedTransport;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;
import org.junit.Test;

import com.shsz.young.thrift.proto.UserProfile;
import com.shsz.young.thrift.proto.UserStorage;

public class TestUserStorage {

	@Test
	public void testClient() {
		TTransport transport = new TFramedTransport(new TSocket("localhost",
				9090, 1000));
		try {
			transport.open();
		} catch (TTransportException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		TProtocol protocol = new TBinaryProtocol(transport);

		UserStorage.Client client = new UserStorage.Client(protocol);
		try {
			client.store(new UserProfile(1, "张三", "blahblah"));
			System.out.println(client.retrieve(1));
		} catch (TException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
