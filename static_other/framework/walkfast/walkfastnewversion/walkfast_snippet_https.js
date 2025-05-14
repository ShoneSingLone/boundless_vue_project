(function () {
    var _index = 0,
        _index_css = 0,
        _update_interval = 3600000,
        wf_ts;

    function refreshWfTimeStamp() {
        var storage = window.localStorage;

        wf_ts = storage.getItem('walkfast_timestamp');
        var wf_now = Date.now();

        if (wf_ts) {
            if (wf_now - wf_ts > _update_interval) {
                wf_ts = wf_now;
                storage.setItem('walkfast_timestamp', wf_now);
            }
        } else {
            storage.setItem('walkfast_timestamp', wf_now);
        }

    }

    function createLink(src, callback) {
        var link = document.createElement('link');

        link.setAttribute('href', src + '?v=' + wf_ts);
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        document.querySelector('head').appendChild(link);
        link.onload = callback || function() {};
    }

    function loadJs(url, callback) {
        var newScript = document.createElement('script');

        newScript.src = url + '?v=' + wf_ts;
        newScript.charset = 'utf-8';

        if (navigator.userAgent.indexOf('MSIE') > -1) {
            newScript.onreadystatechange = function() {
                if (this.readyState === 'loaded' || this.readyState === 'complete') {
                    if(typeof callback === "function"){
                        callback();
                    }
                    this.onload = null;
                    this.onreadystatechange = null;
                    this.parentNode.removeChild(this);
                }
            };
        } else {
            newScript.onload = function() {
                if(typeof callback === "function"){
                    callback();
                }
                this.onload = null;
                this.onreadystatechange = null;
                this.parentNode.removeChild(this);
            };
        }
        document.getElementsByTagName('head')[0].appendChild(newScript);
    }

    function loadJsList(arr) {
        if (_index < arr.length) {
            loadJs(arr[_index], function() {
                _index++;
                loadJsList(arr);
            });
        }
    }

    var loadJqueryTimmer;
    var loadJqueryStartTime = new Date().getTime();
    var jqueryPath = "/static/framework/walkfast/jquery.min.js";
    function setJquery() {
      window.$_wf = $;
      window.jQuery_wf = jQuery;
      loadJsList(js_list_cn);
    }
    function loadJquery() {
      if (new Date().getTime() - loadJqueryStartTime >= 1000) {
        clearTimeout(loadJqueryTimmer);
        return loadJs(jqueryPath, setJquery);
      }
      loadJqueryTimmer = setTimeout(function () {
        window.$ ? setJquery() : loadJquery();
      }, 100);
    }

    function loadCssList(arr) {
        if (_index_css < arr.length) {
            createLink(arr[_index_css], function() {
                _index_css++;
                loadCssList(arr);
            });
        }
    }

    var css_list = [],
        js_list_cn = [];

    try {
        walkfastua_service_01;
    } catch (e) {
        refreshWfTimeStamp();
        loadCssList(css_list);
        loadJquery();
    }
})();