import React from 'react';
import NewsWidget from '../widgets/news/News';
import { useTitle } from '../shared/hooks/useTitle';
const News = () => {
  useTitle('news');
  return <NewsWidget />;
};

export default News;
