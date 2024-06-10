/**
 * TODO: 만들어놓은 httpClient 와 api 함수들과 어떻게 버무릴지 고민해보기
 */
import { useState } from 'react';

/**
 * 코드잇 강의에서 소개한 API 커스텀 훅 사용 예재
 *
 * @param asyncFunction - fetch 실행 함수
 * @returns {Array} - [ 로딩상태 관리, 에러 메세지 관리, 실행용 함수 ]
 * @example
 * const [ isLoading, errorMessage, runFunction ] = useAsync(fetchFunction);
 * 선언해놓은 fetchFunction 을 파라미터로 보내고 리턴받은 [ 로딩, 에러, 실행함수 ] 배열로 다룬다.
 */
function useAsync(asyncFunction) {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(null);

	const wrappedFunction = async function (...args) {
		try {
			setPending(true);
			setError(null);
			const response = await asyncFunction(...args);
			if (!response.ok) throw new Error(response.status);
			return await response.json();
		} catch (error) {
			setError(error);
			return;
		} finally {
			setPending(false);
		}
	};

	return [pending, error, wrappedFunction];
}

export default useAsync;
