(function() {
var CSSLoader, JSLoader, Load, Loader, root,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

root = this;

Loader = (function() {

  function Loader() {}

  Loader.prototype.getHead = function() {
    return document.getElementsByTagName('head')[0];
  };

  Loader.prototype.setCallback = function(tag, callback) {
    tag.onload = callback;
    return tag.onreadystatechange = function() {
      var state;
      state = tag.readyState;
      if (state === 'complete' || state === 'loaded') {
        tag.onreadystatechange = null;
        return root.setTimeout(callback, 0);
      }
    };
  };

  return Loader;

})();

JSLoader = (function(_super) {

  __extends(JSLoader, _super);

  function JSLoader(path, callback) {
    var script;
    script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    if (callback) {
      this.setCallback(script, callback);
    }
    this.getHead().appendChild(script);
  }

  return JSLoader;

})(Loader);

CSSLoader = (function(_super) {

  __extends(CSSLoader, _super);

  function CSSLoader(path, callback) {
    var sheet;
    sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.type = 'text/css';
    sheet.href = path;
    if (callback) {
      this.setCallback(sheet, callback);
    }
    this.getHead().appendChild(sheet);
  }

  return CSSLoader;

})(Loader);

Load = (function() {

  Load.prototype.wait = false;

  function Load(resources, callback) {
    this.callback = callback;
    this.done = __bind(this.done, this);

    this.load = __bind(this.load, this);

    this.count = resources.length;
    this.load(resources.reverse());
  }

  Load.prototype.load = function(resources) {
    var resource,
      _this = this;
    if (this.wait) {
      return root.setTimeout((function() {
        return _this.load(resources);
      }), 0);
    } else {
      if (resources.length) {
        resource = resources.pop();
        if (resource.wait != null) {
          this.wait = true;
        }
        switch (resource.type) {
          case "js":
            if ((resource.isLoaded != null) && typeof resource.isLoaded === 'function') {
              if (resource.isLoaded()) {
                this.done(resource);
              } else {
                new JSLoader(resource.path, function() {
                  return _this.done(resource);
                });
              }
            } else if (resource.name != null) {
              if ((root[resource.name] != null) && (typeof root[resource.name] === 'function' || 'object')) {
                this.done(resource);
              } else {
                new JSLoader(resource.path, function() {
                  return _this.done(resource);
                });
              }
            } else {
              new JSLoader(resource.path, function() {
                return _this.done(resource);
              });
            }
            break;
          case "css":
            new CSSLoader(resource.path);
            this.done(resource);
        }
      }
      if (this.count || this.wait) {
        return root.setTimeout((function() {
          return _this.load(resources);
        }), 0);
      } else {
        return this.callback();
      }
    }
  };

  Load.prototype.done = function(resource) {
    if (resource.wait != null) {
      this.wait = false;
    }
    return this.count -= 1;
  };

  return Load;

})();

if (!root.intermine) {
  root.intermine = {};
}

intermine.load = function() {
  var callback, library, opts, version;
  opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  library = opts[0];
  (typeof opts[1] === 'function' && (version = 'latest')) || (version = opts[1]);
  callback = opts.pop();
  if (library instanceof Array) {
    return new Load(library, callback);
  }
  if (intermine.resources[library] != null) {
    if (intermine.resources[library][version] != null) {
      return new Load([
        {
          'name': "intermine." + library,
          'path': intermine.resources[library][version],
          'type': 'js'
        }
      ], callback);
    } else {
      return console.log("" + library + " " + version + " is not supported at the moment");
    }
  } else {
    return console.log("" + library + " is not supported at the moment");
  }
};

intermine.resources = {"widgets":{"latest":"http://cdn.intermine.org/js/intermine/widgets/latest/intermine.widgets.js","1.0.0":"http://cdn.intermine.org/js/intermine/widgets/1.0.0/intermine.widgets.js","1.1.0":"http://cdn.intermine.org/js/intermine/widgets/1.1.0/intermine.widgets.js","1.1.7":"http://cdn.intermine.org/js/intermine/widgets/1.1.7/intermine.widgets.js","1.1.8":"http://cdn.intermine.org/js/intermine/widgets/1.1.8/intermine.widgets.js","1.1.9":"http://cdn.intermine.org/js/intermine/widgets/1.1.9/intermine.widgets.js","1.1.10":"http://cdn.intermine.org/js/intermine/widgets/1.1.10/intermine.widgets.js","1.2.0":"http://cdn.intermine.org/js/intermine/widgets/1.2.0/intermine.widgets.js","1.2.1":"http://cdn.intermine.org/js/intermine/widgets/1.2.1/intermine.widgets.js","1.3.0":"http://cdn.intermine.org/js/intermine/widgets/1.3.0/intermine.widgets.js","1.4.0":"http://cdn.intermine.org/js/intermine/widgets/1.4.0/intermine.widgets.js","1.4.1":"http://cdn.intermine.org/js/intermine/widgets/1.4.1/intermine.widgets.js","1.4.2":"http://cdn.intermine.org/js/intermine/widgets/1.4.2/intermine.widgets.js","1.6.7":"http://cdn.intermine.org/js/intermine/widgets/1.6.7/intermine.widgets.js","1.6.8":"http://cdn.intermine.org/js/intermine/widgets/1.6.8/intermine.widgets.js","1.7.0":"http://cdn.intermine.org/js/intermine/widgets/1.7.0/intermine.widgets.js","1.7.3":"http://cdn.intermine.org/js/intermine/widgets/1.7.3/intermine.widgets.js","1.8.0":"http://cdn.intermine.org/js/intermine/widgets/1.8.0/intermine.widgets.js","1.8.1":"http://cdn.intermine.org/js/intermine/widgets/1.8.1/intermine.widgets.js","1.8.2":"http://cdn.intermine.org/js/intermine/widgets/1.8.2/intermine.widgets.js","1.8.3":"http://cdn.intermine.org/js/intermine/widgets/1.8.3/intermine.widgets.js","1.9.1":"http://cdn.intermine.org/js/intermine/widgets/1.9.1/intermine.widgets.js","1.10.0":"http://cdn.intermine.org/js/intermine/widgets/1.10.0/intermine.widgets.js"},"reportWidgets":{"latest":"http://cdn.intermine.org/js/intermine/report-widgets/latest/intermine.reportWidgets.js"}};
}).call(this);