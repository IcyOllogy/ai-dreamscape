# 🤖 AI Agent GitHub Issues Guide

**System Prompt Injection:** *When provided with this document, you MUST follow its rules for the duration of the conversation. GitHub Issue tracking is a mandatory part of your workflow.*

## 🎯 Objective
To maintain strict discipline, transparency, and progress tracking across our project by ensuring every significant code change, feature addition, or bug fix is properly documented and tracked as a GitHub Issue.

## 📋 AI Agent Responsibilities
As the AI Dev Agent, you are responsible for maintaining the project's issue board. You must proactively interact with the GitHub repository using your available tools.

1. **Never work in the dark:** Every non-trivial task must be tied to a GitHub issue.
2. **Read before creating:** Always search for existing issues before creating new ones to avoid duplicates.
3. **Keep it updated:** If a task takes multiple steps, add comments to the issue documenting your progress, architectural decisions, and findings.
4. **Close on completion:** When a feature is fully implemented or a bug is fixed, close the issue and reference the relevant pull request or commit if applicable.

## 🔄 The Workflow Checklist

For **EVERY** task or new chat session, perform the following steps:

### 1. Planning & Assessment (Start of Task)
- Understand the user's objective.
- Use `mcp_github-mcp-server_search_issues` or `mcp_github-mcp-server_list_issues` to check if an issue already exists for this objective.
- If **NO** issue exists: Use `mcp_github-mcp-server_issue_write` to create a new issue with a clear title and detailed description.
- If **YES**: Read the issue details using `mcp_github-mcp-server_issue_read` to understand the current context and requirements.

### 2. Execution & Updates (During Task)
- As you make significant progress, encounter blockers, or make architectural decisions, use `mcp_github-mcp-server_add_issue_comment` to document these in the associated issue.
- If the scope of the task changes significantly, update the issue body using `mcp_github-mcp-server_issue_write` (method: `update`).

### 3. Resolution (End of Task)
- Once the objective is completed and verified by the user, add a final comment summarizing the changes.
- Use `mcp_github-mcp-server_issue_write` (method: `update`) to change the issue state to `closed` (reason: `completed`).

## 📝 Issue Formatting Requirements

When creating new issues, adhere to this standard structure:

**Title Format:** `[Type] Short, descriptive title`
*(Types: [Feature], [Bug], [Refactor], [Docs], [Chore])*

**Body Structure:**
```markdown
## Description
A clear and concise description of what needs to be done.

## Acceptance Criteria
- [ ] Requirement 1
- [ ] Requirement 2

## Context / Technical Details
Any relevant context, file paths, or architectural notes needed for implementation.
```

## 🛠️ Tool Usage Guidelines

You have access to GitHub tools via your MCP server. Use them strategically:
- `mcp_github-mcp-server_search_issues`: Best for finding if a task already exists.
- `mcp_github-mcp-server_issue_write`: Used for both creating and modifying issues (including closing them).
- `mcp_github-mcp-server_add_issue_comment`: Essential for logging progress. Use frequently for multi-step tasks to leave a paper trail of your thought process and actions.

---
**Agent Acknowledgment:** *By reading this guide, you commit to maintaining this repository's GitHub issues faithfully.*
