---
name: ralph-loop
description: "Autonomous iterative execution loop for Antigravity. Externalizes memory to task files and progress.txt, executing tasks strictly one-by-one with fresh context per iteration, appending persistent progress records, and preventing context window collapse."
metadata:
  version: "1.0.0"
---

# Ralph Loop for Antigravity

Autonomous iterative execution engine designed specifically for Antigravity. Solves LLM context window decay, token bloat, and agent drift by externalizing memory to files on disk and running iterative, single-task execution cycles.

## Core Philosophy

1. **Context Window Limitations**: Long conversations accumulate token noise, causing the agent to hallucinate, skip edge cases, or forget earlier constraints.
2. **Autonomous Execution Without Drift**: By strictly bounding each iteration to **exactly ONE atomic task**, verifying its output, and writing findings to a persistent progress log, the agent can work for extended sessions without degradation.
3. **Externalized Memory**: Memory lives in two primary files:
   - `tasks/todo.md` (or `PRD.md` / `task.md`): The structured checklist of tasks with status (`[ ]` pending, `[/]` in progress, `[x]` completed).
   - `progress.txt`: An append-only chronological log of all completed iterations, decisions made, test results, and next actions.

---

## The 6-Step Execution Loop

Every Ralph Loop iteration follows this non-negotiable sequence:

```text
┌─────────────────────────────────────────────────────────┐
│ 1. Read Task Checklist (`tasks/todo.md` or `PRD.md`)     │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Check Progress Log (`progress.txt`)                  │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Execute Exactly ONE Atomic Task                      │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Verify & Validate Implementation                     │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Append Progress to `progress.txt` (Never overwrite)  │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Mark Task Complete `[x]` & Loop to Next Task         │
└───────────────────────────┴─────────────────────────────┘
```

### Step 1: Read Task Checklist
- Inspect `tasks/todo.md` or the project PRD.
- Locate the highest-priority pending task (`[ ]`).
- Mark it as in-progress (`[/]`).

### Step 2: Read `progress.txt`
- Read the last 2–3 entries from `progress.txt` to grasp what was recently changed, any architectural decisions established, and any blockers discovered.

### Step 3: Execute Exactly ONE Task
- Focus all tool calls and edits exclusively on the selected task.
- Do NOT expand scope to other tasks.
- Keep modifications clean, surgical, and idiomatic.

### Step 4: Verify & Validate
- Execute tests, linter, or browser inspection to prove that the task was completed successfully.
- If an error occurs, perform root-cause resolution within the current iteration before proceeding.

### Step 5: Append to `progress.txt`
- Format an append-only entry:
  ```markdown
  ## [YYYY-MM-DD HH:MM] Iteration N - [Task Name]
  - **Goal**: Brief description of the task.
  - **Changes Made**: Files modified and key functions implemented.
  - **Verification**: Test outputs, build status, or browser screenshots confirming success.
  - **Notes / Next Step**: Immediate next task in queue.
  ```

### Step 6: Mark Complete & Commit
- Update the checklist item from `[/]` to `[x]`.
- Commit changes if Git is present (`git commit -m "feat/fix: [task description]"`).
- Loop to the next pending item until all tasks are `[x]`.

---

## Rules of Engagement

- **Never Overwrite `progress.txt`**: It is an immutable audit trail. Always append.
- **One Task at a Time**: Never attempt multiple tasks in a single cycle. Token economy and precision require atomic focus.
- **Fail Gracefully with Fallback**: When an approach encounters unexpected blockers, document the failure in `progress.txt`, adjust the strategy, and retry or escalate.
