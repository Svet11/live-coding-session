To start app you need to:
1. clone the repo
2. install dependencies by running: yarn
3. start the app by running: yarn start:dev

you can find envs in .env.example file! 

The next steps for developing:
1. Make error handling for all corner cases (fe limits in analyzing method)
2. Cover the codebase by tests (was not able to write them in time)
3. Replace process method with nestjs config
4. Create useful logger
5. Make rate limit middleware
6. Guard routes with whitelisted IP addresses

Endpoints to check: 
GET /binance (possible queryParams values: symbol (required), dateFrom, dateTo, limit)
GET /binance/analyze (possible queryParams values: symbol, dateFrom, dateTo - all required)

example: localhost:5000/binance/analyze?symbol=BTCUSDT&timeFrom=1747738115