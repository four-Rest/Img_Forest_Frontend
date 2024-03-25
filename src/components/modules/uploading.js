import React, { useState } from "react";

function Description({ content, setContent }) {
  return (
    <div className="card-body p-1">
      <label htmlFor="content" className="card-title">
        이미지 설명
      </label>
      <textarea
        value={content}
        // value={newContent}
        onChange={(e) => setContent(e.target.value)}
        // onChange={(e) => setNewContent(e.target.value)}
        rows="2"
        id="content"
        placeholder="내용을 입력하세요."
        className="input-field textarea textarea-bordered"></textarea>
    </div>
  );
}

function Tag({ tagString, setTagString }) {
  return (
    <div className="card-body p-1">
      <label htmlFor="tag" className="card-title">
        태그
      </label>
      <input
        type="text"
        value={tagString}
        // value={newTagString}
        onChange={(e) => setTagString(e.target.value)}
        // onChange={(e) => setNewTagString(e.target.value)}
        id="tag"
        placeholder="태그를 입력하세요. 띄어쓰기로 구분됩니다."
        className="input-field textarea textarea-bordered"
      />
    </div>
  );
}

function UploadImage() {
  const handleFileChange = () => {
    console.log("handleFileChange!");
  };
  return (
    <>
      <label htmlFor="image" className="card-title">
        이미지 업로드
      </label>
      <input
        type="file"
        accept="image/*"
        id="image"
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-sm w-full max-w-xs"
      />
    </>
  );
}

function AddImage({ isModifying }) {
  return (
    <div className="card-body p-1">
      {isModifying ? (
        <>
          <div class="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium tex-bold">
              이미지 파일 바꾸기
            </div>
            <div className="collapse-content">
              <UploadImage />
            </div>
          </div>
        </>
      ) : (
        <UploadImage />
      )}
    </div>
  );
}

function Button({ isModifying, clkFunc }) {
  const createArticle = () => {
    console.log("createArticle!");
  };
  const modifyArticle = () => {
    console.log("modifyArticle!");
  };
  return (
    <button
      type="button"
      onClick={isModifying ? modifyArticle : createArticle}
      className="btn">
      {isModifying ? "수정" : "작성"}
    </button>
  );
}

function Uploading({ isModifying, file, isLogin, clkFunc }) {
  const [content, setContent] = useState("");
  const [tagString, setTagString] = useState("");
  const [imageFile, setImageFile] = useState(null);

  return (
    <section className="form-container">
      <div className="card shadow-xl">
        <div className="card-body p-1">
          <h1 className="card-title justify-center">이미지 등록</h1>

          <div className="p-5">
            {isModifying ? (
              <>
                <Description content={content} />
                <Tag tagString={tagString} />
                <AddImage isModifying={true} />
              </>
            ) : (
              <>
                <AddImage isModifying={false} />
                <Description content={content} />
                <Tag tagString={tagString} />
              </>
            )}
            {/* <AddImage></AddImage> */}
            {/* <div className="card-body p-1">
              <label htmlFor="image" className="card-title">
                이미지 업로드
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleFileChange}
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
            </div> */}
            {/* <Description></Description> */}
            {/* <div className="card-body p-1">
              <label htmlFor="content" className="card-title">
                이미지 설명
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="2"
                id="content"
                placeholder="내용을 입력하세요."
                className="input-field textarea textarea-bordered"></textarea>
            </div> */}
            {/* <Tag></Tag> */}
            {/* <div className="card-body p-1">
              <label htmlFor="tag" className="card-title">
                태그
              </label>
              <input
                type="text"
                value={tagString}
                onChange={(e) => setTagString(e.target.value)}
                id="tag"
                placeholder="태그를 입력하세요. 띄어쓰기로 구분됩니다."
                className="input-field textarea textarea-bordered"
              />
            </div> */}
            <Button isModifying={isModifying} clkFunc={clkFunc}></Button>
            {/* <button type="button" onClick={createArticle} className="btn">
              작성
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Uploading;
