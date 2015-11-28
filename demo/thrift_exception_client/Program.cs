using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THRIFT;
using Thrift.Protocol;
using Thrift;
using Thrift.Transport;
using Thrift.Server;
using System.Threading;

//@-essential add code line



namespace thrift_exception_client
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("thrift client  start");
            testThrift_rname_fuck();


            Console.ReadLine();
        }

        /// <summary>
        /// ///////////////////////////
        /// ///////////////
        /// 
        /// 
        /// </summary>
        static void testThrift_rname_fuck()
        {

            TTransport i_socket = new TSocket("192.168.15.134", 8081);
            TProtocol i_protocol = null;
            RPCNetwork.Client i_client = null;
            try
            {
                i_socket.Open();
                i_protocol = new TBinaryProtocol(i_socket);
                i_client = new RPCNetwork.Client(i_protocol);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            while (true)
            {
                Thread.Sleep(1000);
                Console.WriteLine("trigger....");
                try
                {
                    Console.WriteLine(i_client.sayHi());
                }
                catch (Error ex)
                {
                    Console.WriteLine(ex._message);
                }
            }



        }
    }
}
