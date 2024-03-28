import React, { FC } from 'react';
import { Helpers } from '../../../shared/utils/helpers';
import styles from './index.module.scss';

interface IUserPhoto {
  photo?: string;
  width?: string;
  height?: string;
  firstName: string;
  secondName: string;
}

const UserPhoto: FC<IUserPhoto> = ({
  photo,
  firstName,
  secondName,
  height = '40px',
  width = '40px',
}) => {
  return (
    <>
      {!photo ? (
        <div
          className={styles['user-photo']}
          style={{ backgroundColor: Helpers.getAvatarBgColor(), width, height }}
        >
          {Helpers.getFirstLetters(firstName, secondName)}
        </div>
      ) : (
        <div className={styles['user-photo']} style={{ backgroundImage: photo }}></div>
      )}
    </>
  );
};

export default UserPhoto;
