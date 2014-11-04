(function() {
  "use strict";

  function Water() {
    var total = 0,
        data = null,
        currentDate = new Date().toDateString(),
        _storeData = function() {
          var data = { amount: total, date: new Date() };

          localStorage.setItem('waterGlass', JSON.stringify(data));
        },
        _getData = function() {
          return JSON.parse(localStorage.getItem('waterGlass'));
        },
        _addOne = function() {
          total++;
          _storeData();
        },
        _getTodaysDate = function() {
          var date = new Date(),
              months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          return months[date.getMonth()] + ' ' + date.getDate();
        },
        _getTotal = function() {
          return total;
        },
        _resetTotal = function() {
          total = 0;
          _storeData();
        };
    
    data = _getData();

    if (data) {
      var dataDate = new Date(data.date).toDateString();

      if ( dataDate === currentDate ) {
        total = data.amount;
      }
    }
    
    return {
      addOne: _addOne,
      getTotal: _getTotal,
      getTodaysDate: _getTodaysDate,
      resetTotal: _resetTotal
    };
  }
  
  var waterGlass = new Water();
  
  function _setGlass() {
    var total = waterGlass.getTotal();

    document.getElementById('glass-number').innerHTML = total;
    document.getElementById('glass-water').style.height = (total*53) + 'px';

    if (total >= 8) {
      document.getElementsByTagName('body')[0].className = 'complete';
    }
  }
  
  _setGlass();

  document.getElementById('date').innerHTML = waterGlass.getTodaysDate();

  document.getElementById('glass').addEventListener('click', function() {
    waterGlass.addOne();
 
    ga('send', 'event', 'Glass', 'Add One');

    _setGlass();
  });

  document.getElementById('glass-reset').addEventListener('click', function(e) {
    e.preventDefault();

    waterGlass.resetTotal();

    ga('send', 'event', 'Glass', 'Reset');

    _setGlass();
  });
})();