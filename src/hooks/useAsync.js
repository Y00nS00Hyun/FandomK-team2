import { useState, useCallback } from "react";

/**
 * @function useAsync
 *
 * @param {Function} fetchFunction - fetch 함수
 * @returns {Object} { refetchFunction, data, pending, error }
 *
 * @description API fetchFunction 을 파라미터로 보내고 리턴받은 객체로 { 실행함수, 응답대기, 응답데이터, 에러메세지 } 다룬다.
 *
 * @example
 * import useAsync from '파일경로/useAsync';
 * import fetchFunction from 'api/필요한API';
 * const { refetchFunction, data, pending, error } = useAsync(fetchFunction);
 */
export default function useAsync(fetchFunction) {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	/**
	 * @todo 전일주 멘토님에게 해결방법 문의하기
	 */
	const refetchFunction = useCallback(async function (...args) {
		try {
			setPending(true);
			setError(null);
			const response = await fetchFunction(...args);
			setData(response);
			return;
		} catch (error) {
			setError(error);
			return;
		} finally {
			setPending(false);
			return;
		}
	}, []);

	return { refetchFunction, pending, data, error };
}
