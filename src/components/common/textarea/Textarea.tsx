import { forwardRef, useCallback, useRef, useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Textarea.tsx
 * @version 0.0.1 "2023-10-02 21:37:33"
 * @description 설명
 */

interface ITextareaProps {
  defaultValue?: string;
  placeholder?: string;
  ref?: any;
  disabled?: boolean;
  activeBg?: string;
}

const Textarea = (props: ITextareaProps, ref: any) => {
  const textRef = ref || useRef(null);
  const [textareaValue, setTextareaValue] = useState(props.defaultValue || '');
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 4 + 'px';
    setTextareaValue(textRef.current.value);
  }, []);

  return (
    <textarea
      className={`h-auto resize-none rounded-md border-0 ${props.disabled ? 'bg-transparent' : props.activeBg || 'bg-white'} !outline-none`}
      ref={textRef}
      rows={1}
      onInput={handleResizeHeight}
      {...props}
    />
  );
};
export default forwardRef(Textarea);
