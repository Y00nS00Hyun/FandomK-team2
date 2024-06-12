import { useState } from 'react';

/**
 * @function useAsync
 *
 * @param {Function} fetchFunction - fetch 함수
 * @returns {Array} - [ 실행함수, 응답데이터, 응답대기, 에러메세지 ]
 *
 * @example
 * import useAsync from '파일경로/useAsync';
 * const [ refetchFunction, responseData, isLoading, errorMessage ] = useAsync(fetchFunction);
 * 선언해놓은 fetchFunction 을 파라미터로 보내고 리턴받은 [ 실행함수, 응답데이터, 응답대기, 에러메세지 ] 배열로 다룬다.
 */
export default function useAsync(fetchFunction) {
	const [response, setResponse] = useState(null);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(null);

	const refetchFunction = async function (...args) {
		try {
			setPending(true);
			setError(null);
			const data = await fetchFunction(...args);
			setResponse(data);
			return;
		} catch (error) {
			setError(error);
			return;
		} finally {
			setPending(false);
			return;
		}
	};

	return [refetchFunction, response, pending, error];
}
