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
 * import React, { useEffect } from 'react';
 * import useAsync from './path/to/useAsync';
 * import fetchFunction from './api/fetchFunction';
 *
 * const MyComponent = () => {
 *   const { refetchFunction, data, pending, error } = useAsync(fetchFunction);
 *
 *   useEffect(() => {
 *     refetchFunction();
 *   }, [refetchFunction]);
 *
 *   return (
 *     <>
 *       {pending ?? <p>Loading...</p>}
 *       {error ?? <p>Error: {error.message}</p>}
 *       {data ?? <p>Data: {JSON.stringify(data)}</p>}
 *     </>
 *   );
 * };
 *
 * export default MyComponent;
 */
export default function useAsync(fetchFunction) {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	/**
	 * @todo 전일주 멘토님에게 CORS 해결방법 문의하기
	 */
	const refetchFunction = useCallback(
		async function (...args) {
			try {
				setPending(true);
				setError(null);
				const response = await fetchFunction(...args);
				setData(response);
			} catch (error) {
				setError(error);
			} finally {
				setPending(false);
			}
		},
		[fetchFunction],
	);

	return { refetchFunction, pending, data, error };
}
