import httpClient from "./httpClient";

const API_URL = "https://fandom-k-api.vercel.app/7-2";
const ERROR_MESSAGES = {
  response: "아이돌 데이터를 가져오는데 실패했습니다.",
  id: "아이돌 id를 입력해주세요.",
  profile: "프로필이미지는 필수값입니다.",
};

/**
 * 아이돌 목록을 가져옵니다.
 *
 * @function getIdolList
 * @param {number} pageSize - (기본값: 10) 페이지 사이즈, 데이터 갯수
 * @param {number} cursor - (옵션) 커서, 이전에 호출한 데이터의 nextCursor
 * @param {string} keyword - (옵션) 검색 키워드, [ 이름, 그룹 ]
 * @returns {Promise<Object>} The response data parsed as JSON.
 * @example
 * const deviceType = useMediaQuery();
 * const pageSize = PAGE_SIZES(deviceType);
 *
 * // 사이즈로만 호출
 * const result = await getIdolList({ pageSize });
 *
 * // 커서를 이용하여 추가로 데이터 호출할 때
 * const result = await getIdolList({ pageSize, cursor: '이전에 호출한 데이터의 nextCursor' });
 *
 * // 아이돌 이름이나 그룹으로 검색할 때
 * const result = await getIdolList({ pageSize, keyword: '검색어 state' });
 */
export const getIdolList = async ({ pageSize = 10, ...args }) => {
  return await httpClient
    .get(`${API_URL}/idols`, { pageSize, ...args })
    .catch((e) => {
      throw new Error(ERROR_MESSAGES.response, e);
    });
};

/**
 * 아이돌 정보를 업데이트합니다.
 *
 * @function updateIdolData
 * @param {number} id - 아이돌 ID
 * @param {object} body - 아이돌 업데이트 요청 바디, *profilePicture 값 필수.
 * @param {string} body.profilePicture - (필수) 아이돌의 프로필이미지
 * @param {string} body.name - (옵션) 아이돌의 이름
 * @param {string} body.group - (옵션) 아이돌의 그룹
 * @param {string} body.gender - (옵션) 아이돌의 성별
 * @returns {Promise<Object>} The response data parsed as JSON.
 * @example
 * // 아이돌 이름 수정
 * const result = await updateIdolData(id, { profilePicture, name: '이름' });
 *
 * // 아이돌 그룹 수정
 * const result = await updateIdolData(id, { profilePicture, group: '이름' });
 *
 * // 아이돌 성별 수정
 * const result = await updateIdolData(id, { profilePicture, gender: '성별' });
 */
const updateIdolData = async (id, body) => {
  if (!id) throw new Error(ERROR_MESSAGES.id);
  if (body.profilePicture) throw new Error(ERROR_MESSAGES.profile);
  return await httpClient.put(`${API_URL}/idols/${id}`, body).catch((e) => {
    throw new Error(ERROR_MESSAGES, e);
  });
};

/**
 * 아이돌을 삭제합니다.
 *
 * @function deleteIdolData
 * @param {number} id - 삭제할 아이돌 ID
 * @returns {Promise<Object>} The response data parsed as JSON.
 * @example
 * // 아이돌 삭제
 * const result = await updateIdolData(id);
 */
const deleteIdolData = async (id) => {
  if (!id) throw new Error(ERROR_MESSAGES.id);
  return await httpClient.delete(`${API_URL}/idols/${id}`).catch((e) => {
    throw new Error(ERROR_MESSAGES, e);
  });
};
