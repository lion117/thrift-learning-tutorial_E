# -*- coding: utf-8 -*- 
$:.push('lib')

require 'thrift'
require 'user_storage'
require 'user_constants'
require './user_biz'

include ::UserThrift

handler = UserBiz.new()
processor = UserStorage::Processor.new(handler)
transport = Thrift::ServerSocket.new('localhost', 9090)
tFactory = Thrift::FramedTransportFactory.new()
pFactory = Thrift::BinaryProtocolFactory.new()
server = Thrift::SimpleServer.new(processor, transport, tFactory, pFactory)

puts "Starting the server..."
server.serve()
puts "done." 
