---
name: update-draft
description: Pull latest thesis changes from Notion and sync to the presentation
---

# Update Draft Skill

Sync the Innovent Seed Fund II investment thesis from Notion to the HTML presentation.

## Notion Page
- **Page ID:** `2e6d474d9a1980729762f2e7dec1f395`
- **URL:** https://www.notion.so/Investment-Thesis-Innovent-Seed-Fund-II-2e6d474d9a1980729762f2e7dec1f395

## Workflow

### Step 1: Fetch Content

**Option A - Direct from Notion API:**
Use the Notion MCP tools to retrieve the page content:
1. Call `mcp__notion__API-retrieve-a-page` with page_id `2e6d474d9a1980729762f2e7dec1f395`
2. Call `mcp__notion__API-get-block-children` with block_id `2e6d474d9a1980729762f2e7dec1f395` to get content blocks
3. Continue fetching child blocks recursively for any blocks with `has_children: true`

**Option B - From Local Export (fallback):**
If Notion API fails (401 unauthorized), read from the local export file:
- `C:\dev\ISF-thesis\Investment Thesis Innovent Seed Fund II 2e6d474d9a1980729762f2e7dec1f395.md`
- Prompt user: "Notion API unavailable. Export the page from Notion (⋯ → Export → Markdown) and save to the project folder, then say 'ready'."

### Step 2: Parse Content
Extract the thesis content from the Notion blocks, mapping sections:
- Executive Summary / Fund At A Glance → Hero section
- Investment Philosophy / Three Pillars → Philosophy section
- Value Chain Framework → Framework section
- Market Thesis → Market section
- Target Verticals → Verticals section
- What We Look For / Red Flags → Criteria section
- Fund Mechanics → Mechanics section

### Step 3: Update Presentation
Edit `C:\dev\ISF-thesis\presentation\index.html` to reflect changes:
- Update text content, statistics, and bullet points
- Preserve HTML structure and CSS classes
- Keep animations and interactive elements intact

### Step 4: Verify
Take a screenshot of the updated presentation using Playwright to verify rendering.

### Step 5: Commit & Push
If changes were made:
1. `git add presentation/`
2. `git commit -m "Sync thesis updates from Notion"`
3. `git push origin main`

Report a summary of what changed.
