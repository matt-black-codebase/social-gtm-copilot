import { describe, expect, it } from 'vitest';
import { markNeedsReview, approveForBuffer } from '../src/domain/draftLifecycle.js';
import { CampaignService } from '../src/services/campaignService.js';
import { WeeklyBriefService } from '../src/services/weeklyBriefService.js';
import {
  InMemoryCampaignRepository,
  InMemoryDraftRepository,
  InMemoryWeeklyBriefRepository
} from '../src/storage/inMemoryRepositories.js';

describe('local product workflow', () => {
  it('creates campaign, channel-aware draft, and weekly brief placeholder', async () => {
    const campaignRepo = new InMemoryCampaignRepository();
    const draftRepo = new InMemoryDraftRepository();
    const briefRepo = new InMemoryWeeklyBriefRepository();

    const campaignService = new CampaignService(campaignRepo, draftRepo);
    const weeklyBriefService = new WeeklyBriefService(draftRepo, briefRepo);

    const campaign = await campaignService.createCampaign({
      name: 'Pipeline Build',
      goal: 'Establish repeatable publishing process',
      channels: ['linkedin', 'youtube']
    });

    const draft = await campaignService.createDraft({
      campaignId: campaign.id,
      channel: 'youtube',
      destination: 'buffer_draft',
      contentType: 'video_outline',
      body: 'Outline a weekly educational video.'
    });

    const review = markNeedsReview(draft);
    await draftRepo.update(review);
    const approved = approveForBuffer(review);
    await draftRepo.update(approved);

    const brief = await weeklyBriefService.generatePlaceholder(campaign.id, '2026-04-27');

    expect(campaign.channels).toContain('youtube');
    expect(approved.status).toBe('approved_for_buffer');
    expect(brief.weekOf).toBe('2026-04-27');
    expect(brief.wins[0]).toContain('1 drafts approved');
  });

  it('rejects draft creation for unknown campaign ids', async () => {
    const campaignRepo = new InMemoryCampaignRepository();
    const draftRepo = new InMemoryDraftRepository();
    const campaignService = new CampaignService(campaignRepo, draftRepo);

    await expect(
      campaignService.createDraft({
        campaignId: 'missing-campaign',
        channel: 'linkedin',
        destination: 'internal_queue',
        contentType: 'post',
        body: 'Should fail due to unknown campaign id.'
      })
    ).rejects.toThrow(/unknown campaign/i);
  });

});
