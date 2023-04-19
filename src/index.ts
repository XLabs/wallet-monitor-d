
import { MultiWalletExporter } from '@xlabs-xyz/wallet-monitor';

import { loadConfig } from './config';

const config = loadConfig();

const exporter = new MultiWalletExporter(config.wallets, config.options);

exporter.on('balances', () => {
    console.log(JSON.stringify(exporter.getBalances()));
})

exporter.on('Error', (error) => {
    console.error("Error Pulling Some Balances", error.toString());
});

exporter.startMetricsServer();
