
## wallet-monitor-d
Monitor the balance of your wallets across multiple chains with minimal configuration.

wallet-monitor-d is a Docker image wrapping [wallet-monitor](https://github.com/XLabs/wallet-monitor).

Simply plug a docker volume with your yaml (or json) wallet addresses and tokens and start monitoring them.

Take a look at `local-example/docker-compose.yaml` to see a working example that contains:

- `wallet-monitor-d` image pulling the balances for wallets declared in `sample-config.yaml`
- `proetheus` service scraping the metrics exposed by wallet-monitor-d
- `grafana` service with some preloaded dashboards to visualize your balances
