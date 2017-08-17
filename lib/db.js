const Tapable = require('tapable')

class DB extends Tapable {

	constructor (options) {
		super();
		this.options = options;
	}

	request() {
		var obj = this.options;
		let res;
		if (this.hasPlugins('options')) {
			let args = [].slice.apply(arguments);
			args.forEach(function(itemObj) {
				for (var k in itemObj) {
					if (itemObj.hasOwnProperty(k)) {
						obj[k] = itemObj[k];
					}
				}
			})
			this.applyPluginsWaterfall('options', this.options);
			res = this.applyPluginsWaterfall('endpoint', this.options);
		} else {
			res = this.applyPluginsWaterfall('endpoint', arguments);
		}
		return res;
	}

}

module.exports = DB
