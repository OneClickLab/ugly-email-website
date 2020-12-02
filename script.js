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
    fetch('https://trackers.uglyemail.com/list.txt')
      .then(function(request) {
        return request.text();
      })
      .then(function(res) {
        var pixels = res.split('\n').map(function(row) {
          return row.split('@@=')[0];
        });

        this.allPixels = pixels.sort();
      }.bind(this));
  }
});