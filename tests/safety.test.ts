import { describe, expect, it } from 'vitest';
import { assertCapabilityAllowed, productRule } from '../src/domain/safety.js';

describe('safety policy', () => {
  it('allows non-banned capabilities', () => {
    expect(() => assertCapabilityAllowed('draft_generation')).not.toThrow();
  });

  it('rejects banned capabilities', () => {
    expect(() => assertCapabilityAllowed('direct_publishing')).toThrow(/banned/);
  });

  it('exposes product rule statement', () => {
    expect(productRule()).toBe('AI prepares. Buffer stages. Founder publishes. Analytics teaches.');
  });
});
