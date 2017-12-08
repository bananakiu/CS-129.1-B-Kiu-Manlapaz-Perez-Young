quarter = function(date) {
  var first = ["01","02","03"];
  var second = ["04","05","06"];
  var third = ["07","08","09"];
  var fourth = ["10","11","12"];
  var month = date.slice(5,7);
  
  if (first.includes(month)) {
  	return "First Quarter";
   }
  if (second.includes(month)) {
   	return "Second Quarter";
   }
  if (third.includes(month)) {
  	return "Third Quarter";
    }
  if (fourth.includes(month)) {
    	return "Fourth Quarter";
  }
}