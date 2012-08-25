/**
 * Display github stats about a given user
 *
 * The info is pretty hardcoded out of laziness
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 8/5/2012
 * License: MIT
 */

// Call with a user
function github(username) {
  (function(d,t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.src = 'https://api.github.com/users/' + username + '/repos?callback=__my_data&per_page=100';
    s.parentNode.insertBefore(g,s);
  }(document, 'script'));
}

// Callback for github
function __my_data(data) {
  (function($) {
    data = data.data;
    var columns = 3;

    // Hardcoded goodness
    var $elem = $('#github-data'),
        d = {
          'repos': [],
          'forks': []
        },
        s = '';

    // Separate my forks from repos
    for (var i in data) {
      if (data[i].fork) d.forks.push(data[i]);
      else d.repos.push(data[i]);
    }

    // Make the list
    for (var type in d) {
      // Make the title
      s += '<h1>';
      s += (type === 'repos')
         ? 'My Projects on GitHub (' + d[type].length + ')'
         : 'Forked Projects (' + d[type].length + ')';
      s += '</h1><br />';

      // List the projects
      for (var i in d[type]) {
        s += '<div class="github-project">';
        s += '<h3><a href="' + d[type][i].html_url + '">' + d[type][i].name + '</a></h3>';
        s += '<blockquote>' + d[type][i].description + '</blockquote>';
        var watchers = d[type][i].watchers;
        watchers = (watchers === 1) ? watchers + ' watcher' : watchers + ' watchers';
        var forks = d[type][i].forks;
        forks = (forks === 1) ? forks + ' fork' : forks + ' forks';
        s += watchers + ' / ' + forks + '<br />';
        if (d[type][i].language) s += 'written in ' + d[type][i].language + '<br />';
        var dobj = new Date(d[type][i].created_at);
        s += 'created on ' + (dobj.getMonth()+1) + '/' + dobj.getDate() + '/' + dobj.getFullYear();
        s += '</div>';
        if (i%columns == columns - 1) s += '<hr class="divider">';
      }
    }

    $elem.html(s);

  }(jQuery));
}
