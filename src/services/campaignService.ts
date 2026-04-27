import { randomUUID } from 'node:crypto';
import { Campaign, CampaignSchema, ContentDraft, ContentDraftSchema } from '../schemas/entities.js';
import { Channel, ContentType, Destination } from '../schemas/types.js';
import { CampaignRepository, DraftRepository } from '../storage/repositories.js';

export class CampaignService {
  constructor(
    private readonly campaignRepo: CampaignRepository,
    private readonly draftRepo: DraftRepository
  ) {}

  async createCampaign(input: { name: string; goal: string; channels: Channel[] }): Promise<Campaign> {
    const campaign = CampaignSchema.parse({
      id: randomUUID(),
      name: input.name,
      goal: input.goal,
      channels: input.channels,
      createdAt: new Date().toISOString()
    });

    await this.campaignRepo.create(campaign);
    return campaign;
  }

  async createDraft(input: {
    campaignId: string;
    channel: Channel;
    destination: Destination;
    contentType: ContentType;
    body: string;
    ideaId?: string;
  }): Promise<ContentDraft> {
    const now = new Date().toISOString();
    const draft = ContentDraftSchema.parse({
      id: randomUUID(),
      campaignId: input.campaignId,
      ideaId: input.ideaId,
      channel: input.channel,
      destination: input.destination,
      contentType: input.contentType,
      body: input.body,
      status: 'draft',
      createdAt: now,
      updatedAt: now
    });

    await this.draftRepo.create(draft);
    return draft;
  }
}
