import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { url } from "../const";
import { Header } from "../components/Header";
import "./styles/newTask.scss";
import { useNavigate } from "react-router-dom";

// NewTask コンポーネント
export const NewTask = () => {
  // 状態の初期化
  const [selectListId, setSelectListId] = useState();
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  // 期限
  const [limit, setLimit] = useState(""); // 期限日時の初期値は空文字列
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const history = useNavigate();

  // イベントハンドラーの定義
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleSelectList = (id) => setSelectListId(id);
  const handleDeadlineChange = (e) => {
    const limitDate = new Date(e.target.value);
    setLimit(limitDate.toISOString().split(".000Z")[0] + "+09:00");
  };

  // タスク作成処理(deadlineをAPIを受け取れるよう正しい形にする)
  const onCreateTask = () => {
    const data = {
      title: title,
      detail: detail,
      done: false,
      limit: limit,
    };

    axios
      .post(`${url}/lists/${selectListId}/tasks`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        history("/");
      })
      .catch((err) => {
        setErrorMessage(`タスクの作成に失敗しました。${err}`);
      });
  };

  // ページロード時の処理
  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
        setSelectListId(res.data[0]?.id);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, [cookies.token]);

  //期限日時と残りの日時の表示→Homeコンポーネントで表示する。Homeに持っていく。
  const RemainingTime = () => {
    if (!limit) {
      return "";
    }
    // 現在時刻を取得
    const now = new Date();
    // 期限日時を取得
    const deadlineDate = new Date(limit);
    // 日本時間に変換
    //計算式: deadlineDateの時間に9時間足す
    deadlineDate.setHours(deadlineDate.getHours() + 9);
    console.log(deadlineDate);

    // 残り時間を計算
    // 計算式: 期限日時 - 現在時刻
    const differenceInMilliseconds = deadlineDate - now;

    // 残り時間を日、時間、分に変換
    // 計算式: 残り時間 / (1000ミリ秒 * 60秒 * 60分 * 24時間)
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    // 残り時間を日に変換
    // 計算式: 残り時間 % (1000ミリ秒 * 60秒 * 60分 * 24時間) / (1000ミリ秒 * 60秒 * 60分)
    const hours = Math.floor(
      (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    // 残り時間を時間に変換
    const minutes = Math.floor(
      (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );

    return `${days}日 ${hours}時間 ${minutes}分`;
  };

  // JSXを返す
  return (
    <div>
      <Header />
      <main className="new-task">
        <h2>タスク新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          {/* リストの選択 */}
          <label htmlFor="list">リスト</label>
          <br />
          <select
            onChange={(e) => handleSelectList(e.target.value)}
            className="new-task-select-list"
          >
            {lists.map((list, key) => (
              <option key={key} className="list-item" value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <br />

          {/* タイトルの入力 */}
          <label htmlFor="title">タイトル</label>
          <br />
          <input
            type="text"
            id="title"
            onChange={handleTitleChange}
            className="new-task-title"
          />
          <br />

          {/* 詳細の入力 */}
          <label>詳細</label>
          <br />
          <textarea
            type="text"
            id="textid"
            name="text"
            onChange={handleDetailChange}
            className="new-task-detail"
          />
          <br />

          <label htmlFor="limit">期限：</label>
          <input
            type="datetime-local"
            id="limit"
            name="limit"
            onChange={handleDeadlineChange}
          />

          {/* 期限日時と残り日時の表示 */}
          <p>期限:{limit}</p>
          <p>残り日時:{RemainingTime()}</p>

          {/* タスク作成ボタン */}
          <button
            type="button"
            className="new-task-button"
            onClick={onCreateTask}
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
