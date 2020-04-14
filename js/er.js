//
function getUrl(){
	return "http://115.29.201.93:9000";
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