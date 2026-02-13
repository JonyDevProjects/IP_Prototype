# Agent Ecosystem Map

This document maps the relationships between Agents, Sub-Agents, Skills, and Rules. Use this to navigate the ecosystem.

## 🧠 Core Agents (Personas)
| Agent | Role | Key Skills | Key Rules |
| :--- | :--- | :--- | :--- |
| **[/agente-arquitecto](workflows/agente-arquitecto.md)** | Lead Architect | `explicit_state_machine` | [`architecture.md`](rules/architecture.md) |
| **[/agente-optimizador](workflows/agente-optimizador.md)** | Process Supervisor | N/A (Meta-Analysis) | All Rules |
| **[/agente-resolucion](workflows/agente-resolucion.md)** | Problem Solver | N/A | N/A |

## 🛠️ Sub-Agents (Specialists)
| Sub-Agent | Role | Key Skills | Key Rules |
| :--- | :--- | :--- | :--- |
| **[/sub-agente-frontend](workflows/sub-agente-frontend.md)** | UI/Component Dev | `frontend-design`, `vercel-react-best-practices` | [`ux-guidelines.md`](rules/ux-guidelines.md) |
| **[/sub-agente-ux-expert](workflows/sub-agente-ux-expert.md)** | User Advocate | `frontend-design` | [`ux-guidelines.md`](rules/ux-guidelines.md) |
| **[/sub-agente-tester](workflows/sub-agente-tester.md)** | QA Engineer | `testing-standards` | [`testing-standards.md`](rules/testing-standards.md) |
| **[/sub-agente-arquitecto-verificador](workflows/sub-agente-arquitecto-verificador.md)** | Code Reviewer | N/A | [`architecture.md`](rules/architecture.md) |

## 🔄 Core Workflows
| Workflow | Description | Links |
| :--- | :--- | :--- |
| **[/wf-integracion](workflows/wf-integracion.md)** | **MASTER WORKFLOW**: The standard lifecycle for shipping features. | Connects Validation Agents (`tester`, `ux`, `arch`) |
| **[/verify-publish-flow](workflows/verify-publish-flow.md)** | E2E Test for Publishing | N/A |

## 📚 Critical Skills (The "How-To")
| Skill | Implementation Guide | Linked From |
| :--- | :--- | :--- |
| **Complex Block Consolidation** | [`complex_block_consolidation`](skills/complex_block_consolidation/SKILL.md) | `create_block` |
| **Create New Block** | [`create_block`](skills/create_block/SKILL.md) | Architects / Devs |
| **Frontend Design** | [`frontend-design`](skills/frontend-design/SKILL.md) | UX / Frontend Agents |
| **React Performance** | [`vercel-react-best-practices`](skills/vercel-react-best-practices/SKILL.md) | Frontend / Optimizador |
| **Explicit State** | [`explicit_state_machine`](skills/explicit_state_machine/SKILL.md) | Architect |

## 📏 Golden Rules
*   **Architecture:** [`rules/architecture.md`](rules/architecture.md) (The Law)
*   **UX:** [`rules/ux-guidelines.md`](rules/ux-guidelines.md) (The Fetish)
*   **Testing:** [`rules/testing-standards.md`](rules/testing-standards.md) (The Safety Net)
