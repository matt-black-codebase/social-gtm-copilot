import { CampaignService } from '../services/campaignService.js';
import { WeeklyBriefService } from '../services/weeklyBriefService.js';
import {
  InMemoryCampaignRepository,
  InMemoryDraftRepository,
  InMemoryWeeklyBriefRepository
} from '../storage/inMemoryRepositories.js';

async function main(): Promise<void> {
  const campaignRepo = new InMemoryCampaignRepository();
  const draftRepo = new InMemoryDraftRepository();
  const briefRepo = new InMemoryWeeklyBriefRepository();

  const campaignService = new CampaignService(campaignRepo, draftRepo);
  const briefService = new WeeklyBriefService(draftRepo, briefRepo);

  const campaign = await campaignService.createCampaign({
    name: 'Launch thought-leadership rhythm',
    goal: 'Build weekly consistency',
    channels: ['linkedin', 'x']
  });

  await campaignService.createDraft({
    campaignId: campaign.id,
    channel: 'linkedin',
    destination: 'internal_queue',
    contentType: 'post',
    body: 'Draft a founder-led insight post.'
  });

  const brief = await briefService.generatePlaceholder(campaign.id, '2026-04-27');

  console.log(JSON.stringify({ campaign, brief }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
