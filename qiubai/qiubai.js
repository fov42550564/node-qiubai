var jsdom = require("jsdom");
var jquery = require('fs').readFileSync('./jquery.js').toString();
var types = ["8hr", "hot", "week", "month", "imgrank", "pic", "late", "history"];

var QiuBai = (function() {
	function QiuBai(type, page) {
		this.texts = new Array();
		this.images = new Array();
		this.id = 0;
		this.type = type;
		this.page = page;
		this.active = false;
		this.setTypeSelect(this.type);
		this.width = $(document).width();
		this.height= $(document).height();

		this.showPage();
	}

	QiuBai.prototype.setTypeSelect = function(type) {
		var n = -1;
		var select = document.getElementById('types');
		select.qiubai = this;
		for (var i in types) {
			select.options.add(new Option(types[i], types[i]));
			if (this.type === types[i]) {
				n = i;
			}
		}
		if (n == -1) {
			this.type = "8hr";
			n = 0;
		}
		select.options[n].selected = true;
		select.addEventListener("change", QiuBai.changeType, false);
	};

	QiuBai.prototype.showItem = function() {
		this.updateState();
		var text = this.texts[this.page][this.id];
		var image = this.images[this.page][this.id];
		if (text) {
			$('#text').text(text);
			var height = this.height - $('#text').height() - 100 -20;
			$('#imagecontainer').height(height);
		}
		if (image) {
			$('#image').attr("src", image);
			$('#image').show();
		} else {
			$('#image').hide();
		}
	};

	QiuBai.prototype.showPreItem = function() {
		if (!this.active)
			return;
		this.id--;
		if (this.id < 0) {
			this.page--;
			if (this.page < 1)
				return;
			this.showPage();
		} else {
			this.showItem();
		}
	};

	QiuBai.prototype.showNextItem = function() {
		if (!this.active)
			return;
		this.id++;
		if (this.id >= this.texts[this.page].length) {
			this.id = 0;
			this.page++;
			this.showPage();
		} else {
			this.showItem();
		}
	};

	QiuBai.prototype.showPrePage = function() {
		if (!this.active)
			return;
		this.id = 0;
		this.page--;
		if (this.page < 1)
			return;
		this.showPage();
	};

	QiuBai.prototype.showNextPage = function() {
		if (!this.active)
			return;
		this.id = 0;
		this.page++;
		this.showPage();
	};

	QiuBai.changeType = function(e) {
		var _self = e.srcElement.qiubai;
		console.log(e.srcElement.value);
		console.log(_self.active);
		if (!_self.active)
			return;
		_self.type = e.srcElement.value;
		_self.id = 0;
		_self.page = 1;
		_self.texts.length = 0;
		_self.images.length = 0;
		_self.showPage();
	};

	QiuBai.prototype.showPage = function() {
		if (!this.texts[this.page])
			this.texts[this.page] = new Array();
		if (!this.images[this.page])
			this.images[this.page] = new Array();
		this.showProgressStart();
		this.getContent(function(qb){
			if (qb.id < 0)
				qb.id = qb.texts[qb.page].length - 1;
			qb.showProgressEnd();
			qb.showItem();
		});
	};

	QiuBai.prototype.getContent = function(callback) {
		var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0';
		var _self = this;

		$('#text').text("");
		jsdom.env({
			url: 'http://www.qiushibaike.com/'+_self.type+'/page/'+_self.page+'?s=4620120&slow',
			headers: { 'User-Agent': userAgent },
			src: [jquery],
			done: function (errors, window) {
				var $ = window.$;
				var i = 0;
				$("div[title]").each(function() {
					_self.texts[_self.page][i] = $(this).text();
					var next = $(this).next();
					if (next[0].className == "thumb") {
						_self.images[_self.page][i] = next.find('img').attr('src');
					}
					i++;
				});
				callback(_self);
			}
		});
	};

	QiuBai.prototype.updateState = function() {
		$('#status').text("[type]:"+this.type+"   [page]:"+this.page+"   [id]:"+this.id);
	};

	QiuBai.prototype.showProgressStart = function() {
		this.active = false;
		this.updateState();
		$('#image').attr("src", "progress.gif");
		$('#image').show();
		var height = this.height - $('#text').height() - 100 -20;
		$('#imagecontainer').height(height);
	};

	QiuBai.prototype.showProgressEnd = function() {
		this.active = true;
		$('#image').hide();
	};

	return QiuBai;
}());


