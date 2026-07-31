import { Campaign, ContentDraft, WeeklyBrief } from '../schemas/entities.js';

export interface CampaignRepository {
  create(campaign: Campaign): Promise<void>;
  getById(id: string): Promise<Campaign | undefined>;
}

export interface DraftRepository {
  create(draft: ContentDraft): Promise<void>;
  update(draft: ContentDraft): Promise<void>;
  listByCampaign(campaignId: string): Promise<ContentDraft[]>;
}

export interface WeeklyBriefRepository {
  create(brief: WeeklyBrief): Promise<void>;
  listByCampaign(campaignId: string): Promise<WeeklyBrief[]>;
}
