# -*- coding: utf-8 -*- 
$:.push('lib')

class UserBiz
  def initialize()
    @users = {}
  end

  def store(u)
    puts "user: #{u.inspect}"
    @users[u.uid] = u
  end

  def retrieve(uid)
    u = @users[uid]
    puts "user: #{u.inspect}"
    return u
  end
end 

if __FILE__ == $0
  $:.unshift File.dirname(__FILE__) + '/lib'
  require 'thrift'
  require 'user_constants'
  include ::UserThrift

  user = UserProfile.new()   
  user.uid = 1               
  user.name = "john李"       
  user.blurb = "blahblahhhhh"

  ub = UserBiz.new()
  ub.store(user)
  puts ub.retrieve(1).inspect
end
