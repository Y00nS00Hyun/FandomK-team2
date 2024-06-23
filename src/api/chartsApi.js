import httpClient from "./httpClient";

const API_URL = "https://fandom-k-api.vercel.app/7-2";
const ERROR_MESSAGES = {
  response: "차트 데이터를 가져오는데 실패했습니다.",
  gender: "성별을 선택해주세요.",
};

/**
 * 차트 목록을 가져옵니다.
 *
 * @function getChartData
 * @param {number} pageSize - (필수, 기본값: 10) 페이지 사이즈, 데이터 갯수
 * @param {string} gender - (필수, 기본값: male)  성별 [ male, female ]
 * @param {number} cursor - (옵션) 커서, 이전에 호출한 데이터의 nextCursor
 * @returns {Promise<Object>} The response data parsed as JSON.
 * @example
 * // 기본 호출
 * const result = await getChartData({ gender, pageSize });
 *
 * // 커서를 이용하여 추가 데이터 호출
 * const result = await getChartData({ gender, pageSize, cursor: '이전에 호출한 데이터의 nextCursor' });
 */
export const getChartData = async ({ pageSize = 10, gender = "male", cursor }) => {
  const params = { pageSize, gender };
  if (cursor) params.cursor = cursor;
  return await httpClient.get(`${API_URL}/charts/{gender}`, params).catch((e) => {
    throw new Error(ERROR_MESSAGES.response, e);
  });
};

/**
 * 선택된 투표를 업데이트합니다.
 *
 * @function updateSelectedVote
 * @param {number} teamId - (필수) 투표할 팀의 ID
 * @returns {Promise<Object>} The response data parsed as JSON.
 * @example
 * // 선택된 투표 업데이트
 * const result = await updateSelectedVote(teamId);
 */
export const updateSelectedVote = async (teamId) => {
  console.log(`Sending vote update request for team ID: ${teamId}`);
  try {
    const response = await httpClient.put(`${API_URL}/votes`, { teamId });
    console.log("Vote update response:", response);
    return response;
  } catch (e) {
    console.error("Vote update failed:", e);
    throw new Error("Failed to update vote.", e);
  }
};
