import React, { FC, useMemo, useRef, useState } from 'react';
import { IPost } from '../../../shared/interfaces/post.interface';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';

interface ICreatePost {
  create: (data: IPost) => void;
}

export const CreatePostForm: FC<ICreatePost> = ({ create }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(() => {
    return {
      readonly: false,
      placeholder: 'Начните писать...',
      uploader: {
        insertImageAsBase64URI: true,
      },
      speechRecognize: {
        lang: 'ru',
      },
      addNewLine: false,
      autofocus: true,
      toolbarAdaptive: true,
      hidePoweredByJodit: true,
      removeButtons: ['speechRecognize', 'about', 'classSpan', 'source'],
    };
  }, []);

  const onFinish = () => {
    create({ description: content });
  };

  const onValueChange = (val: string) => {
    setContent(val);
  };

  return (
    <>
      <JoditEditor ref={editor} value={content} config={config} onChange={onValueChange} />
      <Button type="primary" htmlType="submit" disabled={!content} onClick={onFinish}>
        Создать
      </Button>
    </>
  );
};
