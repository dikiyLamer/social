import { Skeleton } from 'antd';
import React, { FC, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMessagesQuery } from '../../../../app/endpoints/messages';
import { useParams } from 'react-router-dom';

const ChatMessages: FC = () => {
  const { uid } = useParams<string>();
  const [size, setSize] = useState(10);

  const { data, isFetching, isLoading } = useMessagesQuery(
    { chatId: uid || '', size },
    { refetchOnMountOrArgChange: true }
  );
  const messages = data?.payload?.data || [];
  const handleNextPage = () => {
    if (isFetching || isLoading) {
      return;
    }
    setSize((prevState) => prevState + 10);
  };
  return (
    <InfiniteScroll
      dataLength={(data?.payload?.data || []).length}
      next={handleNextPage}
      inverse={true}
      hasMore={(data?.payload?.pagination.total || 0) < (data?.payload?.data || []).length}
      loader={<Skeleton.Input active />}
    >
      <div className="container">
        {messages.map((message) => (
          <p>{message.text}</p>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ChatMessages;
