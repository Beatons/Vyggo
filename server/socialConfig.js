ServiceConfiguration.configurations.remove({
	service:'facebook'
});

var facebook = EJSON.parse(Assets.getText('keys/facebook.json'));

ServiceConfiguration.configurations.insert({
	service:'facebook',
	appId: facebook.id,
	secret: facebook.secret
});