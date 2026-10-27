import type { ComponentType } from "react";
import type { AgentSlug } from "@/lib/agents";
import BillingSkillDiagram from "./BillingSkillDiagram";
import StandupBriefDiagram from "./StandupBriefDiagram";
import ProjectSetupDiagram from "./ProjectSetupDiagram";
import StatusBriefDiagram from "./StatusBriefDiagram";
import StakeholderMessageDiagram from "./StakeholderMessageDiagram";
import KickoffDiagram from "./KickoffDiagram";
import DependencyTrackerDiagram from "./DependencyTrackerDiagram";

export const diagrams: Record<AgentSlug, ComponentType> = {
  billing: BillingSkillDiagram,
  standup: StandupBriefDiagram,
  setup: ProjectSetupDiagram,
  reports: StatusBriefDiagram,
  messages: StakeholderMessageDiagram,
  kickoff: KickoffDiagram,
  tracker: DependencyTrackerDiagram,
};
