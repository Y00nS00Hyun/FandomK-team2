import { useState } from "react";

/**
 * @function useAsync
 *
 * @param {Function} asyncFunction - 비동기 함수
 * @returns {Array} [ pending, error, execute ]
 *
 * @description
 * 비동기 함수를 파라미터로 보내고 [ pending, error, execute ] 배열을 리턴받는다. *순서에 주의
 * pending: 비동기 처리 진행 상태에 따라 Boolean 값
 * error: 응답에러 발생시 에러객체가 생성된다. 이외에는 null 상태.
 * execute: 파라미터로 받은 비동기 함수를 실행해주는 함수로 응답성공 시 데이터가 리턴된다.
 *
 * @example
 * import React, { useEffect } from 'react';
 * import useAsync from 'path/useAsync';
 * import asyncFunction from 'path/asyncFunction';
 *
 * const MyComponent = () => {
 *   const [ pending, error, execute ] = useAsync(asyncFunction);
 *   const [ data, setData ] = useState(null);
 *
 *   const getData = ({ params }) => {
 *     const response = execute({ params });
 *     setData(response.list);
 *   };
 *
 *   useEffect(() => {
 *     getData({ params });
 *   }, [params]);
 *
 *   return (
 *     <>
 *       {error ? (
 *         <p>Error: {error.message}</p>
 *       ) : (
 *         <>
 *           {pending ? (
 *             <p>Loading...</p>
 *           ) : (
 *             <>
 *               {data && data.map((item) => <p>Data: {JSON.stringify(data)}</p>)})
 *             </>
 *           )}
 *         </>
 *       )}
 *     </>
 *   );
 * };
 *
 * export default MyComponent;
 */
export default function useAsync(asyncFunction) {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(null);

	async function execute(...args) {
		try {
			setPending(true);
			setError(null);
			return await asyncFunction(...args);
		} catch (error) {
			setError(error);
			return;
		} finally {
			setPending(false);
		}
	}

	return [pending, error, execute];
}
