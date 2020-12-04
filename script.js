var app = new Vue({
  el: '#app',
  data: {
    viewAll: false,
    donationType: null,
    allPixels: [],
    version: []
  },
  computed: {
    copyRightYear: function() {
      return new Date().getFullYear();
    },
    pixels: function() {
      return this.viewAll ? this.allPixels : this.allPixels.slice(0, 21);
    }
  },
  methods: {
    onNavClick: function(id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
  },
  created: function() {
    var fetchList = function(callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          callback(xmlhttp.responseText);
        }
      };

      xmlhttp.open('GET', 'https://trackers.uglyemail.com/list.txt', true);
      xmlhttp.send();
    };

    fetchList(function(res) {
      var pixels = res.split('\n').map(function(row) {
        return row.split('@@=')[0];
      });

      this.allPixels = pixels.sort();
    }.bind(this));
  }
});