//
// Autogenerated by Thrift Compiler (0.8.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./user_types');
//HELPER FUNCTIONS AND STRUCTURES

var UserStorage_store_args = function(args) {
  this.user = null;
  if (args) {
    if (args.user !== undefined) {
      this.user = args.user;
    }
  }
};
UserStorage_store_args.prototype = {};
UserStorage_store_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.user = new ttypes.UserProfile();
        this.user.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UserStorage_store_args.prototype.write = function(output) {
  output.writeStructBegin('UserStorage_store_args');
  if (this.user) {
    output.writeFieldBegin('user', Thrift.Type.STRUCT, 1);
    this.user.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var UserStorage_store_result = function(args) {
};
UserStorage_store_result.prototype = {};
UserStorage_store_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UserStorage_store_result.prototype.write = function(output) {
  output.writeStructBegin('UserStorage_store_result');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var UserStorage_retrieve_args = function(args) {
  this.uid = null;
  if (args) {
    if (args.uid !== undefined) {
      this.uid = args.uid;
    }
  }
};
UserStorage_retrieve_args.prototype = {};
UserStorage_retrieve_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.uid = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UserStorage_retrieve_args.prototype.write = function(output) {
  output.writeStructBegin('UserStorage_retrieve_args');
  if (this.uid) {
    output.writeFieldBegin('uid', Thrift.Type.I32, 1);
    output.writeI32(this.uid);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var UserStorage_retrieve_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
UserStorage_retrieve_result.prototype = {};
UserStorage_retrieve_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.UserProfile();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UserStorage_retrieve_result.prototype.write = function(output) {
  output.writeStructBegin('UserStorage_retrieve_result');
  if (this.success) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var UserStorageClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
UserStorageClient.prototype = {};
UserStorageClient.prototype.store = function(user, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_store(user);
};

UserStorageClient.prototype.send_store = function(user) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('store', Thrift.MessageType.CALL, this.seqid);
  var args = new UserStorage_store_args();
  args.user = user;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserStorageClient.prototype.recv_store = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserStorage_store_result();
  result.read(input);
  input.readMessageEnd();

  callback(null)
};
UserStorageClient.prototype.retrieve = function(uid, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_retrieve(uid);
};

UserStorageClient.prototype.send_retrieve = function(uid) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('retrieve', Thrift.MessageType.CALL, this.seqid);
  var args = new UserStorage_retrieve_args();
  args.uid = uid;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserStorageClient.prototype.recv_retrieve = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserStorage_retrieve_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('retrieve failed: unknown result');
};
var UserStorageProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
UserStorageProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

UserStorageProcessor.prototype.process_store = function(seqid, input, output) {
  var args = new UserStorage_store_args();
  args.read(input);
  input.readMessageEnd();
  var result = new UserStorage_store_result();
  this._handler.store(args.user, function (success) {
    result.success = success;
    output.writeMessageBegin("store", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

UserStorageProcessor.prototype.process_retrieve = function(seqid, input, output) {
  var args = new UserStorage_retrieve_args();
  args.read(input);
  input.readMessageEnd();
  var result = new UserStorage_retrieve_result();
  this._handler.retrieve(args.uid, function (success) {
    result.success = success;
    output.writeMessageBegin("retrieve", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

