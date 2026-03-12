/**
 * Mock data – only to be imported by shared/services/api/*.
 * UI must never import from @/mock.
 */
export { mockUsers, MOCK_GOOGLE_USER } from "./mockUsers";
export { mockTherapists } from "./mockTherapists";
export {
  mockSessions,
  getMockSlotsForTherapist,
} from "./mockSessions";
export {
  getMockConversation,
  getOrCreateConversation,
  appendMockMessage,
  MOCK_AI_REPLIES,
} from "./mockMessages";
export { mockMoodEntries } from "./mockMood";
export { mockPrograms } from "./mockPrograms";
export type { MockProgram } from "./mockPrograms";
