import { z } from 'zod';
import {
  ChannelSchema,
  ContentTypeSchema,
  DestinationSchema,
  DraftStatusSchema
} from './types.js';

const IsoDateTime = z.string().datetime();

export const CampaignSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  goal: z.string().min(1),
  createdAt: IsoDateTime,
  channels: z.array(ChannelSchema).min(1)
});
export type Campaign = z.infer<typeof CampaignSchema>;

export const CampaignIdeaSchema = z.object({
  id: z.string().min(1),
  campaignId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  createdAt: IsoDateTime
});
export type CampaignIdea = z.infer<typeof CampaignIdeaSchema>;

export const ContentDraftSchema = z.object({
  id: z.string().min(1),
  campaignId: z.string().min(1),
  ideaId: z.string().min(1).optional(),
  channel: ChannelSchema,
  destination: DestinationSchema,
  contentType: ContentTypeSchema,
  body: z.string().min(1),
  status: DraftStatusSchema,
  createdAt: IsoDateTime,
  updatedAt: IsoDateTime
});
export type ContentDraft = z.infer<typeof ContentDraftSchema>;

export const ApprovalEventSchema = z.object({
  id: z.string().min(1),
  draftId: z.string().min(1),
  action: z.enum(['approve', 'reject']),
  actor: z.string().min(1),
  reason: z.string().optional(),
  createdAt: IsoDateTime
});
export type ApprovalEvent = z.infer<typeof ApprovalEventSchema>;

export const CommentOpportunitySchema = z.object({
  id: z.string().min(1),
  campaignId: z.string().min(1),
  channel: ChannelSchema,
  prompt: z.string().min(1),
  createdAt: IsoDateTime
});
export type CommentOpportunity = z.infer<typeof CommentOpportunitySchema>;

export const RelationshipRecordSchema = z.object({
  id: z.string().min(1),
  handle: z.string().min(1),
  channel: ChannelSchema,
  notes: z.string().min(1),
  createdAt: IsoDateTime
});
export type RelationshipRecord = z.infer<typeof RelationshipRecordSchema>;

export const AnalyticsImportSchema = z.object({
  id: z.string().min(1),
  campaignId: z.string().min(1),
  source: z.string().min(1),
  importedAt: IsoDateTime,
  rows: z.number().int().nonnegative()
});
export type AnalyticsImport = z.infer<typeof AnalyticsImportSchema>;

export const WeeklyBriefSchema = z.object({
  id: z.string().min(1),
  campaignId: z.string().min(1),
  weekOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  summary: z.string().min(1),
  wins: z.array(z.string()),
  risks: z.array(z.string()),
  nextActions: z.array(z.string())
});
export type WeeklyBrief = z.infer<typeof WeeklyBriefSchema>;
