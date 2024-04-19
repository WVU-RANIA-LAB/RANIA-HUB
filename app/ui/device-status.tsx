import { Device } from '@prisma/client';
import { fetchStatus } from '../lib/actions/device-actions';

type CheckStatusProps = { device: Device };

export default async function CheckStatus({ device }: CheckStatusProps) {
  return (await fetchStatus(device.ipAddress, device.port)) ? 'On' : 'Off';
}
