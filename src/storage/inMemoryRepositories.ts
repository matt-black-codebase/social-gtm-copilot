import { Campaign, ContentDraft, WeeklyBrief } from '../schemas/entities.js';
import { CampaignRepository, DraftRepository, WeeklyBriefRepository } from './repositories.js';

export class InMemoryCampaignRepository implements CampaignRepository {
  private store = new Map<string, Campaign>();

  async create(campaign: Campaign): Promise<void> {
    this.store.set(campaign.id, campaign);
  }

  async getById(id: string): Promise<Campaign | undefined> {
    return this.store.get(id);
  }
}

export class InMemoryDraftRepository implements DraftRepository {
  private store = new Map<string, ContentDraft>();

  async create(draft: ContentDraft): Promise<void> {
    this.store.set(draft.id, draft);
  }

  async update(draft: ContentDraft): Promise<void> {
    this.store.set(draft.id, draft);
  }

  async listByCampaign(campaignId: string): Promise<ContentDraft[]> {
    return [...this.store.values()].filter((draft) => draft.campaignId === campaignId);
  }
}

export class InMemoryWeeklyBriefRepository implements WeeklyBriefRepository {
  private store = new Map<string, WeeklyBrief>();

  async create(brief: WeeklyBrief): Promise<void> {
    this.store.set(brief.id, brief);
  }

  async listByCampaign(campaignId: string): Promise<WeeklyBrief[]> {
    return [...this.store.values()].filter((brief) => brief.campaignId === campaignId);
  }
}
