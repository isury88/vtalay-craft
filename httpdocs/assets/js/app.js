(function($) {

    /*------------------------------------*\
        ANY

        This will return true if there are any items
        in a jQuery collection.

        EXAMPLE

        var items = $(".item");

        if(items.any()) {
            console.log("YAY!");
        }
    \*------------------------------------*/

    $.fn.any = function() {
        return $(this).length > 0;
    }


    /*------------------------------------*\
        PARSE SETTINGS

        This will try and parse inline json settings as an object literal to pass into a plugin

        EXAMPLE

        <div class="item" data-settings='{"setting1": true}'></div>

        var item = $(".item"),
            settings = item.parseSettings();

        console.log(settings.setting1);

        returns true;

    \*------------------------------------*/
    $.fn.parseSettings = function () {

        var elem = $(this),
            response = {};

        if (elem.attr("data-settings")) {

            try {
                response = $.parseJSON(elem.attr("data-settings"));
            }
            catch (ex) {
                console.error("Check input data. Message: " + ex.message);
                return {};
            }
        }

        return response;
    };


    /*------------------------------------*\
        AJAX REQUEST

        A nice Ajax wrapper method

        EXAMPLE

        $.ajaxRequest({
            url: "/test",
            callback(function(data, isSuccess) {

                if(isSuccess) {
                    alert('All the data is WINNING');
                }
            });
        });
    \*------------------------------------*/
    $.extend({
        ajaxRequest: function(options) {

            var settings = {
                dataType: "application/json",
                url: "/",
                data: {},
                method: "GET",
                callback: null
            };

            var init = function() {

                settings = $.extend(true, {}, settings, options);

                $.ajax({
                    contentType: settings.dataType,
                    url: settings.url,
                    data: settings.data,
                    type: settings.method,
                    success: function(responseData) {
                        tryCallback(responseData);
                    },
                    error: function(responseData) {
                        tryCallback(responseData);
                    }
                });
            },

            tryCallback = function(responseData) {

                if(typeof(settings.callback) == "function") {
                    settings.callback(responseData, (responseData != null ? (responseData.status == 200 ? false : true) : true));
                }
            }

            init();

        }
    });

    /*------------------------------------*\
        AJAX HTML

        A wrapper to ajaxRequest for simple HTML getting

        EXAMPLE

        $.ajaxHtml('http://google.com', function(data) {
            // do stuff
        });

    \*------------------------------------*/
    $.extend({
        ajaxHtml: function(url, callback) {
            $.ajaxRequest({
                dataType: "text/html",
                url: url,
                callback: callback
            });
        }
    });


    /*------------------------------------*\
        QUERY STRING

        A helper to work with query strings

        toJson: take the current query string and return it as json
        fromJson: takes a json object and converts into a query string

    \*------------------------------------*/
    $.extend({
        queryString: {

            toJson: function(ignoreKeys) {
                var response = {},
                    data = window.location.href.toString().toLowerCase(),
                    splitData = [];

                // Return empty object if undefined
                if(typeof(data) == 'undefined') {
                    return {};
                }

                // Return empty object if empty
                if(data.length == 0) {
                    return {};
                }

                // Set empty array if ignore keys not set
                if(typeof(ignoreKeys) == 'undefined') {
                    ignoreKeys = [];
                }

                // Split query string into array
                splitData = data.split('?')[1].split('&');

                // Loop and create key value pairs
                for (var i = 0, l = splitData.length; i < l; i++) {
                    var param = splitData[i].split('=');
                    response[param[0]] = param[1];
                }

                // Check ignore keys length
                if(ignoreKeys.length > 0) {

                    // Loop each one and delete if exists
                    $.each(ignoreKeys, function(i, val) {

                        if(response.hasOwnProperty(val)) {
                            delete response[val];
                        }
                    });

                }

                return response;
            },

            fromJson: function(data) {
                return '?' + $.param(data).replace('?', '&');
            }
        }
    });


    /*------------------------------------*\
        ESC

        A useful little wrapper for the escape key press event

        EXAMPLE

        $.esc({
            callback: function(evt) {

                // Close your modal or whatever. Accessibility FTW
            }
        });

    \*------------------------------------*/
    $.extend({
        esc: function(options) {

            var settings = {
                callback: null
            }

            settings = $.extend(true, {}, settings, options);

            if(typeof(settings.callback) == 'function') {

                $(document).keyup(function(evt) {

                    // escape key maps to keycode `27`
                    if (evt.keyCode == 27) {

                        // run callback and pass the event over
                        settings.callback(evt);
                    }
                });
            }

        }
    });

    /*------------------------------------*\
        GET BREAKPOINT

        Returns the current CSS breakpoint as defined in global.scss
    \*------------------------------------*/
    $.extend({
        getBreakpoint: function() {
            return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
        }
    });

    /*------------------------------------*\
        CHANGE EVENT

        A helper to return the correct 'change' event for an element

        EXAMPLE

        var event = $('.item').changeEvent();

    \*------------------------------------*/
    $.fn.changeEvent = function() {

        var elem = $(this),
            response = 'change';

            // Work out what the change event will be, based on input type
            switch(elem.prop('tagName').toString().toLowerCase()) {
                case 'input':

                    if(elem.attr('type') != 'checkbox' && elem.attr('type') != 'radio') {
                        response = 'input';
                    }

                    break;
            }

        return response;
    };
}($));

