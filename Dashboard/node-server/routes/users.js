var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');

//mysql variables
var mysql = require('mysql');
var dbConfig = require('../config/databaseConfig.js');
var mysqlConnection = mysql.createConnection(dbConfig);

mysqlConnection.connect();


/* GET users listing. */
router.get('/', function(req, res, next) {
  var clientOptions = {
    clientId : "client1",
    clean: true
  };

  var client = mqtt.connect("mqtt://113.198.85.240:1883", clientOptions);
  var currentInterval = 5000; //서버에서 publish하는 주기
  var dataLength = 25;  //실시간 차트 한 번에 업데이트하는 데이터 개수 - cpu, mem, net, connection

  //topic이라는 주제로 구독 시작
  client.on("connect", function(){
    console.log("connected");
    client.subscribe("topic");
    console.log("subscribe start : ");

    //default interval
    console.log("current interval", currentInterval+"");
  });


  client.on("close", function(){
    console.log("disconnected");
    clearAllTimeout();
    client.end();
  });

  var cpuObj;
  var coresObj;
  var memoryObj;
  var networkObj;
  var mosquittoObj;
  var processObj;
  var msgtopicObj;
  var accumulateObj;
  var receivingPieObj;
  var sendingPieObj;
  var accumulationPieObj;
  var topicListObj;
  var subObj;
  var connectionObj;

  var count = 0;  //첫번째 publish 메시지를 연속 두 번 보내기위한 변수

  function clearAllTimeout() {
    clearTimeout(cpuObj);
    clearTimeout(coresObj);
    clearTimeout(memoryObj);
    clearTimeout(networkObj);
    clearTimeout(mosquittoObj);
    clearTimeout(processObj);
    clearTimeout(msgtopicObj);
    clearTimeout(accumulateObj);
    clearTimeout(receivingPieObj);
    clearTimeout(sendingPieObj);
    clearTimeout(accumulationPieObj);
    clearTimeout(topicListObj);
    clearTimeout(subObj);
    clearTimeout(connectionObj);
  }

  // "count;데이터개수;cpu_util;date;..."로 publish
  function cpu() {
    console.log('cpu did mount ' + count);

    //performance table - cpu
    mysqlConnection.query('select * from performance order by date desc limit ' + dataLength, function(err, result, fields){
      if(err) throw err;

      var length = result.length;
      var cpuInfo = length;

      for(var i=0;i<length;i++){
        var date = new Date(result[i].date);
        var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + "";
        var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + "";
        var dateStr = hour + ":" + min + ":" + sec;

        cpuInfo += ";" + result[i].cpu_util + ";" + dateStr;
      }
      console.log('cpuInfo : ' + cpuInfo);

      if(count == 0) {
        client.publish('performance/cpu', -1 + ";" + cpuInfo);
        client.publish('performance/cpu', count + ";" + cpuInfo);
      }
      else {
        client.publish('performance/cpu', count + ";" + cpuInfo);
      }

      console.log('cpuInfo publish successed!' + '\n');
      //count++;
    });
    cpuObj = setTimeout(cpu, currentInterval);
  }

  // "count;데이터개수;cores_util;date;..."로 publish
  function cores() {
    console.log('cores did mount ' + count);

    //performance table - cpu
    mysqlConnection.query('select * from performance order by date desc limit ' + dataLength, function(err, result, fields){
      if(err) throw err;

      var length = result.length;
      var coresInfo = length;

      for(var i=0;i<length;i++){
        var date = new Date(result[i].date);
        var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + "";
        var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + "";
        var dateStr = hour + ":" + min + ":" + sec;

        coresInfo += ";" + result[i].cores_util + ";" + dateStr;
      }
      console.log('coresInfo : ' + coresInfo);

      if(count == 0) {
        client.publish('performance/cores', -1 + ";" + coresInfo);
        client.publish('performance/cores', count + ";" + coresInfo);
      }
      else {
        client.publish('performance/cores', count + ";" + coresInfo);
      }

      console.log('coresInfo publish successed!' + '\n');
      //count++;
    });
    coresObj = setTimeout(cores, currentInterval);
  }

  // "count;totalMemory;데이터개수;memory_usage;date;..."
  function memory() {
    console.log('memory didmount');

    var totalMemory;

    //basic_info table - total memory
    mysqlConnection.query('select * from basic_info', function(err, rows){
      if(err) throw err;

      totalMemory = rows[0].total_memory;
      //console.log('\n'+'totalMemory : ' + totalMemory);
    });

    //performance table - memory
    mysqlConnection.query('select * from performance order by date desc limit ' + dataLength, function(err, result, fields){
      if(err) throw err;

      //dbPerformanceInfo = JSON.stringify(result);
      var memoryInfo;
      var length = result.length;

      memoryInfo = totalMemory + ";" + length;

      for(var i=0;i<length;i++) {
        var date = new Date(result[i].date);
        var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + "";
        var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + "";
        var dateStr = hour + ":" + min + ":" + sec;


        memoryInfo += ";" + result[i].memory_usage + ";" + dateStr;
      }

      console.log('memoryInfo : ' + memoryInfo);

      if(count == 0) {
        client.publish('performance/memory', -1 + ";" + memoryInfo);
        client.publish('performance/memory', count + ";" + memoryInfo);
      }
      else
        client.publish('performance/memory', count + ";" + memoryInfo);

      console.log('memoryInfo pubslish successed!' + '\n');
      //count++;
    });
    memoryObj = setTimeout(memory, currentInterval);
  }

  //"count;데이터개수;network_in;network_out;date;..."
  function network() {
    console.log('network didmount');

    //performance table - network
      mysqlConnection.query('select * from performance order by date desc limit ' + dataLength, function(err, result, fields){
        if(err) throw err;

        var length = result.length;
        var networkInfo = length;


        for(var i=0;i<length;i++) {
          var date = new Date(result[i].date);
          var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
          var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + "";
          var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + "";
          var dateStr = hour + ":" + min + ":" + sec;

          networkInfo += ";" + result[i].network_in + ";" + result[i].network_out + ";" + dateStr;
        }
        console.log('networkInfo : ' + networkInfo);

        if(count == 0) {
          client.publish('performance/network', -1 + ";" + networkInfo);
          client.publish('performance/network', count + ";" + networkInfo);
        }
        else
          client.publish('performance/network', count + ";" + networkInfo);

        console.log('networkInfo pubslish successed!' + '\n');
        //count++;
      });
    networkObj = setTimeout(network, currentInterval);
  }

  //"count;mosq_cpu;mosq_mem"
  function mosquitto() {
    console.log('network didmount');

    //performance table - process - mosquitto
      mysqlConnection.query('select * from process where command="mosquitto"', function(err, rows){
        if(err) throw err;

        //var length = result.length;

        //for(var i=0;i<length;i++) {
          var mosquittoInfo = rows[0].cpu_util + ";" + rows[0].memory_util;
        //}
        console.log('mosquittoInfo : ' + mosquittoInfo);

        if(count == 0) {
          client.publish('performance/mosquitto', -1 + ";" + mosquittoInfo);
          client.publish('performance/mosquitto', count + ";" + mosquittoInfo);
        }
        else
          client.publish('performance/mosquitto', count + ";" + mosquittoInfo);

        console.log('mosquittoInfo pubslish successed!' + '\n');
        //count++;
      });
      mosquittoObj = setTimeout(mosquitto, currentInterval);
  }

  //"count;전체process개수;pid;cpu_util;memory_util;command; ... "
  function processTable() {
    console.log('process didmount');

    //process table-all records send
    mysqlConnection.query('select * from process order by cpu_util desc', function(err, rows){
      if(err) throw err;

      var length = rows.length;
      var dbProcessInfo;
      dbProcessInfo = length;

      for(var i=0;i<length;i++){
        dbProcessInfo += ";" + rows[i].pid + ";" + rows[i].cpu_util + ";" +
          rows[i].memory_util + ";" + rows[i].command;
      }

      console.log('dbProcessInfo : ' + dbProcessInfo);

      if(count == 0) {
        client.publish('performance/process', -1 + ";" + dbProcessInfo);
        client.publish('performance/process', count + ";" + dbProcessInfo);
      }
      else
        client.publish('performance/process', count + ";" + dbProcessInfo);

      console.log('pubslish successed!' + '\n');
      count++;
    });
    processObj = setTimeout(processTable, currentInterval);
  }

  // "count;토픽개수;i번째토픽이름;i번째토픽의receiving;i번째토픽의sending; ... " 
  function msgtopic() {
    console.log('msgtopic didmount');

    //topic table-all records send
        mysqlConnection.query('select * from topic', function(err, rows){
          if(err) throw err;

          var length = rows.length;
          var msgtopicStr = length;

          for(var i=0; i<length; i++){
            msgtopicStr += ";"+rows[i].topic_kor+";"+ rows[i].message_receiving_count+";"+
              rows[i].message_sending_count;
          }

          console.log(msgtopicStr);

          if(count == 0) {
            client.publish('traffic/msgtopic', -1 + ";" + msgtopicStr);
            client.publish('traffic/msgtopic', count + ";" + msgtopicStr);
          }
          else
            client.publish('traffic/msgtopic', count + ";" + msgtopicStr);

          console.log('pubslish successed!');
          //count++;
        });
      msgtopicObj = setTimeout(msgtopic, currentInterval);
  }
  
  // "count;토픽개수;i번째토픽이름i번째토픽의accumulated; ... " 
  function accumulate() {
    console.log('accumulate didmount');
    //topic table-all records send
        mysqlConnection.query('select * from topic', function(err, rows){
          if(err) throw err;

          var length = rows.length;
          var accmulateStr = length;
          for(var i=0; i<length; i++){
            accmulateStr += ";"+rows[i].topic_kor+";"+ rows[i].accumulated_msg_size;
          }
          console.log('acc : ' + accmulateStr);

          if(count == 0) {
            client.publish('traffic/accumulate', -1 + ";" + accmulateStr);
            client.publish('traffic/accumulate', count + ";" + accmulateStr);
          }
          else
            client.publish('traffic/accumulate', count + ";" + accmulateStr);

          console.log('pubslish successed!');
          //count++;
        });
      accumulateObj = setTimeout(accumulate, currentInterval);

  }

  //"count;데이터개수;토픽이름;송수신횟수;..."
  function receivingPie() {
    console.log('receivingPie didmount');
    //topic table-all records send
        mysqlConnection.query('select * from topic order by message_receiving_count desc limit 3', function(err, rows){
          if(err) throw err;

          var length = rows.length;
          var receivingPieStr = length;
          for(var i=0; i<length; i++){
            receivingPieStr += ";"+rows[i].topic_kor+";"+ rows[i].message_receiving_count;
          }
          console.log('recPie : ' + receivingPieStr);

          if(count == 0) {
            client.publish('traffic/receivingPie', -1 + ";" + receivingPieStr);
            client.publish('traffic/receivingPie', count + ";" + receivingPieStr);
          }
          else
            client.publish('traffic/receivingPie', count + ";" + receivingPieStr);

          console.log('pubslish successed!');
          //count++;
        });
      receivingPieObj = setTimeout(receivingPie, currentInterval);

  }

  //"count;데이터개수;토픽이름;송수신횟수;..."
  function sendingPie() {
    console.log('sendingPie didmount');
    //topic table-all records send
        mysqlConnection.query('select * from topic order by message_sending_count desc limit 3', function(err, rows){
          if(err) throw err;

          var length = rows.length;
          var sendingPieStr = length;
          for(var i=0; i<length; i++){
            sendingPieStr += ";"+rows[i].topic_kor+";"+ rows[i].message_sending_count;
          }
          console.log('sendPie : ' + sendingPieStr);

          if(count == 0) {
            client.publish('traffic/sendingPie', -1 + ";" + sendingPieStr);
            client.publish('traffic/sendingPie', count + ";" + sendingPieStr);
          }
          else
            client.publish('traffic/sendingPie', count + ";" + sendingPieStr);

          console.log('pubslish successed!');
          //count++;
        });
      sendingPieObj = setTimeout(sendingPie, currentInterval);

  }

  //"count;데이터개수;토픽이름;송수신횟수;..."
  function accumulationPie() {
    console.log('accumulationPie didmount');
    //topic table-all records send
        mysqlConnection.query('select * from topic order by accumulated_msg_size desc limit 3', function(err, rows){
          if(err) throw err;

          var length = rows.length;
          var accumulationPieStr = length;
          for(var i=0; i<length; i++){
            accumulationPieStr += ";"+rows[i].topic_kor+";"+ rows[i].accumulated_msg_size;
          }
          console.log('accumPie : ' + accumulationPieStr);

          if(count == 0) {
            client.publish('traffic/accumulationPie', -1 + ";" + accumulationPieStr);
            client.publish('traffic/accumulationPie', count + ";" + accumulationPieStr);
          }
          else
            client.publish('traffic/accumulationPie', count + ";" + accumulationPieStr);

          console.log('pubslish successed!');
          //count++;
        });
        accumulationPieObj = setTimeout(accumulationPie, currentInterval);

  }
    
  // connection info
  // "count;clientTableInfo;데이터개수;connections;recent;old;minimum;maximum;date..."로 publish
  function connections() {
    //console.log(message);

    var clientStr = "";
    mysqlConnection.query('select * from client', function(err, rows){
      if(err) throw err;

      clientStr = rows.length;
      for(var i=0;i<rows.length;i++){
        clientStr += "/" + rows[i].id;
      }

      console.log(clientStr);
    });

    //topic table
    mysqlConnection.query('select * from connection_info order by date desc limit ' + dataLength, function(err, result, fields){
      if(err) throw err;

      var length = result.length;
      var connections = length;

      for(var i=0;i<length;i++) {
        var date = new Date(result[i].date);
        var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + "";
        var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + "";
        var dateStr = hour + ":" + min + ":" + sec;

        connections += ";" + result[i].number_of_current_connections + ";" + 
          result[i].recent_client_id + ";" + result[i].old_client_id + ";" + 
          result[i].client_id_of_minimum_msg + ";" + result[i].client_id_of_maximum_msg + ";" + 
          dateStr;
      }
      
      console.log('connections : ' + connections);
  
        if(count == 0) {
          client.publish('traffic/connection', -1 + ";" + clientStr + ";" + connections);
          client.publish('traffic/connection', count + ";" + clientStr + ";" + connections);
        }
        else
          client.publish('traffic/connection', count + ";" + clientStr + ";" + connections);
  
        console.log('pubslish successed!' + '\n');
        count++;
    });


    connectionObj = setTimeout(connections, currentInterval);
  }
    
  //message arrived
  client.on("message", function(topic, message){
    console.log("topic is " + topic.toString());
    console.log("message is " + message.toString());

    if(topic=='topic' && message=='unmount') {  // 컴포넌트 제거 시 모든 timeout 종료
      console.log('unmount' + '\n');
      clearAllTimeout();
      //count = 0;
    }

    // performance component
    else if(topic=='topic' && message=='performance did mount'){  // Performance 탭의 CPU 컴포넌트 로드 시
      count = 0;
      clearAllTimeout();

      cpu();
      cores();
      memory()
      network();
      mosquitto();
      processTable();
    }


    // traffic component 
    else if(topic=='topic' && message=='traffic did mount'){
      count = 0;
      clearAllTimeout();

      msgtopic();
      accumulate();
      receivingPie();
      sendingPie();
      accumulationPie();

      connections();
    }

    // subscription component
    //"topics;토픽개수;모든영어토픽;모든한글토픽"
    else if(topic=='topic' && message=='subscription did mount') {
      count = 0;
      clearAllTimeout();

      function getAllTopics() {
        console.log(message);
        console.log('subscription didmount');
    
        //topic table
        mysqlConnection.query('select * from topic', function(err, rows){
          if(err) throw err;
    
          var allTopics = rows.length;
          for(var i=0; i<rows.length; i++){
              allTopics += ";";
              allTopics += rows[i].topic;
          }
          for(var i=0; i<rows.length; i++){
            allTopics += ";";
            allTopics += rows[i].topic_kor;
        }
    
          console.log('all topics : '+ allTopics);
    
          if(count == 0) {
            client.publish('subscription/tree', allTopics);
            client.publish('subscription/tree', allTopics);
          }
          else
            client.publish('subscription/tree', allTopics);
    
          console.log('pubslish successed!' + '\n');
          count++;
        });
        topicListObj = setTimeout(getAllTopics, currentInterval);
      }   

      getAllTopics();
    }

    //subscription component
    //topic tree 중 클릭된 노트의 subscription, publication
    else if(topic=='topic' && message.toString().split(';')[0] == 'sub') {
      count = 0;
      clearAllTimeout();

      function subscription() {
        console.log(message);
        console.log('subscription didmount' + message.toString().split(';')[1]);
        //subscription table

        mysqlConnection.query('select * from subscription', function(err, rows){
          if(err) throw err;

          console.log(message.toString().split(';')[1]);

          var sameTopicSubscriber="table";
          for(var i=0;i<rows.length;i++){
            if(rows[i].subscription_topic == message.toString().split(';')[1]){ //************
              sameTopicSubscriber+=";";
              sameTopicSubscriber+=rows[i].client_id;
            }
          }
          console.log('subscription : '+ sameTopicSubscriber);

          if(count == 0) {
            client.publish('subscription/table', sameTopicSubscriber);
            client.publish('subscription/table', sameTopicSubscriber);
          }
          else
            client.publish('subscription/table', sameTopicSubscriber);

          console.log('pubslish successed!');
          //count++;
        });
        mysqlConnection.query('select * from publication', function(err, rows){
          if(err) throw err;

          console.log(message.toString().split(';')[1]);

          var sameTopicPublisher="table";
          for(var i=0;i<rows.length;i++){
            if(rows[i].publication_topic == message.toString().split(';')[1]){ //************
              sameTopicPublisher+=";";
              sameTopicPublisher+=rows[i].client_id;
            }
          }
          console.log('publication : '+ sameTopicPublisher);

          if(count == 0) {
            client.publish('subscription/pubTable', sameTopicPublisher);
            client.publish('subscription/pubTable', sameTopicPublisher);
          }
          else
            client.publish('subscription/pubTable', sameTopicPublisher);

          console.log('pubslish successed!');
          //count++;
        });
        /*mysqlConnection.query('select * from topic', function(err, rows){
          if(err) throw err;

          console.log(message.toString().split(';')[1]);

          var sameTopicInfo="table";
          for(var i=0;i<rows.length;i++){
            if(rows[i].topic == message.toString().split(';')[1]){ //************
              sameTopicInfo+=";" + rows[i].message_receiving_count;
              sameTopicInfo+=";" + rows[i].message_sending_count;
              sameTopicInfo+=";" + rows[i].accumulated_msg_size;
            }
          }
          console.log('infoTable : '+ sameTopicInfo);

          if(count == 0) {
            client.publish('subscription/infoTable', sameTopicInfo);
            client.publish('subscription/infoTable', sameTopicInfo);
          }
          else
            client.publish('subscription/infoTable', sameTopicInfo);

          console.log('pubslish successed!');
          count++;
        });*/
        subObj = setTimeout(subscription, currentInterval);
      }
      subscription();
    }

    

  });

  

  client.on("error",function(error){
    console.log("cannot connected : "+error);
    process.exit(1);
  });

  res.send('respond with a resource');
});

module.exports = router;
