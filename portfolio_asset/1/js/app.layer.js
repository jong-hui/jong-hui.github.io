// Layer Class
class Layer {

	// Layer init
	static init () {
		Layer.template = `
			<div class="popup">
				<div class="middle"></div>
				<div class="popup_content">
					<div class="closer">X</div>
					{{html}}
				</div>
			</div>
		`;
		$(`<style>
			.popup {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				overflow: auto;
				background : rgba(0,0,0,0.5);
				text-align : center;
				z-index : 3123;
			}
			.middle {
				display:inline-block;
				text-align : center;
				vertical-align : middle;
				width: 0;
				height: 100%;
			}
			.popup_content {
				background: #fff;
				width: 80%;
				display: inline-block;
				margin: 10px;
				vertical-align : middle;
				padding: 20px;
				text-align :left;
				position: relative;
			}
			.popup_content .img_wrap {
				float: right;
				max-width : 50%;
				padding-left: 30px;
			}
			.closer:hover {
				color: white;
				background : #00aeef;
			}
			.closer {
				padding: 3px 6px;
				position: absolute;
				right: 0;
				top: 0;
				background : #999;
				transition : 0.3s;
				cursor: pointer;
			}
			.popup_content .real-content {
				margin-top: 10px;
				line-height: 160%;
			}
			.popup_content .name {
				font-size: 25px;
				margin-bottom: 20px;
			}
		</style>`).appendTo('head')
	}

	// Layer open
	static open (html) {
		$(Layer.template.replace("{{html}}", html)).appendTo('.wrap').hide().fadeIn(300)
	}

	// Layer close
	static close () {
		$(".popup").fadeOut(300)
	}

	// Layer open target html
	static htmlOpen () {
		Layer.open($(this).html());
	}

}