// TAKEN FROM David Walsh blog - http://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

(function($) {

    $.fn.exampleModule = function() {


        var elem = $(this), // <- This is the element that you bound the module to
            settings = {
                activeClass: 'is-active'
            };

        var init = function() {

            //Parse settings (_helpers.js) from the element
            settings = $.extend(true, {}, settings, elem.parseSettings());


        };

        init();
        return this;
    };

}($));

(function($) {

    $.fn.typeSet = function() {

        var elem = $(this),
            settings = {
                ignoreClass: 'js-typeset__ignore',
                processedClass: 'js-typeset__processed',
                minWords: 4
            };

        var init = function() {

            // Split words/tags into array
            var textItems = elem.html().trim().replace(/&nbsp;/g, '').split(/ (?=[^>]*(?:<|$))/),

                // Define what we want to process by giving a key value. Key being human readable and value being target index
                filters = {
                    orphans: 0,
                    widows: (textItems.length - 2)
                },

                // Store the result
                result = '';

            // Ignore this element if class set
            if(elem.hasClass(settings.ignoreClass) || elem.parents().hasClass(settings.ignoreClass)) {
                return;
            }

            // Ingnore if already processed
            if(elem.hasClass(settings.processedClass)) {
                return;
            }

            // Check there's enough words to play with
            if(textItems.length >= settings.minWords) {

                // Loop each filter
                for(var filterKey in filters) {

                    // Double check we have an index
                    if(!filters.hasOwnProperty(filterKey)) {
                        continue;
                    }

                    // Find the target word for this filter
                    var targetWord = textItems[filters[filterKey]];

                    // Stick a no break space to the end of the word and replace the instance in the array
                    textItems[filters[filterKey]] = targetWord + '&nbsp;';
                }

                // Join the words together with a space
                result = textItems.join(' ');
                result = result.replace(/&nbsp; /g, '&nbsp;');

                // Set the result
                elem.html(result);
                elem.addClass(settings.processedClass);
            }

        };

        init();
        return this;
    };

}($));


/*------------------------------------*\
    CENTRAL APP MASTER

    This file includes the module placeholders system that allows modular
    binding of custom methods / plugins etc.

    EXAMPLE

    <div data-module="example1,example2"></div>

    The above would meet two conditions in the below switch statement.

\*------------------------------------*/
var app = (function($) {

    // Global settings
    var settings = {

        // Typeset module settings
        typeset: {
            enabled: true,
            selector: 'p'
        }
    };

    // This method will run when the DOM is ready.
    var init = function() {

        // Find any module placeholders
        var modulePlaceholders = $('[data-module]');

        if(modulePlaceholders.any()) {

            // Loop each placeholder
            modulePlaceholders.each(function() {

                var elem = $(this),
                    modules = elem.attr('data-module');

                // If any modules found
                if(modules) {

                    // Split on the comma
                    modules = modules.split(',');

                    // Loop each module key
                    $.each(modules, function(i, module) {

                        // Run switch to bind each module to each key
                        switch(module) {

                            // This is an example. Delete when you add your own cases.
                            case 'example-module':

                                elem.exampleModule();
                                break;

                        }

                    });
                }
            });
        }

        // If typeset is enabled
        if(settings.typeset.enabled) {

            // Loop each item and bind it to the module
            $(settings.typeset.selectors).each(function() {
                $(this).typeSet();
            });
        }
    };

    return {
        init: init
    }

}(window.$));

// RUN!!
app.init();
