export default {
	jwt: {
		secret: process.env.APP_SECRET || 'dasdsadsa',
		expiresIn: '7d',
	},
};
