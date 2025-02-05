## Dashboards and metrics analysis
 - [Test runs](./k6_tests.json)
 - [Test view + Debug Loki stream](./k6_test_view.json)
 
 To model dashboards locally you can use compose:
 ```
 docker compose up -d
 CONFIG=.env.prod.baseline.local npm run test
 ```
 Then go to `localhost:3000`, both `Loki` and `TimescaleDB` datasources are plugged in, edit a dashboard and export
