import { Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useFindByNameQuery } from '../../../app/endpoints/user';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';
import { ICurrentUser } from '../../interfaces/auth.interface';
import { userSlice } from '../../../entities/user';

const { Option } = Select;

const GlobalSearch = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const debounceSearchValue = useDebounce(searchValue);

  const result = useFindByNameQuery(debounceSearchValue, { skip: !debounceSearchValue });

  const { data, isFetching, isLoading } = result;
  let options = data?.payload;
  useEffect(() => {}, [debounceSearchValue]);
  const onChange = (val: string) => {
    setSearchValue(val);
  };

  const onSelect = (val: string) => {
    const user = options?.find((obj: ICurrentUser) => {
      if (obj) {
        return obj.uid === val;
      }
      return false;
    });
    if (user) {
      dispatch(userSlice.actions.userPage(user));
    }
    navigate(`/user/${val}`);
  };

  const onClear = () => {
    console.log('onClear');
  };

  return (
    <Select
      showSearch
      placeholder="Поиск..."
      filterOption={false}
      onSearch={onChange}
      loading={isLoading || isFetching}
      onSelect={onSelect}
      style={{ width: '250px' }}
      notFoundContent={(() => {
        if (isFetching || isLoading) {
          return <Spin size="small" />;
        } else {
          return searchValue && searchValue?.length > 2
            ? 'По вашему запросу сотрудник не найден'
            : null;
        }
      })()}
      onClear={onClear}
      allowClear
    >
      {debounceSearchValue &&
        options?.length !== 0 &&
        options?.map((item) => (
          <Option key={item.email} value={item.uid}>
            {item.firstName} {item.secondName}
          </Option>
        ))}
    </Select>
  );
};

export default GlobalSearch;
