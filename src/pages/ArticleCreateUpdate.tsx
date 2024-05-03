import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import ArticleAPI from "../api/ArticleAPI";
import { useImageDrag } from "../hooks/useImageDrag";
  
/**
 * @file ArticleCreateUpdate.tsx
 * @description 이미지 생성 및 수정 페이지
 */
  const schema = z.object({
    description: z.string().min(1),
    price: z.number().lte(10000).nonnegative(),
  });

const ArticleCreateUpdate = (props: {edit?: boolean}) => {
  const createUpdateMutation = props.edit
    ? ArticleAPI.updateArticle()
    : ArticleAPI.createArticle();
  const inputTagRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const [tags, setTags] = useState<string[]>([]);
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const imgBaseUrl = process.env.REACT_APP_CORE_IMAGE_BASE_URL;
  const [isPaid, setIsPaid] = useState(false);
  const {
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onChangeFile,
    imageFile,
    imageUrl,
    isDragging,
    deletePreviewImageHandler,
    setImageUrl,
  } = useImageDrag();

  
  const { formState, register, handleSubmit, getValues, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      price: NaN,
    },
  });

  // 태그 입력시 ,나 Enter로 태그블록 만들어 주는 기능
  const onChangeInputTagHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      const tempTag = (inputTagRef.current as any).value + '';
      if (tempTag == '') return;
      setTags((prev) => Array.from(new Set([...prev, tempTag])));
      (inputTagRef.current as any).value = '';
    }
    else if (e.key === ',') {
      const tempTag =
        (inputTagRef.current as any).value.substring(0, (inputTagRef.current as any).value.length-1) +
        '';
      if (tempTag == '') return;
      setTags((prev) => Array.from(new Set([...prev, tempTag])));
      (inputTagRef.current as any).value = '';
    }
  };

  // 태그 클릭해서 지울때
  const deleteTagHandler = (tagName: string) => {
    setTags((prev) => prev.filter((i: string) => i != tagName));
  };

  // 생성, 수정시 API
  const submitHandler = () => {
    createUpdateMutation.mutate({
      content: getValues('description'),
      tagString: tags.join(','),
      multipartFile: imageFile,
      price: getValues('price'),
      paid: isPaid,
    });
  };


  useEffect(() => {
    // 수정시 기본 데이터 조회
    if (props.edit) {
      const queryClient = new QueryClient();
      queryClient
        .fetchQuery({
          queryKey: ['readArticle', id],
          queryFn: async () => {
            const response = await fetch(`${apiUrl}/api/article/detail/${id}`, {
              method: 'GET',
              credentials: 'include',
            });
            const data = await response.json();
            return data;
          },
        })
        .then((res) => {
          setValue('description', res.data.content);
          setValue('price', res.data.price, { shouldValidate: true });
          setTags([...res.data.tags]);
          setImageUrl(
            `${imgBaseUrl}/${res.data.imgFilePath}/${res.data.imgFileName}`,
          );
          if (res.data.price > 0) {
            setIsPaid(true)
          }
        });
    }
  }, []);

  return (
    <div className={'max-w-240 flex w-auto flex-col items-center gap-5 p-4'}>
      <div
        className={`${isDragging && 'bg-[#219653] bg-opacity-60'} outline-black-[1px] relative flex flex-col justify-center rounded-lg p-2 outline outline-1 outline-offset-[-1px] ${isPaid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {imageUrl && !isPaid && (
          <button
            type={'button'}
            className={`absolute right-1 top-1 h-6 w-6 ${isPaid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={(e) => isPaid || deletePreviewImageHandler(e)}
          >
            <FontAwesomeIcon icon={faCircleXmark} className="h-full w-full" />
          </button>
        )}
        <label
          htmlFor={'image-upload'}
          className={`flex max-h-[25rem] max-w-[25rem] flex-row items-center justify-center ${isPaid ? 'cursor-not-allowed' : 'cursor-pointer'} aspect-square w-[calc(100vw-2rem)]`}
          onDragEnter={(e) => isPaid || onDragEnter(e)}
          onDragLeave={(e) => isPaid || onDragLeave(e)}
          onDragOver={(e) => isPaid || onDragOver(e)}
          onDrop={(e) => isPaid || onDrop(e)}
        >
          {imageUrl != '/' ? (
            <img src={imageUrl} alt={'image'} />
          ) : (
            <div className={'flex h-full flex-col items-center justify-center'}>
              <div className={'flex justify-center'}>
                이미지를 드래그하거나 클릭해주세요
              </div>
            </div>
          )}
        </label>
        <input
          disabled={isPaid}
          type={'file'}
          id={'image-upload'}
          accept="image/*"
          className={'hidden'}
          onChange={(e) => {
            isPaid || onChangeFile(e);
          }}
        />
      </div>
      <div className={'flex w-full flex-col gap-2'}>
        <div className="font-bold"> 이미지 설명 </div>
        <textarea
          {...register('description')}
          placeholder="내용을 입력하세요"
          className={
            'h-24 w-full resize-none rounded-lg bg-[#F5F6F6] p-2 shadow-[inset_0_2px_4px_rgb(0,0,0,0.024),inset_0_1px_1px_rgb(0,0,0,0.075)]'
          }
        />
      </div>
      <div className={'flex w-full flex-col gap-2'}>
        <div className="font-bold">
          태그
          <span className="px-2 text-sm text-gray-400">
            (엔터를 입력하면 태그로 추가됩니다. 태그 클릭시 제거)
          </span>
        </div>
        <div
          className={
            'flex w-full flex-wrap gap-2 rounded-lg bg-[#F5F6F6] p-2 shadow-[inset_0_2px_4px_rgb(0,0,0,0.024),inset_0_1px_1px_rgb(0,0,0,0.075)]'
          }
        >
          {tags?.map((i: string) => (
            <button
              key={uuidv4()}
              className={'rounded-lg bg-[#219653] px-2 text-white'}
              onClick={() => deleteTagHandler(i)}
            >
              {i}
            </button>
          ))}
          <input
            placeholder="태그입력"
            className={'rounded-lg bg-transparent pl-2'}
            onKeyUp={onChangeInputTagHandler}
            ref={inputTagRef}
          />
        </div>
      </div>
      <div className={'flex w-full flex-col gap-2'}>
        <div className="font-bold">
          가격
          <span className="px-2 text-sm text-gray-400">
            (0원일 경우 무료, 1만원 이하)
          </span>
        </div>
        <input
          {...register('price', {
            setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
          })}
          disabled={isPaid}
          placeholder="가격을 입력해주세요"
          type={'number'}
          className={`rounded-lg bg-[#F5F6F6] p-2 shadow-[inset_0_2px_4px_rgb(0,0,0,0.024),inset_0_1px_1px_rgb(0,0,0,0.075),0_0px_0px_1px_rgb(43,49,67,0.075)] ${isPaid ? 'cursor-' : 'cursor-pointer'}`}
        />
      </div>
      <button
        className={`h-[2.75rem] w-full rounded-lg ${formState.isValid && imageUrl != '/' ? 'bg-[#219653]' : 'bg-gray-200'} ${!formState.isValid || imageUrl == '/' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!formState.isValid || imageUrl == '/'}
        type="submit"
        onClick={handleSubmit(submitHandler)}
      >
        {props.edit ? '수정' : '생성'}
      </button>
    </div>
  );
};
export default ArticleCreateUpdate;
