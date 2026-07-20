import { Plus } from "lucide-react";
import { useShell } from "../lib/shell-context";
import aoLogo from "../assets/ao-logo.png";
import { CreateProjectFlow } from "./CreateProjectFlow";
import { TopbarButton } from "./TopbarButton";
import { OrchestratorIcon } from "./icons";
import { useTranslation } from "react-i18next";

// First-launch board state (no projects registered yet): replaces the four
// empty kanban columns with orientation and the same create-project flow the
// sidebar's + runs.
export function BoardWelcome() {
	const { createProject, initializeProjectRepository } = useShell();
	const { t } = useTranslation();
	return (
		<div className="flex h-full min-h-0 items-center justify-center overflow-y-auto">
			<div className="flex w-full max-w-board-empty flex-col items-center pb-empty-offset-y text-center">
				<img src={aoLogo} alt="" aria-hidden="true" className="size-10 rounded-lg object-cover" />
				<h2 className="mt-5 text-heading-sm font-semibold tracking-tight-lg text-foreground">
					{t("board.empty.welcomeTitle")}
				</h2>
				<p className="mt-1.5 max-w-[320px] text-[12.5px] leading-[1.65] text-muted-foreground">
					{t("board.empty.welcomeDescription")}
				</p>

				<CreateProjectFlow
					idleLabel={t("board.empty.addFirstProject")}
					onCreateProject={createProject}
					onInitializeProject={initializeProjectRepository}
				>
					{({ choosePath, disabled, error, label }) => (
						<>
							<TopbarButton
								aria-label={t("board.empty.addFirstProject")}
								className="mt-7"
								disabled={disabled}
								onClick={choosePath}
								variant="primary"
							>
								<Plus className="size-icon-md" aria-hidden="true" />
								{label}
							</TopbarButton>
							{error && <p className="mt-3 text-caption leading-body text-error">{error}</p>}
						</>
					)}
				</CreateProjectFlow>
				<p className="mt-3 text-caption text-passive">
					{t("board.empty.addProjectHint")}
				</p>
			</div>
		</div>
	);
}

// Project board with a registered project but no worker sessions yet: a quiet
// invitation instead of four empty columns. Actions mirror the board header
// (Orchestrator stays the primary, like the topbar) so the vocabulary holds.
export function ProjectBoardEmpty({
	hasOrchestrator,
	isProjectRestarting,
	isSpawning,
	onNewTask,
	onOpenOrchestrator,
	spawnError,
}: {
	hasOrchestrator: boolean;
	isProjectRestarting: boolean;
	isSpawning: boolean;
	onNewTask: () => void;
	onOpenOrchestrator: () => void;
	spawnError?: string | null;
}) {
	const { t } = useTranslation();
	return (
		<div className="flex h-full min-h-0 items-center justify-center overflow-y-auto">
			<div className="flex w-full max-w-preview-content flex-col items-center pb-empty-offset-y text-center">
				<h2 className="text-subtitle font-semibold tracking-tight text-foreground">{t("board.empty.noSessionsTitle")}</h2>
				<p className="mt-2 text-md-sm leading-relaxed text-muted-foreground">
					{t("board.empty.noSessionsDescription")}
				</p>
				<div className="mt-5 flex items-center gap-2">
					<TopbarButton
						aria-label={hasOrchestrator ? t("board.actions.orchestrator") : t("board.actions.spawnOrchestrator")}
						disabled={isSpawning || isProjectRestarting}
						onClick={onOpenOrchestrator}
						variant="primary"
					>
						<OrchestratorIcon className="size-icon-md" aria-hidden="true" />
						{isProjectRestarting
							? t("board.actions.restarting")
							: isSpawning
								? t("board.actions.spawning")
								: hasOrchestrator
									? t("board.actions.orchestrator")
									: t("board.actions.spawnOrchestrator")}
					</TopbarButton>
					<TopbarButton aria-label={t("board.actions.newTaskSentence")} disabled={isProjectRestarting} onClick={onNewTask} variant="accent">
						<Plus className="size-icon-md" aria-hidden="true" />
						{t("board.actions.newTaskSentence")}
					</TopbarButton>
				</div>
				{spawnError && (
					<p className="mt-3 text-caption leading-body text-error" role="status">
						{spawnError}
					</p>
				)}
			</div>
		</div>
	);
}
