tutorial for thrift 


compatibility with XP 


## C++ 兼容XP 系统
> 由于thrift 默认使用了WIN7 的网络通信库, 导致thrift无法兼容XP.   笔者使用的thrift 0.9.2 版本库, 在XP 下运行时, 系统提示无法定位 **WS2_32.dll** , 经过多番讨论和源码研究之后, 发现这是官方的一个bug所致. 之前也有很多人提及到这个bug的存在, 但是因为国外 XP的覆盖率太低, 这个bug 到thrift 0.9.3 均未解决. 
### thrift 兼容XP 系统的解决方案
 首先定位thrift源码中的 
 ***thrift-0.9.2\lib\cpp\src\thrift\windows\WinFcntl.cpp*** 
此文件根据系统的版本的不同, 定义不同的网络通信方案. 通过源码可得知,其实官方的thrift在开发之初是有直接支持XP 系统的, 只是因为bug 的原因,  所有的系统均调用了
*** WSAPoll(fdArray, nfds, timeout);*** 这个函数, 导致软件无法在XP运行. 
既然知道了这个原因, 从最小修改代码的角度出发, 既然thrift 源码无法对系统 **_WIN32_WINNT ** 有效的识别, 那么直接强制thrift 均采用 XP 模式下的网络通信方案,即可解决兼容XP 的问题

``` C++
/// 需要屏蔽此行
#if _WIN32_WINNT <= 0x0502 //XP, Server2003     
/// 需要屏蔽此行
int thrift_poll(THRIFT_POLLFD *fdArray, ULONG nfds, INT timeout)
{
  fd_set read_fds, write_fds;
  fd_set* read_fds_ptr  = NULL;
  fd_set* write_fds_ptr = NULL;

  FD_ZERO(&read_fds);
  FD_ZERO(&write_fds);

  for(ULONG i=0; i<nfds; i++) {
    //Read (in) socket
    if((fdArray[i].events & THRIFT_POLLIN) == THRIFT_POLLIN) {
      read_fds_ptr = &read_fds;
      FD_SET(fdArray[i].fd, &read_fds);
    }
    //Write (out) socket
    else if((fdArray[i].events & THRIFT_POLLOUT) == THRIFT_POLLOUT) {
      write_fds_ptr = &write_fds;
      FD_SET(fdArray[i].fd, &write_fds);
    }
  }

  timeval time_out;
  timeval* time_out_ptr = NULL;
  if(timeout >= 0) {
    timeval time_out = {timeout / 1000, (timeout % 1000) * 1000};
    time_out_ptr = &time_out;
  }
  else { //to avoid compiler warnings
    (void)time_out;
    (void)timeout;
  }

  int sktready = select(1, read_fds_ptr, write_fds_ptr, NULL, time_out_ptr);
  if(sktready > 0) {
    for(ULONG i=0; i<nfds; i++) {
      fdArray[i].revents = 0;
      if(FD_ISSET(fdArray[i].fd, &read_fds))
        fdArray[i].revents |= THRIFT_POLLIN;
      if(FD_ISSET(fdArray[i].fd, &write_fds))
        fdArray[i].revents |= THRIFT_POLLOUT;
    }
  }
  return sktready;
}

//// 需要屏蔽 , 此宏定义根据系统版本采用不同的通信机制
#else //Vista, Win7...    
int thrift_poll(THRIFT_POLLFD *fdArray, ULONG nfds, INT timeout)
{
  return WSAPoll(fdArray, nfds, timeout);
}
#endif // WINVER
//// 需要屏蔽
```


##兼容性方案总结
> 通过屏蔽以上几行代码, 亲测可实现兼容XP 的功能.  但是听大神提示说, XP 模式下的网络效率 比 采用 WIN7  **WSAPoll(fdArray, nfds, timeout);** 系统库的效率要低. 毕竟XP 是2000年的产品. 

通过探讨交流, 有大神提出在现有的基础直接采用boost 网络库的方案, 以解决通信效率的问题. 

```
int thrift_poll(THRIFT_POLLFD *fdArray, ULONG nfds, INT timeout) 
{  
    fd_set read_fds;  
    fd_set write_fds;  
    fd_set except_fds;  
  
    FD_ZERO(&read_fds);  
    FD_ZERO(&write_fds);  
    FD_ZERO(&except_fds);  
  
    FD_SET(fdArray[0].fd, &read_fds);  
    FD_SET(fdArray[0].fd, &write_fds);  
    FD_SET(fdArray[0].fd, &except_fds);  
  
    timeval time_out = {timeout * 0.001, timeout * 1000};  
    // 下列select库为boost网络库
    return select(1, &read_fds, &write_fds, &except_fds, &time_out);   
}    