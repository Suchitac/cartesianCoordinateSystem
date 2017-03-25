function calculatingValues(e) {
$.getJSON('coordinates.json',function(JSONobj){
    var inputValues = JSONobj;
    var x1 = document.getElementById('x').value;
    var y1 = document.getElementById('y').value;
    if(isNaN(Number(x1)) || isNaN(Number(y1)) || x1 === '' || y1 === '') {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }
    else {
        document.getElementById('errorMessage').style.display = 'none';
    }
    var distances = inputValues.reduce(function(outputValues, item){
      outputValues.push(calculateDistance(item));
      return (outputValues);
    },[]);

    function calculateDistance(obj) {
      var [x2,y2] = obj.value.split(',');
      var distanceFromTarget=Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2)).toFixed(2);
      return {distance: distanceFromTarget,point: obj.id};
    }
    var sortedOut = distances.sort(function(a ,b) {
      return a.distance - b.distance;
  });
  var innerHtml = sortedOut.reduce(function(strVal,item){
      strVal = strVal + '<div> Point Name: ' + item.point + '&nbsp&nbsp&nbspDistance: ' + item.distance + '</div>';
      return (strVal);
  },'')
  document.getElementById('result').innerHTML = innerHtml;
});


}
