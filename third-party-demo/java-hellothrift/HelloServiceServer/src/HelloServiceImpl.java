/**
 * Created by LEO on 2015/4/30.
 */
package service.demo;
import org.apache.thrift.TException;
public class HelloServiceImpl implements Hello.Iface {
    @Override
    public boolean helloBoolean(boolean para) throws TException {
        return para;
    }
    @Override
    public int helloInt(int para) throws TException {
        try {
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return para;
    }
    @Override
    public String helloNull() throws TException {
        return null;
    }
    @Override
    public String helloString(String para) throws TException {
        System.out.println("recive data from client ");
        System.out.println(para);

        return "server recieved data:  " + para ;
    }
    @Override
    public void helloVoid() throws TException {
        System.out.println("Hello World");
    }
}