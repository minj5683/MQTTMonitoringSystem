function dataTipFunc(seriesId, seriesName, index, xName, yName, data, values) {
  //console.log("dataTipFunc");
  return "<table cellpadding='0' cellspacing='1'>"
      +"<tr>"
        +"<td>current connections(개수)</td><td align='center'>" + values[1] + "</td>"
       +"</tr><tr>"
         +"<td>recent client</td><td align='center'>" + data.recent + "</td>"
        +"</tr><tr>"
      +"<td>old client</td><td align='center'>" + data.old + "</td>"
       +"</tr><tr>"
         +"<td>minimum msg</td><td align='center'>" + data.minimum + "</td>"
        +"</tr><tr>"
         +"<td>maximum msg</td><td align='center'>" + data.maximum + "</td>"
      +"</tr><tr>"
     +"</tr></table>";
}

function pieDataTipFunc(seriesId, seriesName, index, xName, yName, data, values) {
  //console.log("dataTipFunc");
  return "<table cellpadding='0' cellspacing='1'>"
      +"<tr><td align='center'>" + data.topic + "</td>"
       
         +"<td align='center'> : <b>" + data.value + "</b></td>"
       
     +"</table>";
}

 
// 게이지 값 보관.
var gaugeValue;
 
// 게이지 value change 이벤트 핸들러 함수.
function changeFunction(value)
{
 gaugeValue = value;
}

function valueLabelFunc(value){
 return value.toFixed(2) + "%";
}



function labelFunc(id, value){
	/*var str = value;
	var len = str.length;
	var filterStr = "";
	for(var i = 0 ; i < len ; i++)	{
		filterStr += str.substring(i, i + 1) + "\n";
	}
  return filterStr;*/
  return "";
}