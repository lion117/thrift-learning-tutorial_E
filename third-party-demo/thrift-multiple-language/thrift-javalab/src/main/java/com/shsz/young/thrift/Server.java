package com.shsz.young.thrift;

import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.server.THsHaServer;
import org.apache.thrift.transport.TFramedTransport;
import org.apache.thrift.transport.TNonblockingServerSocket;
import org.apache.thrift.transport.TTransportException;

import com.shsz.young.thrift.proto.UserStorage;

public class Server {
	public static void main(String... args) {
		start();
	}

	private static void start() {
		try {
			TNonblockingServerSocket serverTransport = new TNonblockingServerSocket(9090);
			UserStorage.Processor<UserBiz> processor = new UserStorage.Processor<UserBiz>(
					new UserBiz());
			THsHaServer server = new THsHaServer(
					new THsHaServer.Args(serverTransport)
							.processor(processor)
							.transportFactory(new TFramedTransport.Factory())
							.protocolFactory(
									new TBinaryProtocol.Factory(true, true)));
			System.out.println("Starting server on port 9090 ...");
			server.serve();

		} catch (TTransportException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
