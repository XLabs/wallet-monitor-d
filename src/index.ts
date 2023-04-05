
import { MultiWalletExporter } from '@xlabs-xyz/wallet-monitor';

import { loadConfig } from './config';

const config = loadConfig();

const exporter = new MultiWalletExporter(config.wallets, config.options);

exporter.startMetricsServer();

exporter.on('balances', (chainName, network) => {
    // TODO: add an awesome logger.
    console.log('Updated balances for network', chainName, network);
});