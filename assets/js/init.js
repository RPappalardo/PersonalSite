var debug = false, local = (debug) ? '/Dropbox/lena-sanz/':'/';

if (!location.origin) {
	location.origin = location.protocol + "//" + location.host;
}

if (typeof Object.create !== 'function') {
	Object.create = function(obj) {
		function F(){};
		F.prototype = obj;
		return new F();
	};
}

jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,{
	def: 'easeInOutExpo',
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});

(function($,window,undefined) {
    var oldXHR = $.ajaxSettings.xhr;
    $.ajaxSettings.xhr = function() {
        var xhr = oldXHR();
        if(xhr instanceof window.XMLHttpRequest) {
            xhr.addEventListener('progress',this.progress,false);
        }
        if(xhr.upload) {
            xhr.upload.addEventListener('progress',this.progress,false);
        }
        return xhr;
    };
})(jQuery,window);

(function($) {
	var Preloader = {
		init: function(options,elem){
			var self = this;
				self.options = $.extend({},$.fn.preloader.options,options);
				self.elem = $(elem);
				self.size = self.options.assets.length;
				self.percent = 0;
				self.index = 0;
				self.query(self.options.assets[self.index]);
		},
		query: function(url) {
			var self = this, pourcentage = 0, index = 0;
				$.ajax(location.origin + local + url, {
					method: 'GET',
					cache: self.options.cache,
					progress: function(e) {
				        if (e.lengthComputable) {
				            var ratio = (e.loaded / e.total);
				            self.percent = Math.round(100/self.size) * self.index;
				            self.percent += Math.round(ratio * Math.round(100/self.size));
				            if (typeof self.options.onProgress === 'function') {
								self.options.onProgress.call(self.elem,self.percent);
							}
				        }
				    },
				    success: function() {
				    	if (self.index != self.size-1) {
				    		self.index++;
				    		self.percent = Math.round(100/self.size) * self.index;
				    		if (typeof self.options.onProgress === 'function') {
								self.options.onProgress.call(self.elem,self.percent);
							}
							self.query(self.options.assets[self.index]);
						} else {
							self.percent = 100;
							if (typeof self.options.onComplete === 'function') {
								self.options.onComplete.call(self.elem);
							}
						}
				    }
				});
		}
	};

	$.fn.preloader = function(options) {
		return this.each(function() {
			var preloader = Object.create(Preloader);
				preloader.init(options,this);
			$.data(this,'preloader',preloader);
		});
	};

	$.fn.preloader.options = {
		cache: true,
		onProgress: function(){},
		onComplete: function(){}
	};

})(jQuery);

// Init
$(function($){

	var root = $(window),
		deferred = new jQuery.Deferred(),
		assets = [
			'images/exterieur.jpg',
			'images/famille.jpg',
			'images/mariage.jpg',
			'images/studio.jpg',
			'menu.jpg',
			'js/main.js'
		],
		percent = 0,
		duration = 10000,
		timer, init = false, preloaded = false,
		body = $('body').preloader({
			assets: assets,
			onProgress: function() {
				percent = ($(this).data('preloader').percent >= 100) ? 100:$(this).data('preloader').percent;
				count.text(percent+' %');
			},
			onComplete: function() {
				count.text('100 %');
				deferred.resolve();
			}
		}),
		preloader = $('div.preloader'),
		count = preloader.find('p'),
		button = preloader.find('button'),
		skip = function(e) {
			init = true;
			preloader.fadeOut(function(){
				container.fadeIn(function(){
					layers.each(function(i){
						$(this).delay(100*i).animate({height:'0%'},800,'easeInOutExpo',function(){
							if (i == 3) overlay.css({opacity: 0,visibility: 'hidden'});
						});
					});
					preloader.remove();
				});
			});
			clearTimeout(timer);
			e.preventDefault();
		},
		overlay = $('div.overlay-black'),
		layers = overlay.find('div.layer'),
		container = $('div.container');

	deferred.done(function(){
		preloaded = true;
		preloader.addClass('preloader-done');
		button.on('click.init',skip);
	});

	window.init = function(){
		if (!init) {
			if (preloaded) {
				init = true;
				preloader.fadeOut(function(){
					container.fadeIn(function(){
						layers.each(function(i){
							$(this).delay(100*i).animate({height:'0%'},800,'easeInOutExpo',function(){
								if (i == 3) overlay.css({opacity: 0,visibility: 'hidden'});
							});
						});
						preloader.remove();
					});
				});
			} else {
				timer = setTimeout(window.init,duration);
			}
		}
	}
	window.init();
});
