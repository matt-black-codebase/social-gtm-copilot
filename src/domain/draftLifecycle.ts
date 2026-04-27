import { ContentDraft, ContentDraftSchema } from '../schemas/entities.js';

const terminalStatuses = new Set(['posted', 'archived'] as const);

function assertMutableStatus(status: ContentDraft['status']): void {
  if (terminalStatuses.has(status as 'posted' | 'archived')) {
    throw new Error(`Draft in terminal status cannot transition: ${status}`);
  }
}

export function markNeedsReview(draft: ContentDraft): ContentDraft {
  assertMutableStatus(draft.status);
  return ContentDraftSchema.parse({ ...draft, status: 'needs_review', updatedAt: new Date().toISOString() });
}

export function approveForBuffer(draft: ContentDraft): ContentDraft {
  if (draft.status !== 'needs_review') {
    throw new Error(`Can only approve from needs_review, received ${draft.status}`);
  }
  return ContentDraftSchema.parse({ ...draft, status: 'approved_for_buffer', updatedAt: new Date().toISOString() });
}

export function rejectDraft(draft: ContentDraft): ContentDraft {
  if (draft.status !== 'needs_review') {
    throw new Error(`Can only reject from needs_review, received ${draft.status}`);
  }
  return ContentDraftSchema.parse({ ...draft, status: 'needs_rewrite', updatedAt: new Date().toISOString() });
}

export function markPushedToBuffer(draft: ContentDraft): ContentDraft {
  if (draft.status !== 'approved_for_buffer') {
    throw new Error(`Can only mark pushed from approved_for_buffer, received ${draft.status}`);
  }
  return ContentDraftSchema.parse({ ...draft, status: 'pushed_to_buffer', updatedAt: new Date().toISOString() });
}
