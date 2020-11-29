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
  created() {
    var _self = this;

    var fetchPixels = function() {
      return fetch('https://trackers.uglyemail.com/list.txt')
        .then(function(request) {
          return request.text();
        })
        .then(function(res) {
          return res.split('\n').map(function(row) {
            return row.split('@@=')[0];
          });
        });
    };

    // var fetchVersion = function() {
    //   return fetch('https://api.github.com/repos/OneClickLab/ugly-email-trackers/tags')
    //     .then(function(request) {
    //       return request.json();
    //     })
    //     .then(function(res) {
    //       return res[0].name;
    //     });
    // };

    Promise
      .all([ fetchPixels() ])
      .then(function(responses) {
        // _self.version = responses[0];
        _self.allPixels = responses[0].sort();
      });
  }
});