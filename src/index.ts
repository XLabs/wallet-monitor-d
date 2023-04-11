
import { MultiWalletExporter } from '@xlabs-xyz/wallet-monitor';

import { loadConfig } from './config';

const config = loadConfig();

const exporter = new MultiWalletExporter(config.wallets, config.options);

exporter.startMetricsServer();
