import httpClient from './httpClient';

const API_URL = 'https://fandom-k-api.vercel.app/7-2';
const ERROR_MESSAGES = {
	response: '후원 데이터를 가져오는데 실패했습니다.',
	id: '후원 id를 입력해주세요.',
	credit: '크레딧이 1000 보다 작습니다.',
};

/**
 * 후원 목록을 가져옵니다.
 *
 * @function getDonationList
 * @param {number} pageSize - (기본값: 10) 페이지 사이즈, 아이돌 갯수
 * @param {number} cursor - (옵션) 커서, 이전에 호출한 데이터의 nextCursor
 * @param {array[number]} priorityIdolIds - (옵션) 우선순위 아이돌 ID 리스트, 최대 5개
 * @returns {Promise<Object>} The response data parsed as JSON.
 * @example
 * const deviceType = useMediaQuery();
 * const pageSize = PAGE_SIZES(deviceType);
 *
 * // 사이즈로만 호출
 * const result = await getDonationList({ pageSize });
 *
 * // 커서를 이용하여 추가로 데이터 호출할 때
 * const result = await getDonationList({ pageSize, cursor: '이전에 호출한 데이터의 nextCursor' });
 *
 * // 우선순위 아이돌 설정 (4명)
 * const result = await getDonationList({ pageSize, priorityIdolIds: [ 200, 202, 404, 500 ] });
 */
export const getDonationList = async ({ pageSize = 10, ...args }) => {
	return await httpClient.get(`${API_URL}/donations`, { pageSize, ...args }).catch((e) => {
		throw new Error(ERROR_MESSAGES.response, e);
	});
};

/**
 * 후원 정보를 업데이트합니다.
 *
 * @function updateDonationData
 * @param {number} id - 후원 ID
 * @param {object} body - 업데이트할 후원 데이터
 * @param {number} body.targetDonation - 후원 목표 금액
 * @param {Date} body.deadline - 후원 종료 날짜
 * @returns {Promise<Object>} The response data parsed as JSON.
 * @example
 * // 후원 정보 수정
 * const result = await updateDonationData(id, { deadline, targetDonation });
 */
const updateDonationData = async (id, body) => {
	if (!id) throw new Error(ERROR_MESSAGES.id);
	return await httpClient.put(`${API_URL}/donations/${id}`, body).catch((e) => {
		throw new Error(ERROR_MESSAGES, e);
	});
};

/**
 * 후원 정보 삭제하기
 *
 * @function deleteDonationData
 * @param {number} id - 후원 ID
 * @returns {Promise<Object>} The response data parsed as JSON.
 */
const deleteDonationData = async (id) => {
	if (!id) throw new Error(ERROR_MESSAGES.id);
	return await httpClient.delete(`${API_URL}/donations/${id}`).catch((e) => {
		throw new Error(ERROR_MESSAGES, e);
	});
};

/**
 * 모집 중인 조공에 대해 크레딧을 사용해 후원합니다.
 *
 * @function donateCredit
 * @param {number} id - 후원 ID
 * @param {object} body - 업데이트할 후원 데이터
 * @param {number} body.amount - 후원 크레딧
 * @returns {Promise<Object>} The response data parsed as JSON.
 * @example
 * // 크레딧 후원 하기
 * const result = await updateDonationData(id, { amount });
 */
const donateCredit = async (id, { amount }) => {
	if (amount < 1000) throw new Error(ERROR_MESSAGES.credit);
	return await httpClient.put(`${API_URL}/donations/${id}/contribute`, { amount }).catch((e) => {
		throw new Error(ERROR_MESSAGES, e);
	});
};
