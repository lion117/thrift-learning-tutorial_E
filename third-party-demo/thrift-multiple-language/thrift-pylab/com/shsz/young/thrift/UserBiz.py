# -*- coding: utf-8 -*- 

if __name__ == '__main__':
  # test with Spyder
  import os, sys
  p = os.path.split(os.path.realpath(__file__))[0]
  sys.path.append('%s/%s' % (p, '../../../..'))
  
from com.shsz.young.thrift.proto.constants import *

class UserBiz:
  def __init__(self):
    self.users = {}
  
  def store(self, user):
    print 'stored: %s' % user
    self.users[user.uid] = user
    
  def retrieve(self, uid):
    return self.users[uid]
    
if __name__ == '__main__':
  user = UserProfile(1, 'jeff', 'blahblah')
  s = UserBiz()
  s.store(user)
  print s.retrieve(user.uid)