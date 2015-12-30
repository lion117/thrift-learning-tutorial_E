# -*- coding: utf-8 -*- 
$:.push('lib')

require 'thrift'
require 'user_storage'
require 'user_constants'

include ::UserThrift
begin
  port = ARGV[0] || 9090

  transport = Thrift::FramedTransport.new(Thrift::Socket.new('localhost', port))
  protocol = Thrift::BinaryProtocol.new(transport)
  client = UserStorage::Client.new(protocol)

  transport.open()

  user = UserProfile.new()
  user.uid = 1
  user.name = "john李" 
  user.blurb = "blahblahhhhh"

  begin
    client.store(user)
    p "user: #{user.inspect}"
  rescue InvalidOperation => io
    print "InvalidOperation: ", io.why, "\n"
  end
  
  begin
    user = client.retrieve(1)
    p "user: #{user.inspect}"
  rescue InvalidOperation => io
    print "InvalidOperation: ", io.why, "\n"
  end

  transport.close()

rescue Thrift::Exception => tx
  print 'Thrift::Exception: ', tx.message, "\n"
end 
