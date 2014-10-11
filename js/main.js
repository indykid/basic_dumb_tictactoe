var chars = ['X', 'O'],
    count = 0;

$(function(){

  $('form').on('submit', function(e){
    e.preventDefault();
    var size = $('#row-size').val(),
        cell = '<td></td>',
        tableContent = '';
    for (var i = 0; i < size; i++){
      var rowContent = '<tr>';
      for (var j = 0; j < size; j++){
        rowContent += cell;
      };
      rowContent += '</tr>'
      tableContent += rowContent;
    };
    $('tbody').append(tableContent);
  });

  $('table').on("click", "td:not(.clicked)", function(){
    var index = count % 2;
    count++;
    $(this).text(chars[index]);
    $(this).addClass("clicked");
    if (hasUserWon(Math.pow($('td').length, 0.5))) {
      alert(chars[index] +" is winner");
    };
  });

});

function hasUserWon(gridSize) {
  if ( checkFirstDiagonal(gridSize) || checkSecondDiagonal(gridSize) ) {
    return true;
  }
  for ( var i = 0; i < gridSize; i++) {
    if ( checkRow(i, gridSize) || checkColumn(i, gridSize) ) {
      return true;
    }
  }
  return false;
};

function checkRow(rowNumber, gridSize) {
  var startIndex = rowNumber * gridSize;
  var endIndex = startIndex + (gridSize - 1);
  if ( !valueAt(startIndex) ) {
    return false;
  }
  if ( valueAt(startIndex) != valueAt(endIndex) ) {
    return false;
  } 

  for ( var i = startIndex + 1; i < endIndex; i++) {
    if ( valueAt(startIndex) != valueAt(i) ) {
      return false;
    }
  }
  return true;
};

function checkColumn(columnNumber, gridSize){
  var startIndex = columnNumber;
  var endIndex = startIndex + (gridSize * (gridSize -1));
  if ( !valueAt(startIndex) ) {
    return false;
  }
  if ( valueAt(startIndex) != valueAt(endIndex) ) {
    return false;
  } 

  for ( var i = startIndex + gridSize; i < endIndex; i += gridSize) {
    if ( valueAt(startIndex) != valueAt(i) ) {
      return false;
    }
  }
  return true;
};

function checkFirstDiagonal(gridSize) {
  var startIndex = 0;
  var endIndex = cellAmount(gridSize) - 1;
  if ( !valueAt(startIndex) ) {
    return false;
  }
  if ( valueAt(startIndex) != valueAt(endIndex) ) {
    return false;
  } 
  for ( var i = startIndex + gridSize + 1; i < endIndex; i += (gridSize + 1) ) {
    if ( valueAt(startIndex) != valueAt(i) ) {
      return false;
    }
  }
  return true;
};

function checkSecondDiagonal(gridSize) {
  var startIndex = gridSize - 1;
  var endIndex = cellAmount(gridSize) - gridSize;
  if ( !valueAt(startIndex) ) {
    return false;
  }
  if ( valueAt(startIndex) != valueAt(endIndex) ) {
    return false;
  } 
  for ( var i = startIndex + ( gridSize - 1 ); i < endIndex; i += (gridSize - 1) ) {
    if ( valueAt(startIndex) != valueAt(i) ) {
      return false;
    }
  }
  return true;
};

function cellAmount(gridSize) {
  return Math.pow(gridSize, 2)
};

function valueAt(index) {
  var td = $('td').eq(index);
  var val = td.text();  
    return val;
};


