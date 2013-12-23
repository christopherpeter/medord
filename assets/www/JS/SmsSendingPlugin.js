

cordova.define("cordova/plugin/smssendingplugin", function(require, exports, module) {
  var exec = require('cordova/exec');
  var SmsSendingPlugin = function() {};

  /**
   * Check if the device has a possibility to send and receive SMS
   */
  SmsSendingPlugin.prototype.isSupported = function (successCallback, failureCallback) 
  {
    return exec(successCallback, failureCallback, 'SmsSendingPlugin', 'HasSMSPossibility', []);
  }
  /**
   * Send a message to the given phone number
   */
SmsSendingPlugin.prototype.send = function (phone, message, successCallback, failureCallback) 
  {
  
    return exec(successCallback, failureCallback, 'SmsSendingPlugin', 'SendSMS', [phone, message]);
  
  }

  var smssendingplugin = new SmsSendingPlugin();
  module.exports = smssendingplugin;
});



