var display = "";
var temp = "";
$(document).ready(function() {
  $('button').click(function() {
    var val = $(this).text();
    switch (val) {
      case "C":
        temp = "";
        display = temp;
        $('#answer').val(display);
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        temp += val;
        display = "";
        break;
      case "=":
        temp = eval(temp);
        // display = temp;
        display = getNumber(temp);
        $('#answer').val(display);
        break;
      default:
        temp += val;
        display += val;
        $('#answer').val(display);
    }
  });
});

function getNumber(num) {
  num = num.toString();
  if(num.length >= 8){
    return num.substring(0,8);
  }else return num;
}
