import { describe, expect, it } from 'vitest';
import { approveForBuffer, markNeedsReview, markPushedToBuffer, rejectDraft } from '../src/domain/draftLifecycle.js';
import { ContentDraft } from '../src/schemas/entities.js';

function baseDraft(status: ContentDraft['status'] = 'draft'): ContentDraft {
  const now = new Date().toISOString();
  return {
    id: 'd1',
    campaignId: 'c1',
    channel: 'linkedin',
    destination: 'internal_queue',
    contentType: 'post',
    body: 'Body',
    status,
    createdAt: now,
    updatedAt: now
  };
}

describe('draft lifecycle', () => {
  it('transitions draft to needs_review then approved_for_buffer', () => {
    const review = markNeedsReview(baseDraft('draft'));
    const approved = approveForBuffer(review);

    expect(review.status).toBe('needs_review');
    expect(approved.status).toBe('approved_for_buffer');
  });

  it('rejects from needs_review to needs_rewrite', () => {
    const rewritten = rejectDraft(baseDraft('needs_review'));
    expect(rewritten.status).toBe('needs_rewrite');
  });

  it('marks approved draft as pushed_to_buffer', () => {
    const pushed = markPushedToBuffer(baseDraft('approved_for_buffer'));
    expect(pushed.status).toBe('pushed_to_buffer');
  });

  it('blocks invalid approvals', () => {
    expect(() => approveForBuffer(baseDraft('draft'))).toThrow(/needs_review/);
  });
});
