import { z } from 'zod';

export const ChannelSchema = z.enum(['linkedin', 'x', 'youtube']);
export type Channel = z.infer<typeof ChannelSchema>;

export const DestinationSchema = z.enum(['internal_queue', 'buffer_idea', 'buffer_draft']);
export type Destination = z.infer<typeof DestinationSchema>;

export const ContentTypeSchema = z.enum(['idea', 'post', 'thread', 'short', 'video_outline', 'reply']);
export type ContentType = z.infer<typeof ContentTypeSchema>;

export const DraftStatusSchema = z.enum([
  'draft',
  'needs_review',
  'approved_for_buffer',
  'pushed_to_buffer',
  'manually_scheduled',
  'posted',
  'rejected',
  'needs_rewrite',
  'archived'
]);
export type DraftStatus = z.infer<typeof DraftStatusSchema>;
