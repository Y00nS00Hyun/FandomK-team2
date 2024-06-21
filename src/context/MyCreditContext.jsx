import React, { createContext, useContext, useEffect, useState } from "react";

const CREDIT_NAME = "myCredit";

// Context 생성
const MyCreditContext = createContext();

// Provider 컴포넌트 정의
export const MyCreditProvider = ({ children }) => {
	const [myCredit, setMyCredit] = useState(() => (localStorage?.getItem(CREDIT_NAME) === null ? 0 : Number(localStorage.getItem(CREDIT_NAME))));

	useEffect(() => {
		if (myCredit < 0) {
			setMyCredit(0);
		} else {
			localStorage.setItem(CREDIT_NAME, myCredit);
		}
	}, [myCredit]);

	return <MyCreditContext.Provider value={[myCredit, setMyCredit]}>{children}</MyCreditContext.Provider>;
};

// custom hooks 생성
export const useMyCredit = () => useContext(MyCreditContext);
