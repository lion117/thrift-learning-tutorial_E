# -*- coding: utf-8 -*- 

from com.shsz.young.thrift.proto import UserStorage
from com.shsz.young.thrift.proto.constants import *
from com.shsz.young.thrift.UserBiz import UserBiz

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

from socket import *

handler = UserBiz()
processor = UserStorage.Processor(handler)
transport = TSocket.TServerSocket('localhost', 9090)
tfactory = TTransport.TFramedTransportFactory()
pfactory = TBinaryProtocol.TBinaryProtocolFactory()

server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)
#server = TNonblockingServer.TNonblockingServer(processor, transport, tfactory, pfactory)

print 'Starting the server...'
server.serve()
print 'done.'