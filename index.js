Subscriptions = new Mongo.Collection('subscriptions');

if (Meteor.isClient) {
  Template.body.events({
    "submit #subscribe":function(event) {
        
        var fn = event.target.firstname;
        var ln = event.target.lastname;
        var em = event.target.email;
        var ie = event.target.interest;
        var nl = event.target.newsletter;

        Meteor.call('subscribe', {
            firstname: fn.value,
            lastname: ln.value,
            email: em.value,
            interest: ie.value,
            newsletter: nl.checked
        });

        fn.value = '';
        ln.value = '';
        em.value = '';
        ie.value = '';
        nl.checked = false;

        $('#Label1').show();

        event.preventDefault();
    }
  });
}

Meteor.methods({
    subscribe: function(subscription) {
        Subscriptions.insert(subscription);
    }
});

/**
function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);
}

function initate() {
    var style1 = document.getElementById("stylesheet1");
    var style2 = document.getElementById("stylesheet2");

    style1.onclick = function () { swapStyleSheet("style.css") };
    style2.onclick = function () { swapStyleSheet("dark.css") };
}

window.onload = initate;
**/

/**

        var style_cookie_name = "style";
        var style_cookie_duration = 30;

        // *** END OF CUSTOMISABLE SECTION ***
        // You do not need to customise anything below this line

        function switch_style(css_title) {
            // You may use this script on your site free of charge provided
            // you do not remove this notice or the URL below. Script from
            // http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
            var i, link_tag;
            for (i = 0, link_tag = document.getElementsByTagName("link") ;
              i < link_tag.length ; i++) {
                if ((link_tag[i].rel.indexOf("stylesheet") != -1) &&
                  link_tag[i].title) {
                    link_tag[i].disabled = true;
                    if (link_tag[i].title == css_title) {
                        link_tag[i].disabled = false;
                    }
                }
                set_cookie(style_cookie_name, css_title,
                  style_cookie_duration);
            }
        }
        function set_style_from_cookie() {
            var css_title = get_cookie(style_cookie_name);
            if (css_title.length) {
                switch_style(css_title);
            }
        }
        function set_cookie(cookie_name, cookie_value,
            lifespan_in_days, valid_domain) {
            // http://www.thesitewizard.com/javascripts/cookies.shtml
            var domain_string = valid_domain ?
                               ("; domain=" + valid_domain) : '';
            document.cookie = cookie_name +
                               "=" + encodeURIComponent(cookie_value) +
                               "; max-age=" + 60 * 60 *
                               24 * lifespan_in_days +
                               "; path=/" + domain_string;
        }
        function get_cookie(cookie_name) {
            // http://www.thesitewizard.com/javascripts/cookies.shtml
            var cookie_string = document.cookie;
            if (cookie_string.length != 0) {
                var cookie_value = cookie_string.match(
                                '(^|;)[\s]*' +
                                cookie_name +
                                '=([^;]*)');
                return decodeURIComponent(cookie_value[2]);
            }
            return '';
        }

**/