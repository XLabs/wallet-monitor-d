
import { MultiWalletExporter } from '@xlabs-xyz/wallet-monitor';

import { loadConfig } from './config';

// configuration is read from environment variables
// so that it can be easily configured as a container
// alternatively, you can copy a .env file to the project <TODO: specify path when building the docker image>
const config = loadConfig();

const exporter = new MultiWalletExporter(config.wallets, config.options);

exporter.startMetricsServer();

exporter.on('balances', (chainName, network) => {
    // TODO: add an awesome logger.
    console.log('Updated balances for network', chainName, network);
});