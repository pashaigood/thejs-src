function context(data, function_to_run, ctx){
	var prop,
		args = [],
		params = [],
		temp_func,
		func_body = body_cut(function_to_run);
					
	ctx = ctx || this;
	
	for (prop in data) {
		args.push(prop);
		params.push(data[prop]);
	}
	
	temp_func = new Function(args, func_body);
	try {
		temp_func.apply(ctx, params);
	} catch (e) {
		console.log(e.stack);
	}
}

function body_cut(function_data, prefix, postfix) {
	var function_body = function_data
						.toString()
						.replace(/^.*?\{/, '')
						.replace(/}$/, '');

	prefix = prefix ? prefix + "\n" : '';
	postfix = postfix ? postfix + "\n" : '';
	
	return prefix + function_body + postfix;
}
