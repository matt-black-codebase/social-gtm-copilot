import { randomUUID } from 'node:crypto';
import { WeeklyBrief, WeeklyBriefSchema } from '../schemas/entities.js';
import { DraftRepository, WeeklyBriefRepository } from '../storage/repositories.js';

export class WeeklyBriefService {
  constructor(
    private readonly draftRepo: DraftRepository,
    private readonly briefRepo: WeeklyBriefRepository
  ) {}

  async generatePlaceholder(campaignId: string, weekOf: string): Promise<WeeklyBrief> {
    const drafts = await this.draftRepo.listByCampaign(campaignId);
    const approvedCount = drafts.filter((draft) => draft.status === 'approved_for_buffer').length;

    const brief = WeeklyBriefSchema.parse({
      id: randomUUID(),
      campaignId,
      weekOf,
      summary: `Placeholder brief generated for ${drafts.length} drafts.`,
      wins: [`${approvedCount} drafts approved for buffer staging.`],
      risks: ['Analytics imports are placeholder-only in Sprint 1.'],
      nextActions: ['Review drafts marked needs_rewrite.', 'Prepare Buffer adapter in next sprint.']
    });

    await this.briefRepo.create(brief);
    return brief;
  }
}
