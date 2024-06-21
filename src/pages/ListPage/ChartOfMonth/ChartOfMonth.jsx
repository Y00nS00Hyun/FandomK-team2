import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAsync from "../../../hooks/useAsync";
import { getChartData } from "../../../api/chartsApi";
import TitleSection from "../../../components/TitleSection/TitleSection";
import LodingImage from "../../../components/LodingImage/LodingImage";
import Button from "../../../components/Button/Button";
import style from "./ChartOfMonth.module.css";
import { useMyCredit } from "../../../context/MyCreditContext";

/**
 * @JuhyeokC
 * mode 별 페이지사이즈 매직넘버
 */
const PAGE_SIZES = {
  desktop: 10,
  tablet: 5,
  mobile: 5,
};

const Container = styled.div`
	${({ $mode }) => {
    switch ($mode) {
      case "desktop":
        return `
        `;
      default:
        return `
        display:flex;
        `;
    }
  }}
`;

// TODO : 내가 개발할 곳 (이대진) 2024.06.10 13:20
function ChartOfMonth({ mode }) {
	const [myCredit, setMyCredit] = useMyCredit();
  const pageSize = PAGE_SIZES[mode]; // 서버에 요청할 데이터 갯수
  const [gender, setGender] = useState("female"); // 성별 선택
  const [items, setItems] = useState([]); // 서버에서 응답받은 데이터
  const [cursor, setCursor] = useState(null); // 서버요청에 사용될 커서
  const [reload, setReload] = useState(0); // 응답에러 시 컴포넌트 재 렌더링을 위한 스테이트
  const [disableButton, setDisableButton] = useState(false); // 더보기 버튼 비활성화 상태

  /**
   * @JuhyeokC
   * useAsync 커스텀훅 사용
   */
  const [pending, error, execute] = useAsync(getChartData);

  /**
   * @JuhyeokC
   * 데이터 호출 함수
   */
  const getData = async ({ pageSize, gender, cursor }) => {
    const params = { pageSize, gender }; // 필수 파라미터들
    if (cursor) params.cursor = cursor; // 커서가 있을 때 커서 추가 (더보기)

    const result = await execute(params); // 데이터 호출
    if (!result) return; // 호출 실패 시 함수 종료
    const { idols, nextCursor } = result; // 응답받은 API 데이터 구조분해 (팬덤케이 스웨거 API 참조)

    setItems((prev) => {
      // 데이터 담기 위해 이전 값 참조
      if (cursor) {
        // 더보기 실행 시 커서가 있을 것이므로 커서가 참일 때
        return [...prev, ...idols]; // 이전 데이터에 새로운 데이터 추가
      } else {
        // 커서가 없을 때 (최초 실행 시 혹은 성별버튼 클릭 시)
        return idols; // 새로운 데이터만 추가
      }
    });
    setCursor(nextCursor); // 서버요청에 사용될 커서 상태
    setDisableButton(!nextCursor); // 더보기 버튼 비활성화 상태 (커서 값이 null일 때 ! 반전으로 참이 되므로 더보기 버튼의 disabled 프롭이 true 가 되어 더보기 조작을 막을 수 있다.)
  };

  /**
   * @JuhyeokC
   * 더보기 데이터 호출 함수
   */
  const moreData = async () => {
    await getData({ pageSize, gender, cursor });
  };

  /**
   * @JuhyeokC
   * 차트 투표하기 모달 출력
   */
  function handleClick() {
    console.log("차트 투표하기 모달 출력");
  }

  /**
   * @JuhyeokC
   * 렌더링 된 후 데이터호출 함수 실행 이후
   * pageSize, gender 스테이트가 변경될 때 마다 실행
   */
  useEffect(() => {
    getData({ pageSize, gender });
  }, [gender, reload]);

  return (
    <TitleSection
      title={"이달의 차트"}
      action={
        <Button icon={"chart"} size={"small"} onClick={handleClick}>
          차트 투표하기
        </Button>
      }
    >
      {/**
			 * @JuhyeokC
			 * 데이터호출 함수 실행 이후
			 * error(에러), pending(응답대기), items(응답데이터) 의 상태에 따른 렌더링
			 */}
      {error ? (
        <>
          <p>ERROR! {error.message}</p>
          <Button size={"wide"} onClick={() => setReload((prev) => ++prev)}>
            RELOAD
          </Button>
        </>
      ) : (
        <>
          {pending ? (
            <LodingImage />
          ) : (

            <>
              <section className={style["chartbar__gender"]}>
                <button onClick={() => setGender("female")} className={`${style["chartbar__gender-button"]} ${gender === "female" ? style["selected"] : ""}`}>
                  이달의 여자 아이돌
                </button>
                <button onClick={() => setGender("male")} className={`${style["chartbar__gender-button"]} ${gender === "male" ? style["selected"] : ""}`}>
                  이달의 남자 아이돌
                </button>
              </section>
              <Container className={style["container"]} $mode={mode}>
                {items &&
                  items.map((item) => (
                    <article key={item.id} className={style["chart__ranking"]}>
                      <section className={style["chart__profile"]}>
                        <div className={style["chart__circle"]}>
                          <img className={style["chart__img"]} src={item.profilePicture} alt={`${item.name} 프로필 이미지`} height={80} draggable="false" />
                        </div>
                        <span className={style["chart__rank"]}>{item.rank}</span>
                        <div className={style["chart__group"]}>{`${item.group} ${item.name}`}</div>
                      </section>
                      <div className={style["chart__vote"]}>{item.totalVotes}표</div>
                    </article>
                  ))}
              </Container>
            </>
          )}
        </>
      )}

      <button className={style["viewMore"]} onClick={moreData} disabled={disableButton}>
        더보기
      </button>
    </TitleSection>

  );
}

export default ChartOfMonth;

/**
 * @JuhyeokC
 * 확인 후 제 이름이 달린 주석은 삭제해주세요!
 * 이해가 어려운 부분은 질문해주세요!
 */
