const bannedCapabilities = [
  'direct_publishing',
  'auto_comments',
  'auto_dms',
  'auto_follow_connect',
  'scraping',
  'browser_automation',
  'profile_harvesting',
  'session_cookies',
  'credential_storage'
] as const;

export type Capability = (typeof bannedCapabilities)[number] | 'draft_generation' | 'manual_review';

export function assertCapabilityAllowed(capability: Capability): void {
  if (bannedCapabilities.includes(capability as (typeof bannedCapabilities)[number])) {
    throw new Error(`Capability is banned by safety policy: ${capability}`);
  }
}

export function productRule(): string {
  return 'AI prepares. Buffer stages. Founder publishes. Analytics teaches.';
}
