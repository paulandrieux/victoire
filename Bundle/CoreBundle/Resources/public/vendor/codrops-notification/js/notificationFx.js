/**
 * notificationFx.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {

    'use strict';

    var docElem = window.document.documentElement,
        support = { animations : Modernizr.cssanimations },
        animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
        // animation end event name
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

    /**
     * extend obj function
     */
    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
     * NotificationFx function
     */
    function NotificationFx( options ) {
        this.options = extend( {}, this.options );
        extend( this.options, options );
        this._init();
    }

    /**
     * NotificationFx options
     */
    NotificationFx.prototype.options = {
        // element to which the notification will be appended
        // defaults to the document.body
        wrapper : document.body,
        // the message
        message : 'yo!',
        // layout type: growl|attached|bar|other
        layout : 'growl',
        // effects for the specified layout:
        // for growl layout: scale|slide|genie|jelly
        // for attached layout: flip|bouncyflip
        // for other layout: boxspinner|cornerexpand|loadingcircle|thumbslider
        // ...
        effect : 'slide',
        // notice, warning, error, success
        // will add class vic-ns-type-warning, vic-ns-type-error or vic-ns-type-success
        type : 'error',
        // if the user doesn´t close the notification then we remove it
        // after the following time
        ttl : 6000,
        // callbacks
        onClose : function() { return false; },
        onOpen : function() { return false; }
    }

    /**
     * init function
     * initialize and cache some vars
     */
    NotificationFx.prototype._init = function() {
        // create HTML structure
        this.ntf = document.createElement( 'div' );
        this.ntf.className = 'vic-ns-box vic-ns-' + this.options.layout + ' vic-ns-effect-' + this.options.effect + ' vic-ns-type-' + this.options.type;
        var strinner = '<div class="vic-ns-box-inner">';
        strinner += this.options.message;
        strinner += '</div>';
        strinner += '<span class="vic-ns-close"></span></div>';
        this.ntf.innerHTML = strinner;

        // append to body or the element specified in options.wrapper
        this.options.wrapper.insertBefore( this.ntf, this.options.wrapper.firstChild );

        // dismiss after [options.ttl]ms
        var self = this;
        this.dismissttl = setTimeout( function() {
            if( self.active ) {
                self.dismiss();
            }
        }, this.options.ttl );

        // init events
        this._initEvents();
    }

    /**
     * init events
     */
    NotificationFx.prototype._initEvents = function() {
        var self = this;
        // dismiss notification
        this.ntf.querySelector( '.vic-ns-close' ).addEventListener( 'click', function() { self.dismiss(); } );
    }

    /**
     * show the notification
     */
    NotificationFx.prototype.show = function() {
        this.active = true;
        classie.remove( this.ntf, 'vic-ns-hide' );
        classie.add( this.ntf, 'vic-ns-show' );
        this.options.onOpen();
    }

    /**
     * dismiss the notification
     */
    NotificationFx.prototype.dismiss = function() {
        var self = this;
        this.active = false;
        clearTimeout( this.dismissttl );
        classie.remove( this.ntf, 'vic-ns-show' );
        setTimeout( function() {
            classie.add( self.ntf, 'vic-ns-hide' );

            // callback
            self.options.onClose();
        }, 25 );

        // after animation ends remove ntf from the DOM
        var onEndAnimationFn = function( ev ) {
            if( support.animations ) {
                if( ev.target !== self.ntf ) return false;
                this.removeEventListener( animEndEventName, onEndAnimationFn );
            }
            self.options.wrapper.removeChild( this );
        };

        if( support.animations ) {
            this.ntf.addEventListener( animEndEventName, onEndAnimationFn );
        }
        else {
            onEndAnimationFn();
        }
    }

    /**
     * add to global namespace
     */
    window.NotificationFx = NotificationFx;

} )( window );

function warn(content, ttl, icon) {
    if (icon == undefined) {
        icon = 'fa-warning';
    }
    if (content == undefined) {
        content = 'L\'action n\'a pas pu aboutir.';
    }
    notify(content, ttl, 'growl', 'jelly', 'warning', icon);
}

function congrat(content, ttl, icon) {
    if (icon == undefined) {
        icon = 'fa-rocket';
    }
    if (content == undefined) {
        content = 'Victoire !';
    }
    notify(content, ttl, 'growl', 'jelly', 'success', icon);
}

function error(content, ttl, icon) {
    if (icon == undefined) {
        icon = 'fa-flash';
    }
    if (content == undefined) {
        content = 'Oups !';
    }
    notify(content, ttl, 'growl', 'jelly', 'error', icon);
}

function notify(content, ttl, layout, effect, type, icon) {
    if (ttl == undefined) {
        ttl = 10000; //10 seconds
    }
    var notification = new NotificationFx({
        message : '<div><i class="fa ' + icon + '"></i> ' + content + '</div>',
        layout  : layout,
        effect  : effect,
        ttl     : ttl,
        type    : type
    });

    // show the notification
    notification.show();
}
