module.exports = {
	development: {
		client: `pg`,
		connection: `postgres://localhost/repsy`
	},
	test: {},
	production: {
		client: `pg`,
		connection: process.env.DATABASE_URL
	}
}
