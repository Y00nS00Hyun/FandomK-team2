import React from 'react';
import BlockTitle from '../../../components/BlockTitle/BlockTitle';
import style from "./ChartOfMonth.module.css";

// TODO : 내가 개발할 곳 (이대진) 2024.06.10 13:20
function ChartOfMonth() {
	return (
		<section className = {style["chartbar"]}>
			<section className={style["chartbar__header"]}>
      <BlockTitle>이달의 차트</BlockTitle>
      <button className="vote">차트 투표하기</button>
      </section>
      
    <section className=""></section>
      <section className={style["chartbar__gender"]}>
      <button className={style["chartbar__female"]}>이달의 여자 아이돌</button>
      <button className={style["chartbar__male"]}>이달의 남자 아이돌</button>
      </section>

      <section className={style["container"]}>
      <div id = "rank1" className={style["item"]}>Item1</div>
      <div id = "rank2" className={style["item"]}>Item2</div>
      <div id = "rank3" className={style["item"]}>Item3</div>
      <div id = "rank4" className={style["item"]}>Item4</div>
      <div id = "rank5" className={style["item"]}>Item5</div>
      <div id = "rank6" className={style["item"]}>Item6</div>
      <div id = "rank7" className={style["item"]}>Item7</div>
      <div id = "rank8" className={style["item"]}>Item8</div>
      <div id = "rank9" className={style["item"]}>Item9</div>
      <div id = "rank10" className={style["item"]}>Item10</div>
      </section>

      <button className={style["viewMore"]}> 더보기 </button>
		</section>

    
	);
}

export default ChartOfMonth;



{/* <button // 모달창 띄우기
      popovertarget = "mypopover"
      popovertargetcation = "show">
        Show popover</button>
      <button popovertarget = "mypopover"
      popovertargetcation = "hide">
        Hide popover
        </button>
      <div id = "mypopover" popover> Popover content</div> */}