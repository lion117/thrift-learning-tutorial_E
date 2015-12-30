# -*- coding: utf-8 -*- 

from com.shsz.young.thrift.proto import UserStorage
from com.shsz.young.thrift.proto.constants import *

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

try:
  transport = TSocket.TSocket('localhost', 9090)
  transport = TTransport.TFramedTransport(transport)
  protocol = TBinaryProtocol.TBinaryProtocol(transport)
  
  client = UserStorage.Client(protocol)
  transport.open()

  user = UserProfile(1, 'Jeff郭', 'blahblah')
  client.store(user)
  
  user2 = client.retrieve(1)
  
  print user2
  
  transport.close()
except Thrift.TException, tx:
  print '%s' % (tx.message)    