import fs from 'fs';
import yaml from 'yaml';

import { MultiWalletWatcherConfig, MultiWalletExporterOptions } from "@xlabs-xyz/wallet-monitor";

type SupportedFileExtensions = 'yml' | 'yaml' | 'json';

export type ServiceConfiguration = {
  wallets: MultiWalletWatcherConfig;
  options: MultiWalletExporterOptions;
}

function parseConfigExtension(extension: string | undefined): SupportedFileExtensions {
  if (extension === 'json') {
    return 'json';
  }

  if (extension === 'yml') {
    return 'yml';
  }

  return 'yaml';
}

function readFile(fileExtension: SupportedFileExtensions): any {
  const filePath = '/etc/wallet-monitor/config.' + fileExtension;

  const fileData = fs.readFileSync(filePath, 'utf8');

  let fileDataAsJson;

  try {
    switch (fileExtension) {
      case 'yaml':
      case 'yml':
        fileDataAsJson = yaml.parse(fileData);
        break;
      case 'json':
        fileDataAsJson = JSON.parse(fileData);
        break;
      default:
        throw new Error('Unsupported file extension');
    }
  }

  catch (e) {
    console.error('Error parsing config file:', e);
    process.exit(1);
  }

  return fileDataAsJson;
}

function parseConfig(fileExtension: SupportedFileExtensions): ServiceConfiguration {
  const rawConfig = readFile(fileExtension);

  const config = {} as ServiceConfiguration;

  // validation will be done by the MultiWalletExporter.
  config.wallets = rawConfig.wallets as MultiWalletWatcherConfig;

  const { debug, ...rawOptions } = rawConfig.options || {};
  config.options = rawOptions as MultiWalletExporterOptions;

  if (debug) {
    config.options.logger = console;
  }

  return config;
}

export function loadConfig(): ServiceConfiguration {

  const fileExtension = parseConfigExtension(process.env.WALLET_CONFIG_EXTENSION);

  return parseConfig(fileExtension);
}