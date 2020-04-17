//
function getUrl(){
	return "http://115.29.201.93:9000";
	//return "http://127.0.0.1:8080";
}
//判断json中value是否为空
function jsonHasEmpty(data){
	for(var i in data){
		if(data[i].toString()==""){
			console.log(data[i]);
			console.log(i);
			return false;
		}
	}
	return true;
}
//long转date，yyyy-MM-dd
function longToDate1(longTime){
	var dateTime = new Date(longTime);
	return dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
}
//long转date，yyyy-MM-dd hh:mm:ss
function longToDate2(longTime){
	var dateTime = new Date(longTime);
	return dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate() + " " + dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
}
//date转long（13位）
function dateToLong(dateTime){
	var longTime = new Date(dateTime).getTime();
	return longTime;
}